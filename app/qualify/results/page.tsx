"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Results() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    repairClaimNumber: "", // Add new field
  });
  const [agreedToRepresentation, setAgreedToRepresentation] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(0);

  useEffect(() => {
    // Get user data from localStorage
    const confirmationData = localStorage.getItem("confirmationData");
    const diminishedVehicleData = localStorage.getItem("diminishedVehicleData");
    if (
      confirmationData &&
      diminishedVehicleData &&
      confirmationData !== "null" &&
      diminishedVehicleData !== "undefined"
    ) {
      const data = JSON.parse(confirmationData || "{}");
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        repairClaimNumber: data.repairClaimNumber, // Add new field
      });
      const vehicleData = JSON.parse(diminishedVehicleData || "{}");

      setEstimatedValue(vehicleData?.estimated_diminished_value || 0);
    } else {
      // If no data found, redirect to step 1
      router.push("/qualify/step3");
    }

  }, [router]);


  const handleSignUp = () => {
    // Navigate to thank you page
    router.push("/qualify/thank-you");
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-4 md:py-8 animate-fade-in">
        <Card className="w-full border-0 shadow-card rounded-2xl overflow-hidden animate-slide-up">
          <CardHeader className="text-center pb-4 pt-4 px-4">
            <CardDescription className="text-base mt-2">
              {/* Great news, You Qualify For: */}
              Great news, Your diminished value range:
            </CardDescription>
            <div className="text-3xl md:text-4xl font-bold text-success-600 mt-6 animate-pulse-subtle flex  md:flex-row justify-center items-center gap-1.5 md:gap-3">
              {/* <span>${(estimatedValue * 0.6)?.toFixed(2)}</span> */}
              <span>${(estimatedValue * 0.6)}</span>
              <span> - </span>
              {/* <span>${estimatedValue?.toFixed(2)}</span> */}
              <span>${estimatedValue}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-4">
            <p className="text-center text-gray-600">
              Please check the box and click the sign up button below for us to
              represent you in pursuing your diminished value claim.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800">
                  {userData.firstName} {userData.lastName}
                </p>
                <p className="text-sm text-gray-500">{userData.phone}</p>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>

            <div className="space-y-2 border border-primary-100 bg-primary-50 p-3 md:p-6 rounded-xl shadow-sm">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="representation"
                  checked={agreedToRepresentation}
                  onCheckedChange={setAgreedToRepresentation}
                  className="mt-1 w-5 h-5 md:w-6 md:h-6 border-2 border-primary-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="">
                  <p className="text-sm lg:text-base text-gray-600 leading-[1.6] md:leading-normal">
                    I hereby acknowledge and agree to be represented by Prime
                    Counsel Law Group, LLC in this legal matter and have read
                    and understand the terms of representation of their
                    agreement and there is no cost unless we win which is 33
                    1/3% service fee of collected amount.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-4 pb-4">
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
    </div>
  );
}
