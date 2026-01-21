import os
import requests
import numpy as np
import matplotlib.pyplot as plt

REPORT_DIR = "Plots"
os.makedirs(REPORT_DIR, exist_ok=True)


def fetch_listings(make, model, year, is_accident, min_miles, max_miles, trim=None, limit=60):
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


# PICK NEAREST BY MILEAGE

def pick_nearest_by_mileage(cars, current_mileage, n=20):
    cars_sorted = sorted(
        cars,
        key=lambda c: abs(float(c["mileage"]) - current_mileage)
    )
    return cars_sorted[:min(n, len(cars_sorted))]


# FILTER CARS BY PRICE BAND

def filter_by_price_band(cars, min_price, max_price):
    return [
        c for c in cars
        if min_price <= float(c["price"]) <= max_price
    ]


# REGRESSION

def safe_regression(miles, prices):
    if len(miles) < 2:
        return 0, np.mean(prices)
    
    slope, intercept = np.polyfit(miles, prices, 1)
    
    mean_miles = np.mean(miles)
    mean_prices = np.mean(prices)
    intercept = mean_prices - slope * mean_miles

    if slope > 0:
        slope = 0
        intercept = mean_prices - slope * mean_miles

    return slope, intercept


# PLOT SVG

def plot_svg(cars, slope, intercept, current_mileage, filename, title):
    miles = np.array([float(c["mileage"]) for c in cars])
    prices = np.array([float(c["price"]) for c in cars])

    x_line = np.linspace(
        min(miles.min(), current_mileage) - 1000,
        max(miles.max(), current_mileage) + 1000,
        100
    )
    y_line = slope * x_line + intercept
    subject_price = slope * current_mileage + intercept

    plt.figure(figsize=(10, 6))
    plt.scatter(miles, prices, s=80, label="Comps")
    plt.plot(x_line, y_line, linewidth=3, label="Regression")
    plt.scatter(
        [current_mileage],
        [subject_price],
        marker="X",
        s=160,
        label="Subject vehicle"
    )

    plt.xlabel("Mileage")
    plt.ylabel("Price")
    plt.title(title)
    plt.legend()
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.tight_layout()
    plt.savefig(filename, format="svg")
    plt.close()

    return round(subject_price, 2)


# MAIN LOGIC

def calculate_and_plot(year, make, model, current_mileage, trim=None):

    # ---------------- PRE-ACCIDENT ----------------
    clean_cars = fetch_listings(
        make, model, year, 0,
        max(3000, current_mileage - 15000),
        current_mileage + 15000,
        trim=trim
    )

    if trim and len(clean_cars) < 5:
        clean_cars = fetch_listings(
            make, model, year, 0,
            max(3000, current_mileage - 15000),
            current_mileage + 15000
        )

    pre_near = pick_nearest_by_mileage(clean_cars, current_mileage, 10)

    pre_miles = np.array([float(c["mileage"]) for c in pre_near])
    pre_prices = np.array([float(c["price"]) for c in pre_near])

    pre_slope, pre_intercept = safe_regression(pre_miles, pre_prices)

    pre_svg = f"{REPORT_DIR}/{year}_{make}_{model}_pre.svg"
    pre_value = plot_svg(
        pre_near, pre_slope, pre_intercept,
        current_mileage, pre_svg,
        f"{year} {make} {model} — Pre Accident"
    )

    # ---------------- POST-ACCIDENT ----------------
    damaged_cars = fetch_listings(
        make, model, year, 1,
        max(0, current_mileage - 30000),
        current_mileage + 30000,
        trim=trim
    )

    min_post_price = pre_value * 0.75
    max_post_price = pre_value * 0.90

    # 1. Filter cars within 75–90% of pre-value
    valid_price_cars = filter_by_price_band(damaged_cars, min_post_price, max_post_price)

    # 2. Pick nearest 10 from valid list
    final_post_comps = pick_nearest_by_mileage(valid_price_cars, current_mileage, 10)

    # 3. Fill remaining if less than 10
    if len(final_post_comps) < 10:
        remaining_needed = 10 - len(final_post_comps)
        remaining_candidates = [c for c in damaged_cars if c not in final_post_comps]
        final_post_comps += pick_nearest_by_mileage(remaining_candidates, current_mileage, remaining_needed)

    post_miles = np.array([float(c["mileage"]) for c in final_post_comps])
    post_prices = np.array([float(c["price"]) for c in final_post_comps])

    post_slope, post_intercept = safe_regression(post_miles, post_prices)

    raw_post_value = post_slope * current_mileage + post_intercept
    post_value = max(min_post_price, min(raw_post_value, max_post_price))

    # Adjust intercept if capped
    if post_value != raw_post_value:
        post_intercept = post_value - post_slope * current_mileage

    post_svg = f"{REPORT_DIR}/{year}_{make}_{model}_post.svg"
    plot_svg(
        final_post_comps,
        post_slope,
        post_intercept,
        current_mileage,
        post_svg,
        f"{year} {make} {model} — Post Accident"
    )

    return {
        "pre_value": pre_value,
        "post_value": post_value,
        "diminished_value": round(pre_value - post_value, 2),
        "pre_svg": pre_svg,
        "post_svg": post_svg
    }


if __name__ == "__main__":
    test_cases = [
        {"year": 2024, "make": "bmw", "model": "430", "current_mileage": 20000, "trim": None},
    ]

    for car in test_cases:
        print(f"\n===== Running for {car['year']} {car['make']} {car['model']} =====")
        result = calculate_and_plot(
            year=car["year"],
            make=car["make"],
            model=car["model"],
            current_mileage=car["current_mileage"],
            trim=car["trim"]
        )
        for k, v in result.items():
            print(f"{k}: {v}")
