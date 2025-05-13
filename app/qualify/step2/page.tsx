"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimpleHeader } from "@/components/simple-header"
import { SimpleFooter } from "@/components/simple-footer"

export default function QualifyStep2() {
  const router = useRouter()
  const [vehicleData, setVehicleData] = useState({
    licensePlate: "",
    state: "",
    make: "",
    model: "",
    year: "",
    trim: "",
  })

  const [activeTab, setActiveTab] = useState("license")

  useEffect(() => {
    // Check if user qualified in step 1
    const qualifyAnswers = localStorage.getItem("qualifyAnswers")
    if (qualifyAnswers) {
      const answers = JSON.parse(qualifyAnswers)
      if (!(answers.recentAccident && answers.notAtFault && answers.ownVehicle)) {
        router.push("/qualify/not-qualified")
      }
    } else {
      // If no answers found, redirect to step 1
      router.push("/qualify/step1")
    }
  }, [router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setVehicleData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setVehicleData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinue = () => {
    // Store vehicle data in localStorage
    localStorage.setItem("vehicleData", JSON.stringify(vehicleData))
    router.push("/qualify/step3")
  }

  const isLicensePlateValid = activeTab === "license" && vehicleData.licensePlate && vehicleData.state
  const isVehicleSelectValid = activeTab === "select" && vehicleData.make && vehicleData.model && vehicleData.year

  const isFormValid = activeTab === "license" ? isLicensePlateValid : isVehicleSelectValid

  // Generate years for dropdown (current year down to 2000)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => (currentYear - i).toString())

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <SimpleHeader />

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-16 animate-fade-in">
        <div className="mb-8">
          <Link
            href="/qualify/step1"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Previous Step
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center text-success-600">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-success-600 bg-success-600 text-white shadow-md">
                ✓
              </div>
              <span className="mt-2 text-sm font-medium">Qualify</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-success-600 rounded-full" />
            <div className="flex flex-col items-center text-primary">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-primary bg-primary text-white shadow-md">
                2
              </div>
              <span className="mt-2 text-sm font-medium">Find Vehicle</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200 rounded-full" />
            <div className="flex flex-col items-center text-gray-400">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-gray-200 bg-white shadow-sm">
                3
              </div>
              <span className="mt-2 text-sm font-medium">Confirm Details</span>
            </div>
          </div>
        </div>

        <Card className="w-full border-0 shadow-card rounded-2xl overflow-hidden animate-slide-up">
          <CardHeader className="text-center pb-4 pt-8 px-8">
            <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-semibold text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit mx-auto mb-4 shadow-sm">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                Trusted Law Firm
              </span>
            </div>
            <CardTitle className="text-2xl font-bold">Step 2: Find Vehicle</CardTitle>
            <CardDescription className="text-base mt-2">Provide your vehicle information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <Tabs defaultValue="license" className="w-full" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid w-full grid-cols-2 rounded-lg p-1 shadow-sm">
                <TabsTrigger value="license" className="rounded-md data-[state=active]:shadow-sm">
                  License Plate
                </TabsTrigger>
                <TabsTrigger value="select" className="rounded-md data-[state=active]:shadow-sm">
                  Select Vehicle
                </TabsTrigger>
              </TabsList>
              <TabsContent value="license" className="space-y-5 pt-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate" className="text-sm font-medium">
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
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">
                      State
                    </Label>
                    <Select value={vehicleData.state} onValueChange={(value) => handleSelectChange("state", value)}>
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
                  <div className="space-y-2">
                    <Label htmlFor="make" className="text-sm font-medium">
                      Make
                    </Label>
                    <Select value={vehicleData.make} onValueChange={(value) => handleSelectChange("make", value)}>
                      <SelectTrigger
                        id="make"
                        className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-md">
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="ford">Ford</SelectItem>
                        <SelectItem value="chevrolet">Chevrolet</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="lexus">Lexus</SelectItem>
                        <SelectItem value="subaru">Subaru</SelectItem>
                        <SelectItem value="kia">Kia</SelectItem>
                        <SelectItem value="hyundai">Hyundai</SelectItem>
                        <SelectItem value="mazda">Mazda</SelectItem>
                        <SelectItem value="volkswagen">Volkswagen</SelectItem>
                        <SelectItem value="jeep">Jeep</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model" className="text-sm font-medium">
                      Model
                    </Label>
                    <Input
                      id="model"
                      name="model"
                      value={vehicleData.model}
                      onChange={handleChange}
                      placeholder="Camry"
                      className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-sm font-medium">
                      Year
                    </Label>
                    <Select value={vehicleData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                      <SelectTrigger
                        id="year"
                        className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-md max-h-[240px]">
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trim" className="text-sm font-medium">
                      Trim (Optional)
                    </Label>
                    <Input
                      id="trim"
                      name="trim"
                      value={vehicleData.trim}
                      onChange={handleChange}
                      placeholder="LE, XLE, etc."
                      className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <Button
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-lg"
              onClick={handleContinue}
              disabled={!isFormValid}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      </main>

      <SimpleFooter />
    </div>
  )
}
