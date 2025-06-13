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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleInfo } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function QualifyStep2() {
  const router = useRouter();
  const [vehicleData, setVehicleData] = useState({
    licensePlate: "",
    state: "",
    make: "",
    model: "",
    year: "",
    trim: "",
  });
  const currentYear = new Date().getFullYear();
  const allYears = Array.from(
    { length: currentYear + 1 - 1800 + 1 },
    (_, i) => 1800 + i
  ).reverse();
  const [years, setYears] = useState<string[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [trims, setTrims] = useState<string[]>([]);
  const [loading, setLoading] = useState({
    year: true,
    make: false,
    model: false,
    trim: false,
  });

  const [activeTab, setActiveTab] = useState("license");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch years on component mount
  //   useEffect(() => {
  //     fetchOptions("year");
  //   }, []);

  // Fetch makes when year changes
  useEffect(() => {
    if (vehicleData.year) {
      fetchOptions("make", { year: vehicleData.year });
      // Reset dependent fields
      setVehicleData((prev) => ({ ...prev, make: "", model: "", trim: "" }));
      setModels([]);
      setTrims([]);
    }
  }, [vehicleData.year]);

  // Fetch models when make changes
  useEffect(() => {
    if (vehicleData.make) {
      fetchOptions("model", { year: vehicleData.year, make: vehicleData.make });
      // Reset dependent fields
      setVehicleData((prev) => ({ ...prev, model: "", trim: "" }));
      setTrims([]);
    }
  }, [vehicleData.make]);

  // Fetch trims when model changes
  useEffect(() => {
    if (vehicleData.model) {
      fetchOptions("trim", {
        year: vehicleData.year,
        make: vehicleData.make,
        model: vehicleData.model,
      });
      // Reset dependent field
      setVehicleData((prev) => ({ ...prev, trim: "" }));
    }
  }, [vehicleData.model]);

  const fetchOptions = async (field: string, filters = {}) => {
    setLoading((prev) => ({ ...prev, [field]: true }));
    try {
      const params = new URLSearchParams({ field, ...filters });
    //   const response = await fetch(`/api/vehicles/options?${params}`);
      let response;
      console.log({field});
      if(field !== "trim"){
          response = await fetch(`/api/vehicles/options?${params}`);
      }else{
        response = await fetch(`/api/vehicles/trims?${params}`);
      }
      const result = await response.json();

      if (result.error) throw new Error(result.error);

      switch (field) {
        case "year":
          setYears(result.data);
          break;
        case "make":
          if (result.data.length === 0) {
            toast.error("No makes found for the selected year");
            setMakes(result.data);
            return;
          }
          setMakes(result.data);
          break;
        case "model":
          setModels(result.data);
          break;
        case "trim":
          setTrims(result.data);
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${field} options:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [field]: false }));
    }
  };

  useEffect(() => {
    // Check if user qualified in step 1
    const qualifyAnswers = localStorage.getItem("qualifyAnswers");
    if (qualifyAnswers) {
      const answers = JSON.parse(qualifyAnswers);
      if (
        !(answers.recentAccident && answers.notAtFault && answers.ownVehicle)
      ) {
        router.push("/qualify/not-qualified");
      }
    } else {
      // If no answers found, redirect to step 1
      router.push("/qualify/step1");
    }
  }, [router]);

  const handleResetForm = () => {
    setVehicleData({
      licensePlate: "",
      state: "",
      make: "",
      model: "",
      year: "",
      trim: "",
    });
    localStorage.removeItem("vehicleData");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = async () => {
    // functions
    // onError(null);

    if (activeTab === "license" && !vehicleData.licensePlate) {
      toast.error("License plate is required");
      return;
    }

    if (activeTab === "license" && !vehicleData.state) {
      toast.error("State is required");
      return;
    }

    // setIsLoading(true);
    if (activeTab === "license") {
      try {
        const response = await fetch("/api/vehicle/lookup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            licensePlate: vehicleData.licensePlate,
            state: vehicleData.state,
          }),
        });

        // console.log({response})

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to lookup license plate");
        }

        const vehicleInfo = (await response.json()) as VehicleInfo;
        // console.log("Vehicle Info:", vehicleInfo);
        localStorage.setItem(
          "vehicleData",
          JSON.stringify({
            ...vehicleInfo,
            licensePlate: vehicleData.licensePlate,
            plate: vehicleData.licensePlate,
            trim: vehicleData.trim,
          })
        );
        setIsLoading(false);
        router.push("/qualify/step3");

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
      // Store vehicle data in localStorage
    } else {
      localStorage.setItem(
        "vehicleData",
        JSON.stringify({
          ...vehicleData,
          licensePlate: vehicleData.licensePlate,
          plate: vehicleData.licensePlate,
        })
      );
      setIsLoading(false);
      router.push("/qualify/step3");
    }
  };

  const isLicensePlateValid =
    activeTab === "license" && vehicleData.licensePlate && vehicleData.state;
  const isVehicleSelectValid =
    activeTab === "select" &&
    vehicleData.make &&
    vehicleData.model &&
    vehicleData.year;
  const isFormValid =
    activeTab === "license" ? isLicensePlateValid : isVehicleSelectValid;

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
            <div className="flex flex-col items-center text-primary">
              <div className="w-7 h-7 md:h-9 md:w-9  rounded-full flex items-center justify-center border-2 border-primary bg-primary text-white shadow-md">
                2
              </div>
              <span className="mt-1 text-center text-xs md:text-sm font-medium max-w-16 md:max-w-sm">
                Find Vehicle
              </span>
            </div>
            <div className="flex-1 mt-[3%] h-1 mx-2 bg-gray-200 rounded-full" />
            <div className="flex flex-col items-center text-gray-400">
              <div className="w-7 h-7 md:h-9 md:w-9  rounded-full flex items-center justify-center border-2 border-gray-200 bg-white shadow-sm">
                3
              </div>
              <span className="mt-1 text-center text-xs md:text-sm font-medium max-w-16 md:max-w-sm">
                Confirm Details
              </span>
            </div>
          </div>
        </div>

        <Card className="w-full border-0 shadow-card rounded-2xl overflow-hidden animate-slide-up">
          <CardHeader className="text-center pb-8 pt-4 px-4">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Step 2: Find Vehicle
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Provide your vehicle information: Enter license plate or click
              Select Vehicle to choose vehicle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-4">
            <Tabs
              defaultValue="license"
              className="w-full"
              onValueChange={(e) => {
                setActiveTab(e);
                handleResetForm();
              }}
              value={activeTab}
            >
              <TabsList className="grid w-full grid-cols-2 rounded-lg p-1 shadow-sm">
                <TabsTrigger
                  value="license"
                  className="rounded-md data-[state=active]:shadow-sm"
                >
                  License Plate
                </TabsTrigger>
                <TabsTrigger
                  value="select"
                  className="rounded-md data-[state=active]:shadow-sm"
                >
                  Select Vehicle
                </TabsTrigger>
              </TabsList>
              <TabsContent value="license" className="space-y-5 pt-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="licensePlate"
                      className="text-sm font-medium"
                    >
                      License Plate #
                    </Label>
                    <Input
                      id="licensePlate"
                      name="licensePlate"
                      value={vehicleData.licensePlate}
                      onChange={handleChange}
                      placeholder="ABC123"
                      className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-sm font-medium">
                      State
                    </Label>
                    <Select
                      value={vehicleData.state}
                      onValueChange={(value) =>
                        handleSelectChange("state", value)
                      }
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
              </TabsContent>
              <TabsContent value="select" className="space-y-5 pt-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <div className="space-y-2">
                    <Label htmlFor="year" className="text-sm font-medium">
                      Year
                    </Label>
                    <Select
                      value={vehicleData.year}
                      onValueChange={(value) =>
                        handleSelectChange("year", value)
                      }
                      disabled={loading.year}
                    >
                      <SelectTrigger
                        id="year"
                        className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <SelectValue
                          placeholder={
                            loading.year ? "Loading years..." : "Select year"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-md max-h-[240px]">
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-sm font-medium">
                      Year
                    </Label>
                    <Select
                      value={vehicleData.year}
                      onValueChange={(value) =>
                        handleSelectChange("year", value)
                      }
                      // disabled={loading.year}
                    >
                      <SelectTrigger
                        id="year"
                        className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <SelectValue
                          placeholder={"Select year"}
                          // placeholder={loading.year ? "Loading years..." : "Select year"}
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-md max-h-[240px]">
                        {allYears.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="make" className="text-sm font-medium">
                      Make
                    </Label>
                    <Select
                      value={vehicleData.make}
                      onValueChange={(value) =>
                        handleSelectChange("make", value)
                      }
                      disabled={!vehicleData.year || loading.make}
                    >
                      <SelectTrigger
                        id="make"
                        className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <SelectValue
                          placeholder={
                            loading.make ? "Loading makes..." : "Select make"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-md">
                        {makes.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-sm font-medium">
                      Model
                    </Label>
                    <Select
                      value={vehicleData.model}
                      onValueChange={(value) =>
                        handleSelectChange("model", value)
                      }
                      disabled={!vehicleData.make || loading.model}
                    >
                      <SelectTrigger
                        id="model"
                        className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <SelectValue
                          placeholder={
                            loading.model ? "Loading models..." : "Select model"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-md">
                        {models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trim" className="text-sm font-medium">
                      Trim (Optional)
                    </Label>
                    <Select
                      value={vehicleData.trim}
                      onValueChange={(value) =>
                        handleSelectChange("trim", value)
                      }
                      disabled={!vehicleData.model || loading.trim}
                    >
                      <SelectTrigger
                        id="trim"
                        className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <SelectValue
                          placeholder={
                            loading.trim ? "Loading trims..." : "Select trim"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-md">
                        {trims.map((trim) => (
                          <SelectItem key={trim} value={trim}>
                            {trim}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-sm font-medium">
                      State
                    </Label>
                    <Select
                      value={vehicleData.state}
                      onValueChange={(value) =>
                        handleSelectChange("state", value)
                      }
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
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="px-4 pb-8">
            <Button
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm px-6 py-2 md:text-base md:py-3.5 md:px-8"
              onClick={handleContinue}
              disabled={!isFormValid}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
