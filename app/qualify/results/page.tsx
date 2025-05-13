"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield } from "lucide-react"
import { SimpleHeader } from "@/components/simple-header"
import { SimpleFooter } from "@/components/simple-footer"

export default function Results() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  })
  const [agreedToRepresentation, setAgreedToRepresentation] = useState(false)
  const [estimatedValue, setEstimatedValue] = useState("$4,483.88")

  useEffect(() => {
    // Get user data from localStorage
    const confirmationData = localStorage.getItem("confirmationData")
    if (confirmationData) {
      const data = JSON.parse(confirmationData)
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
      })
    } else {
      // If no data found, redirect to step 1
      router.push("/qualify/step1")
    }

    // In a real application, you would calculate the diminished value based on the vehicle and accident details
    // For now, we'll just use a fixed value
  }, [router])

  const handleSignUp = () => {
    // In a real application, you would send this data to your server
    console.log("User signed up for representation:", {
      ...userData,
      agreedToRepresentation,
    })

    // Navigate to thank you page
    router.push("/qualify/thank-you")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <SimpleHeader />

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-16 animate-fade-in">
        <Card className="w-full border-0 shadow-card rounded-2xl overflow-hidden animate-slide-up">
          <CardHeader className="text-center pb-4 pt-8 px-8">
            <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-semibold text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit mx-auto mb-4 shadow-sm">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                Trusted Law Firm
              </span>
            </div>
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription className="text-base mt-2">Great news, You Qualify For:</CardDescription>
            <div className="text-6xl font-bold text-success-600 mt-6 animate-pulse-subtle">{estimatedValue}</div>
          </CardHeader>
          <CardContent className="space-y-8 px-8">
            <p className="text-center text-gray-600">
              Please check the box and click the sign up button below for us to represent you in pursuing your
              diminished value claim.
            </p>

            <div className="space-y-2 border border-primary-100 bg-primary-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="representation"
                  checked={agreedToRepresentation}
                  onCheckedChange={setAgreedToRepresentation}
                  className="border-2 border-primary-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="representation"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I hereby acknowledge and agree to be represented by Prime Counsel Law Group, LLC in this legal
                    matter
                  </label>
                  <p className="text-sm text-gray-600 mt-2">
                    and have read and understand the terms of representation of their agreement and there is no cost
                    unless we win which is 33 1/3% service fee of collected amount.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {userData.firstName} {userData.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{userData.phone}</p>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Ron Fulmore</p>
                  <p className="text-sm text-gray-500">321-948-1335</p>
                  <p className="text-sm text-gray-500">ron@drronfulmore.com</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <Button
              className="w-full bg-gradient-success hover:opacity-90 text-white font-bold rounded-xl shadow-md hover:shadow-lg py-6 text-lg transition-all duration-200"
              onClick={handleSignUp}
              disabled={!agreedToRepresentation}
            >
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </main>

      <SimpleFooter />
    </div>
  )
}
