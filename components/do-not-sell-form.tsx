"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function DoNotSellForm() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      deleteData: formData.get("deleteData") === "on",
      salesOptOut: formData.get("salesOptOut") === "on",
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      californiaResident: formData.get("californiaResident"),
      homeAddress: formData.get("homeAddress"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      additionalInfo: formData.get("additionalInfo"),
    }

    try {
      const response = await fetch("/api/do-not-sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setOpen(false)
          setSubmitted(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          Do Not Sell My Personal Information
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-primary">Do Not Sell My Personal Information</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <p className="text-lg font-semibold text-green-600">Thank you for your submission!</p>
            <p className="text-sm text-muted-foreground mt-2">We will process your request shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Request Type(s)</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="deleteData" name="deleteData" />
                  <label htmlFor="deleteData" className="text-sm cursor-pointer">
                    Delete Data
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="salesOptOut" name="salesOptOut" />
                  <label htmlFor="salesOptOut" className="text-sm cursor-pointer">
                    Sales Opt Out
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">California Resident?</Label>
              <RadioGroup name="californiaResident" defaultValue="no">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="ca-yes" />
                  <label htmlFor="ca-yes" className="text-sm cursor-pointer">
                    Yes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="ca-no" />
                  <label htmlFor="ca-no" className="text-sm cursor-pointer">
                    No
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="homeAddress">Home Address</Label>
              <Input id="homeAddress" name="homeAddress" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" name="zipCode" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="(XXX) XXX-XXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea id="additionalInfo" name="additionalInfo" rows={4} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
