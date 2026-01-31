import os
import json
import requests
import numpy as np
import matplotlib.pyplot as plt


REPORT_DIR = "Plots"
os.makedirs(REPORT_DIR, exist_ok=True)


def fetch_listings(make, model, year, is_accident, min_miles, max_miles, trim=None, limit=2000):
    url = "https://rcv.btkdeals.com/api/fetchSimilarCars.php"
    params = {
        "make": make,
        "model": model,
        "year": year,
        "is_accidental": is_accident,
        "min_mileage": min_miles,
        "max_mileage": max_miles,
        "limit": limit,
        "sort": "price",
        "order": "desc"
    }
    if trim:
        params["trim"] = trim

    r = requests.get(url, params=params)
    r.raise_for_status()
    return r.json().get("cars", [])


def fetch_with_trim_fallback(make, model, year, is_accident, min_miles, max_miles, trim=None, min_required=2):
    """Use trim if provided; if not enough results, ignore trim and fetch all trims."""
    if trim:
        cars = fetch_listings(make, model, year, is_accident, min_miles, max_miles, trim=trim)
        if len(cars) >= min_required:
            return cars
    return fetch_listings(make, model, year, is_accident, min_miles, max_miles, trim=None)


def pick_nearest_by_mileage(cars, current_mileage, n):
    """Take up to n nearest comps by mileage (for pre-accident)."""
    return sorted(cars, key=lambda c: abs(float(c["mileage"]) - current_mileage))[:min(n, len(cars))]


def pick_lowest_by_price(cars, n):
    """Take up to n lowest comps by price (for post-accident)."""
    return sorted(cars, key=lambda c: float(c["price"]))[:min(n, len(cars))]

def safe_regression(miles, prices):
    """Linear regression; for post-accident, if slope >= 0 then slope=0 and value = average of comp prices."""
    if len(miles) < 2:
        return 0, np.mean(prices) if len(prices) > 0 else 0
    slope, _ = np.polyfit(miles, prices, 1)
    mean_m = np.mean(miles)
    mean_p = np.mean(prices)
    intercept = mean_p - slope * mean_m
    if slope >= 0:
        slope = 0
        intercept = mean_p  # flat line → post value = average of comp prices
    return slope, intercept

def print_comps_table(title, cars):
    print(f"\n{title}")
    print("-" * len(title))
    print(f"{'#':<3} {'Mileage':>10} {'Price':>12}")
    print("-" * 28)
    for i, c in enumerate(cars, 1):
        print(f"{i:<3} {int(float(c['mileage'])):>10,} {float(c['price']):>12,.2f}")
    print(f"Total comps: {len(cars)}")

def plot_svg(cars, slope, intercept, current_mileage, filename, title):
    miles = np.array([float(c["mileage"]) for c in cars])
    prices = np.array([float(c["price"]) for c in cars])

    x_line = np.linspace(min(miles.min(), current_mileage) - 1000,
                         max(miles.max(), current_mileage) + 1000, 100)
    y_line = slope * x_line + intercept
    subject_price = slope * current_mileage + intercept

    plt.figure(figsize=(10, 6))
    plt.scatter(miles, prices, s=80, label="Comps")
    plt.plot(x_line, y_line, linewidth=3, label="Regression")
    plt.scatter([current_mileage], [subject_price], marker="X", s=160, label="Subject")
    plt.xlabel("Mileage")
    plt.ylabel("Price")
    plt.title(title)
    plt.legend()
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.tight_layout()
    plt.savefig(filename, format="svg")
    plt.close()
    return round(subject_price, 2)


def calculate_and_plot(year, make, model, current_mileage, trim=None):

    
    clean_cars = fetch_with_trim_fallback(
        make, model, year, 0,
        max(0, current_mileage - 15000),
        current_mileage + 15000,
        trim=trim
    )
    pre_near = pick_nearest_by_mileage(clean_cars, current_mileage, 10)
    if len(pre_near) < 2:
        print(f"⚠️ Not enough clean comps for {year} {make} {model}")
        return None

    print_comps_table("PRE-ACCIDENT COMPS", pre_near)
    pre_miles = np.array([float(c["mileage"]) for c in pre_near])
    pre_prices = np.array([float(c["price"]) for c in pre_near])
    pre_slope, pre_intercept = safe_regression(pre_miles, pre_prices)
    pre_svg = f"{REPORT_DIR}/{year}_{make}_{model}_pre.svg"
    pre_value = plot_svg(pre_near, pre_slope, pre_intercept, current_mileage, pre_svg,
                         f"{year} {make} {model} — Pre Accident")

    
    damaged_cars = fetch_with_trim_fallback(
        make, model, year, 1,
        max(0, current_mileage - 15000),
        current_mileage + 15000,
        trim=trim
    )
    min_post_price = pre_value * 0.75
    max_post_price = pre_value * 0.90
    filtered_post_comps = [c for c in damaged_cars if min_post_price <= float(c["price"]) <= max_post_price]
    # Take up to 10 lowest comps by price (not nearest by mileage)
    final_post_comps = pick_lowest_by_price(filtered_post_comps, 10)

    post_plot_generated = False
    if len(final_post_comps) < 2:
        print("\n⚠️ LESS THAN 2 POST COMPS IN 75–90% RANGE — USING 90% OF PRE VALUE (NO POST PLOT)")
        post_value = pre_value * 0.90
        post_slope = 0
        post_intercept = post_value
    else:
        post_plot_generated = True
        print_comps_table("POST-ACCIDENT COMPS (UP TO 10 LOWEST BY PRICE, 75–90% RANGE)", final_post_comps)
        post_miles = np.array([float(c["mileage"]) for c in final_post_comps])
        post_prices = np.array([float(c["price"]) for c in final_post_comps])
        post_slope, post_intercept = safe_regression(post_miles, post_prices)
        post_value = post_slope * current_mileage + post_intercept
        post_svg = f"{REPORT_DIR}/{year}_{make}_{model}_post.svg"
        plot_svg(final_post_comps, post_slope, post_intercept, current_mileage, post_svg,
                 f"{year} {make} {model} — Post Accident (75–90%)")

    summary = {
        "vehicle": {"year": year, "make": make, "model": model, "trim": trim, "current_mileage": current_mileage},
        "pre_value": round(pre_value, 2),
        "post_value": round(post_value, 2),
        "diminished_value": round(pre_value - post_value, 2),
        "pre_comps": pre_near,
        "post_comps": final_post_comps,
        "post_plot_generated": post_plot_generated,
    }

    summary_path = f"{REPORT_DIR}/{year}_{make}_{model}_summary.json"
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=4)

    return summary


if __name__ == "__main__":
    test_cases = [
        {"year": 2025, "make": "BMW", "model": "430", "current_mileage": 15000, "trim": 'None'},
        # {"year": 2021, "make": "Kia", "model": "Telluride", "current_mileage": 60000, "trim": None},
        # {"year": 2023, "make": "Toyota", "model": "RAV4", "current_mileage": 35000, "trim": None},
        # {"year": 2022, "make": "Honda", "model": "CR-V", "current_mileage": 40000, "trim": None},
        # {"year": 2021, "make": "Ford", "model": "Explorer", "current_mileage": 50000, "trim": None},
    ]

    for car in test_cases:
        print(f"\n===== Running for {car['year']} {car['make']} {car['model']} =====")
        result = calculate_and_plot(**car)
        if result:
            for k, v in result.items():
                if k not in ["pre_comps", "post_comps"]:
                    print(f"{k}: {v}")
