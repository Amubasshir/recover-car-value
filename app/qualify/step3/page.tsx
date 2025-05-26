"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function QualifyStep3() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    accidentDate: "",
    repairCost: "",
    zipcode: "",
    mileage: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    atFaultName: "",
    atFaultInsurance: "",
    repairClaimNumber: "", // Add new field
  });

  const [vehicleData, setVehicleData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Add this after the formData state
  const [errors, setErrors] = useState({
    zipcode: "",
    phone: "",
  });

  useEffect(() => {
    // Check if user completed previous steps
    const qualifyAnswers = localStorage.getItem("qualifyAnswers");
    const vehicleData = localStorage.getItem("vehicleData");

    setVehicleData(JSON.parse(vehicleData || "{}"));

    if (!qualifyAnswers || !vehicleData) {
      router.push("/qualify/step1");
    }
  }, [router]);


  // Replace the existing handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate zipcode and phone
    if (name === "zipcode") {
      if (value.length < 5) {
        setErrors((prev) => ({
          ...prev,
          zipcode: "Zipcode must be at least 5 digits",
        }));
      } else {
        setErrors((prev) => ({ ...prev, zipcode: "" }));
      }
    }

    if (name === "phone") {
      if (value.length < 10) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone number must be at least 10 digits",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Store form data in localStorage

    const query = new URLSearchParams({
      year: vehicleData.year,
      make: vehicleData.make,
      model: vehicleData.model,
      trim: vehicleData.trim,
      zip: formData.zipcode,
      accidentMileage: formData.mileage,
      accidentZip: formData.zipcode,
      repairCost: formData.repairCost,
      accidentDate: formData.accidentDate,
      vin: vehicleData.vin,
    }).toString();

    // return;
    try {
      const response = await fetch(`/api/diminished-value/?${query}`, {
        method: "GET",
      });

      const data = await response.json();

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     toast.error(errorData.error);
    //   }

    console.log("Response Data:", data);

      if(data?.error) {
        toast.error(data.error);
        return;
      }
      
      toast.success("Vehicle information retrieved successfully! Please check your email for the report." )

      // const vehicleInfo = (await response.json()) as VehicleInfo;
      // console.log("Vehicle Info:", vehicleInfo);
      localStorage.setItem("diminishedVehicleData", JSON.stringify(data?.data));
      localStorage.setItem("confirmationData", JSON.stringify(formData));
      setIsLoading(false);
    //   router.push('/qualify/results');

      // onVehicleIdentified(vehicleInfo);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to lookup vehicle information"
      );
    } finally {
      setIsLoading(false);
    }

    // In a real application, you would send this data to your server
    // For now, we'll just navigate to the results page
  };

  // Replace the existing isFormValid check
  const isFormValid =
    formData.accidentDate &&
    formData.zipcode &&
    formData.firstName &&
    formData.lastName &&
    formData.phone &&
    formData.email &&
    formData.zipcode.length >= 5 &&
    formData.phone.length >= 10 &&
    !errors.zipcode &&
    !errors.phone;

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-6 animate-fade-in">
        <div className="mb-4 max-w-sm md:max-w-md mx-auto">
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-center text-success-600">
              <div className="w-7 h-7 md:h-9 md:w-9  rounded-full flex items-center justify-center border-2 border-success-600 bg-success-600 text-white shadow-md">
                ✓
              </div>
              <span className="mt-1 text-center text-xs md:text-sm font-medium max-w-16 md:max-w-sm">
                Qualify
              </span>
            </div>
            <div className="flex-1 mt-[3%] h-1 mx-2 bg-success-600 rounded-full" />
            <div className="flex flex-col items-center text-success-600">
              <div className="w-7 h-7 md:h-9 md:w-9  rounded-full flex items-center justify-center border-2 border-success-600 bg-success-600 text-white shadow-md">
                ✓
              </div>
              <span className="mt-1 text-center text-xs md:text-sm font-medium max-w-16 md:max-w-sm">
                Find Vehicle
              </span>
            </div>
            <div className="flex-1 mt-[3%] h-1 mx-2 bg-success-600 rounded-full" />
            <div className="flex flex-col items-center text-primary">
              <div className="w-7 h-7 md:h-9 md:w-9  rounded-full flex items-center justify-center border-2 border-primary bg-primary text-white shadow-md">
                3
              </div>
              <span className="mt-1 text-center text-xs md:text-sm font-medium max-w-16 md:max-w-sm">
                Confirm Details
              </span>
            </div>
          </div>
        </div>

        <Card className="w-full border-0 shadow-card rounded-2xl overflow-hidden animate-slide-up">
          <CardHeader className="text-center pb-4 pt-4 px-4">
            <CardTitle className="text-2xl font-bold">
              Step 3: Confirm Details
            </CardTitle>
            <CardDescription className="text-base mt-2">
              We need a few more details to give you a final cash value
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="accidentDate" className="text-sm font-medium">
                  When was the accident?
                </Label>
                <Input
                  id="accidentDate"
                  name="accidentDate"
                  type="date"
                  value={formData.accidentDate}
                  onChange={handleChange}
                  required
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repairCost" className="text-sm font-medium">
                  What was the estimated or actual cost of repairs?
                </Label>
                <Input
                  id="repairCost"
                  name="repairCost"
                  value={formData.repairCost}
                  type="number"
                  onChange={handleChange}
                  placeholder="$5,000"
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="zipcode" className="text-sm font-medium">
                  Zipcode
                </Label>
                <Input
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="12345"
                  minLength={5}
                  type="number"
                  required
                  className={`rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary ${
                    errors.zipcode ? "border-red-500" : ""
                  }`}
                />
                {errors.zipcode && (
                  <p className="text-sm text-red-500 mt-1">{errors.zipcode}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage" className="text-sm font-medium">
                  How many miles were on your odometer at the time of the
                  accident?
                </Label>
                <Input
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  placeholder="25000"
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  minLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  required
                  className={`rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm lg:text-base text-gray-600 font-medium mb-3">
                Can provide later if needed:
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="atFaultName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name of Person at Fault
                  </Label>
                  <Input
                    id="atFaultName"
                    name="atFaultName"
                    value={formData.atFaultName}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="atFaultInsurance"
                    className="text-sm font-medium text-gray-700"
                  >
                    Person at Fault's Insurance
                  </Label>
                  <Input
                    id="atFaultInsurance"
                    name="atFaultInsurance"
                    value={formData.atFaultInsurance}
                    onChange={handleChange}
                    placeholder="State Farm"
                    className="rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-100"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-5">
                <Label
                  htmlFor="repairClaimNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Claim Number for Repair
                </Label>
                <Input
                  id="repairClaimNumber"
                  name="repairClaimNumber"
                  value={formData.repairClaimNumber}
                  onChange={handleChange}
                  placeholder="Enter claim number"
                  className="rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-100"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-4 pb-4 flex-col gap-8">
            <Button
              className="w-full bg-gradient-success hover:opacity-90 text-white font-bold rounded-xl shadow-md hover:shadow-lg text-sm px-6 py-2 md:text-lg md:py-3.5 md:px-8 transition-all duration-200"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Receive Instant Diminished Cash Value!
            </Button>

            <div className="space-y-2 bg-primary-50 p-3 rounded-xl border border-primary-100 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="grid gap-1.5 leading-none">
                  <label className="text-sm text-gray-600">
                    I acknowledge that by clicking the "Receive Instant
                    Diminished Cash Value!" button as my official signature
                  </label>
                  <p className="text-sm text-gray-600 mt-2">
                    I consent to representatives of Prime Counsel Law Group to
                    contact me about the auto accident via email, text, or phone
                    including my mobile number provided above using an automatic
                    dialer or pre-recorded message. I understand that my consent
                    is not required to continue and I may withdraw my consent at
                    any time. By clicking above, I clarify that I am a US
                    resident over 18, and I agree to the Privacy Policy and
                    Terms of Service.
                  </p>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
