"use client";


import dynamic from "next/dynamic";
const DemandLetterPdf = dynamic(() => import("@/components/DemandLetterPdf"), {
  ssr: false,
});

// import DemandLetterPdf from "@/components/DemandLetterPdf";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function QualifyStep3() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    accidentDate: "",
    repairCost: "",
    mileage: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    atFaultName: "",
    atFaultInsurance: "",
    faultInsuranceAddress: "",
    repairClaimNumber: "", // Add new field
    state: "", // Add new field
  });

  const [vehicleData, setVehicleData] = useState({});
  const [qualifiedAnswers, setQualifiedAnswers] = useState({});
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  // Add this after the formData state
  const [errors, setErrors] = useState({
    phone: "",
    mileage: "",
  });

  useEffect(() => {
    // Check if user completed previous steps
    const qualifyAnswers = localStorage.getItem("qualifyAnswers");
    const vehicleData = localStorage.getItem("vehicleData");
    const selectedMethodStorage = localStorage.getItem("selectedMethod");

    setVehicleData(JSON.parse(vehicleData || "{}"));
    setQualifiedAnswers(JSON.parse(qualifyAnswers || "{}"));
    setSelectedMethod(selectedMethodStorage || "");
  }, [router]);

  // Replace the existing handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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
    if (name === "mileage") {
      if (!value || Number(value) < 3000) {
        setErrors((prev) => ({
          ...prev,
          mileage: "Mileage must be at least 3000",
        }));
      } else {
        setErrors((prev) => ({ ...prev, mileage: "" }));
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {

    try {
      const response = await fetch(`/api/diminished-value`, {
        method: "POST",
        body: JSON.stringify({
          year: vehicleData.year,
          make: vehicleData.make,
          model: vehicleData.model,
          state: formData?.state,
          trim: vehicleData.trim,
          heading:
            vehicleData.year + " " + vehicleData.make + " " + vehicleData.model,
          accidentMileage: formData.mileage,
          repairCost: formData.repairCost,
          accidentDate: formData.accidentDate,
          vin: vehicleData.vin,
          qualify_answers: qualifiedAnswers,
          client_info: {
            name: formData.firstName + " " + formData.lastName,
            phone: formData.phone,
            email: formData.email,
            insuranceCompanyName: formData.atFaultInsurance,
            insuranceCompanyAddress: formData.faultInsuranceAddress,
            insuredName: formData.atFaultName,
            claimNumber: formData.repairClaimNumber,
          },
          mileage: formData.mileage,
          selectedMethod,
        }),
      });

      const data = await response.json();

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success(
        "Vehicle information retrieved successfully! Please check your email for the report."
      );

      localStorage.setItem("diminishedVehicleData", JSON.stringify(data?.data));
      localStorage.setItem("confirmationData", JSON.stringify(formData));
      setIsLoading(false);
      router.push("/qualify/results");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to lookup vehicle information"
      );
    } finally {
      setIsLoading(false);
    }

  };


  console.log("form Data", {formData})

  const isFormValid =
    formData.accidentDate &&
    formData.firstName &&
    formData.lastName &&
    formData.phone &&
    formData.email &&
    Number(formData.mileage) >= 3000 &&
    formData.phone.length >= 10 &&
    !errors.phone &&
    !errors.mileage;

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
                <Label htmlFor="state" className="text-sm font-medium">
                  State
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleSelectChange("state", value)}
                >
                  <SelectTrigger
                    id="state"
                    className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-md">
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="AR">Arkansas</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="CO">Colorado</SelectItem>
                    <SelectItem value="CT">Connecticut</SelectItem>
                    <SelectItem value="DE">Delaware</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    <SelectItem value="HI">Hawaii</SelectItem>
                    <SelectItem value="ID">Idaho</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="IN">Indiana</SelectItem>
                    <SelectItem value="IA">Iowa</SelectItem>
                    <SelectItem value="KS">Kansas</SelectItem>
                    <SelectItem value="KY">Kentucky</SelectItem>
                    <SelectItem value="LA">Louisiana</SelectItem>
                    <SelectItem value="ME">Maine</SelectItem>
                    <SelectItem value="MD">Maryland</SelectItem>
                    <SelectItem value="MA">Massachusetts</SelectItem>
                    <SelectItem value="MI">Michigan</SelectItem>
                    <SelectItem value="MN">Minnesota</SelectItem>
                    <SelectItem value="MS">Mississippi</SelectItem>
                    <SelectItem value="MO">Missouri</SelectItem>
                    <SelectItem value="MT">Montana</SelectItem>
                    <SelectItem value="NE">Nebraska</SelectItem>
                    <SelectItem value="NV">Nevada</SelectItem>
                    <SelectItem value="NH">New Hampshire</SelectItem>
                    <SelectItem value="NJ">New Jersey</SelectItem>
                    <SelectItem value="NM">New Mexico</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="NC">North Carolina</SelectItem>
                    <SelectItem value="ND">North Dakota</SelectItem>
                    <SelectItem value="OH">Ohio</SelectItem>
                    <SelectItem value="OK">Oklahoma</SelectItem>
                    <SelectItem value="OR">Oregon</SelectItem>
                    <SelectItem value="PA">Pennsylvania</SelectItem>
                    <SelectItem value="RI">Rhode Island</SelectItem>
                    <SelectItem value="SC">South Carolina</SelectItem>
                    <SelectItem value="SD">South Dakota</SelectItem>
                    <SelectItem value="TN">Tennessee</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="UT">Utah</SelectItem>
                    <SelectItem value="VT">Vermont</SelectItem>
                    <SelectItem value="VA">Virginia</SelectItem>
                    <SelectItem value="WA">Washington</SelectItem>
                    <SelectItem value="WV">West Virginia</SelectItem>
                    <SelectItem value="WI">Wisconsin</SelectItem>
                    <SelectItem value="WY">Wyoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 ">
              <div className="space-y-2">
                <Label htmlFor="mileage" className="text-sm font-medium">
                  How many miles were on your odometer at the time of the
                  accident?
                </Label>
                <Input
                  id="mileage"
                  type="number"
                  name="mileage"
                  min={3000}
                  value={formData.mileage}
                  onChange={handleChange}
                  placeholder="At least 3000 miles required."
                  className={`rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary ${
                    errors.mileage ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.mileage && (
                  <p className="text-sm text-red-500 mt-1">{errors.mileage}</p>
                )}
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
                  Fault Insurance Address
                </Label>
                <Textarea
                  id="faultInsuranceAddress"
                  name="faultInsuranceAddress"
                  value={formData.faultInsuranceAddress}
                  onChange={handleChange}
                  placeholder="Enter Fault Insurance Address"
                  className="rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-100"
                />
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

             {/* <DemandLetterPdf currentFormData={formData} vehicleData={vehicleData} qualifiedAnswers={qualifiedAnswers} selectedMethod={selectedMethod} /> */}

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
