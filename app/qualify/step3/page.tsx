"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Shield } from "lucide-react"
import { SimpleHeader } from "@/components/simple-header"
import { SimpleFooter } from "@/components/simple-footer"

export default function QualifyStep3() {
  const router = useRouter()
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
    agreeToTerms: false,
  })

  useEffect(() => {
    // Check if user completed previous steps
    const qualifyAnswers = localStorage.getItem("qualifyAnswers")
    const vehicleData = localStorage.getItem("vehicleData")

    if (!qualifyAnswers || !vehicleData) {
      router.push("/qualify/step1")
    }
  }, [router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
  }

  const handleSubmit = () => {
    // Store form data in localStorage
    localStorage.setItem("confirmationData", JSON.stringify(formData))

    // In a real application, you would send this data to your server
    // For now, we'll just navigate to the results page
    router.push("/qualify/results")
  }

  const isFormValid =
    formData.accidentDate &&
    formData.zipcode &&
    formData.firstName &&
    formData.lastName &&
    formData.phone &&
    formData.email &&
    formData.agreeToTerms

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <SimpleHeader />

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-16 animate-fade-in">
        <div className="mb-8">
          <Link
            href="/qualify/step2"
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
            <div className="flex flex-col items-center text-success-600">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-success-600 bg-success-600 text-white shadow-md">
                ✓
              </div>
              <span className="mt-2 text-sm font-medium">Find Vehicle</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-success-600 rounded-full" />
            <div className="flex flex-col items-center text-primary">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-primary bg-primary text-white shadow-md">
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
            <CardTitle className="text-2xl font-bold">Step 3: Confirm Details</CardTitle>
            <CardDescription className="text-base mt-2">
              We need a few more details to give you a final cash value
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8">
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
                  required
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage" className="text-sm font-medium">
                  How many miles were on your odometer at the time of the accident?
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
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  required
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
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

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="atFaultName" className="text-sm font-medium">
                  Name of Person at Fault
                </Label>
                <Input
                  id="atFaultName"
                  name="atFaultName"
                  value={formData.atFaultName}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="atFaultInsurance" className="text-sm font-medium">
                  Person at Fault's Insurance
                </Label>
                <Input
                  id="atFaultInsurance"
                  name="atFaultInsurance"
                  value={formData.atFaultInsurance}
                  onChange={handleChange}
                  placeholder="State Farm"
                  className="rounded-lg border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2 bg-primary-50 p-6 rounded-xl border border-primary-100 shadow-sm">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={handleCheckboxChange}
                  className="border-2 border-primary-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="agreeToTerms"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I acknowledge that by clicking the "Receive Instant Diminished Cash Value!" button as my official
                    signature
                  </label>
                  <p className="text-sm text-gray-600 mt-2">
                    I consent to representatives of Prime Counsel Law Group to contact me about the auto accident via
                    email, text, or phone including my mobile number provided above using an automatic dialer or
                    pre-recorded message. I understand that my consent is not required to continue and I may withdraw my
                    consent at any time. By clicking above, I clarify that I am a US resident over 18, and I agree to
                    the Privacy Policy and Terms of Service.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <Button
              className="w-full bg-gradient-success hover:opacity-90 text-white font-bold rounded-xl shadow-md hover:shadow-lg py-6 text-lg transition-all duration-200"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              Receive Instant Diminished Cash Value!
            </Button>
          </CardFooter>
        </Card>
      </main>

      <SimpleFooter />
    </div>
  )
}
