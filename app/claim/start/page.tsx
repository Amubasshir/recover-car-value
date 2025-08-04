"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { SimpleHeader } from "@/components/simple-header"

// Update the styling in the ClaimForm component
export default function ClaimForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleVin: "",
    mileage: "",
    accidentDate: "",
    atFault: "",
    damageDescription: "",
    repairCost: "",
    insuranceCompany: "",
    claimNumber: "",
    additionalInfo: "",
    optInLawFirm: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push("/claim/confirmation")
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="w-full max-w-3xl mx-auto border-0 shadow-card rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-4 pt-8 px-8">
              <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
              <CardDescription className="text-base mt-2">Please provide your contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8">
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
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
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
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    required
                    className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between px-8 pb-8">
              <Link href="/">
                <Button variant="outline" className="rounded-lg shadow-sm hover:shadow-md">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Button>
              </Link>
              <Button
                onClick={nextStep}
                className="bg-gradient-primary hover:opacity-90 text-white rounded-lg shadow-md hover:shadow-lg"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )
      case 2:
        return (
          <Card className="w-full max-w-3xl mx-auto border-0 shadow-card rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-4 pt-8 px-8">
              <CardTitle className="text-2xl font-bold">Vehicle Information</CardTitle>
              <CardDescription className="text-base mt-2">Tell us about your vehicle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="vehicleYear" className="text-sm font-medium">
                    Year
                  </Label>
                  <Input
                    id="vehicleYear"
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    placeholder="2020"
                    required
                    className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleMake" className="text-sm font-medium">
                    Make
                  </Label>
                  <Input
                    id="vehicleMake"
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleChange}
                    placeholder="Toyota"
                    required
                    className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel" className="text-sm font-medium">
                    Model
                  </Label>
                  <Input
                    id="vehicleModel"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    placeholder="Camry"
                    required
                    className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="vehicleVin" className="text-sm font-medium">
                    VIN (Vehicle Identification Number)
                  </Label>
                  <Input
                    id="vehicleVin"
                    name="vehicleVin"
                    value={formData.vehicleVin}
                    onChange={handleChange}
                    placeholder="1HGCM82633A123456"
                    required
                    className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileage" className="text-sm font-medium">
                    Current Mileage
                  </Label>
                  <Input
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="25000"
                    required
                    className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between px-8 pb-8">
              <Button variant="outline" onClick={prevStep} className="rounded-lg shadow-sm hover:shadow-md">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={nextStep}
                className="bg-gradient-primary hover:opacity-90 text-white rounded-lg shadow-md hover:shadow-lg"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )
      case 3:
        return (
          <Card className="w-full max-w-3xl mx-auto border-0 shadow-card rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-4 pt-8 px-8">
              <CardTitle className="text-2xl font-bold">Accident Information</CardTitle>
              <CardDescription className="text-base mt-2">Tell us about the accident</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="accidentDate" className="text-sm font-medium">
                    Date of Accident
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
                  <Label htmlFor="atFault" className="text-sm font-medium">
                    Were you at fault?
                  </Label>
                  <RadioGroup
                    id="atFault"
                    name="atFault"
                    value={formData.atFault}
                    onValueChange={(value) => handleSelectChange("atFault", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="atFault-no" className="border-2" />
                      <Label htmlFor="atFault-no" className="font-medium">
                        No
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="atFault-yes" className="border-2" />
                      <Label htmlFor="atFault-yes" className="font-medium">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partial" id="atFault-partial" className="border-2" />
                      <Label htmlFor="atFault-partial" className="font-medium">
                        Partially
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="damageDescription" className="text-sm font-medium">
                  Description of Damage
                </Label>
                <Textarea
                  id="damageDescription"
                  name="damageDescription"
                  value={formData.damageDescription}
                  onChange={handleChange}
                  placeholder="Please describe the damage to your vehicle"
                  required
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repairCost" className="text-sm font-medium">
                  Total Repair Cost (if known)
                </Label>
                <Input
                  id="repairCost"
                  name="repairCost"
                  value={formData.repairCost}
                  onChange={handleChange}
                  placeholder="$5,000"
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between px-8 pb-8">
              <Button variant="outline" onClick={prevStep} className="rounded-lg shadow-sm hover:shadow-md">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={nextStep}
                className="bg-gradient-primary hover:opacity-90 text-white rounded-lg shadow-md hover:shadow-lg"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )
      case 4:
        return (
          <Card className="w-full max-w-3xl mx-auto border-0 shadow-card rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-4 pt-8 px-8">
              <CardTitle className="text-2xl font-bold">Insurance Information</CardTitle>
              <CardDescription className="text-base mt-2">Tell us about your insurance claim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8">
              <div className="space-y-2">
                <Label htmlFor="insuranceCompany" className="text-sm font-medium">
                  Insurance Company
                </Label>
                <Select
                  value={formData.insuranceCompany}
                  onValueChange={(value) => handleSelectChange("insuranceCompany", value)}
                >
                  <SelectTrigger
                    id="insuranceCompany"
                    className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <SelectValue placeholder="Select insurance company" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-md">
                    <SelectItem value="state-farm">State Farm</SelectItem>
                    <SelectItem value="geico">Geico</SelectItem>
                    <SelectItem value="progressive">Progressive</SelectItem>
                    <SelectItem value="allstate">Allstate</SelectItem>
                    <SelectItem value="liberty-mutual">Liberty Mutual</SelectItem>
                    <SelectItem value="farmers">Farmers</SelectItem>
                    <SelectItem value="nationwide">Nationwide</SelectItem>
                    <SelectItem value="travelers">Travelers</SelectItem>
                    <SelectItem value="american-family">American Family</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="claimNumber" className="text-sm font-medium">
                  Claim Number
                </Label>
                <Input
                  id="claimNumber"
                  name="claimNumber"
                  value={formData.claimNumber}
                  onChange={handleChange}
                  placeholder="123456789"
                  required
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-sm font-medium">
                  Additional Information
                </Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any additional information that might be relevant to your claim"
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary min-h-[120px]"
                />
              </div>
              <div className="space-y-2 mt-8 bg-primary-50 p-6 rounded-xl border border-primary-100">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="optInLawFirm"
                    checked={formData.optInLawFirm}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, optInLawFirm: checked === true }))}
                    className="border-2 border-primary-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="optInLawFirm"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to sign up with Recover Car Value
                    </label>
                    <p className="text-sm text-gray-600 mt-2">
                      By checking this box, you authorize Recover Car Value to represent you in your diminished value
                      claim and agree to their terms of service.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between px-8 pb-8">
              <Button variant="outline" onClick={prevStep} className="rounded-lg shadow-sm hover:shadow-md">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-success hover:opacity-90 text-white font-bold rounded-lg shadow-md hover:shadow-lg px-6 py-6"
              >
                Submit Claim
              </Button>
            </CardFooter>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="mb-8 mt-8">
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">File Your Diminished Value Claim</h1>
        <p className="mt-3 text-gray-600">Complete the form below to start your claim process</p>
      </div>

      <div className="mb-12 max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-primary bg-primary text-white shadow-md" : "border-gray-200 shadow-sm"}`}
            >
              {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : 1}
            </div>
            <span className="mt-2 text-sm font-medium">Personal</span>
          </div>
          <div className={`flex-1 h-1 mx-2 rounded-full ${step > 1 ? "bg-primary" : "bg-gray-200"}`} />
          <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-primary bg-primary text-white shadow-md" : "border-gray-200 shadow-sm"}`}
            >
              {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : 2}
            </div>
            <span className="mt-2 text-sm font-medium">Vehicle</span>
          </div>
          <div className={`flex-1 h-1 mx-2 rounded-full ${step > 2 ? "bg-primary" : "bg-gray-200"}`} />
          <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-primary bg-primary text-white shadow-md" : "border-gray-200 shadow-sm"}`}
            >
              {step > 3 ? <CheckCircle2 className="h-5 w-5" /> : 3}
            </div>
            <span className="mt-2 text-sm font-medium">Accident</span>
          </div>
          <div className={`flex-1 h-1 mx-2 rounded-full ${step > 3 ? "bg-primary" : "bg-gray-200"}`} />
          <div className={`flex flex-col items-center ${step >= 4 ? "text-primary" : "text-gray-400"}`}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step >= 4 ? "border-primary bg-primary text-white shadow-md" : "border-gray-200 shadow-sm"}`}
            >
              4
            </div>
            <span className="mt-2 text-sm font-medium">Insurance</span>
          </div>
        </div>
      </div>

      <div className="animate-fade-in">{renderStep()}</div>
    </div>
  )
}
