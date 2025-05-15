"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Failed() {
  const router = useRouter()
  
  const handleHandleGoBack = () => {
    // Navigate to thank you page
    router.push("/")
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white flex flex-col h-[75vh]">
      <main className="flex-1 h-full flex justify-center items-center container max-w-3xl mx-auto px-4 py-4 md:py-8 animate-fade-in">
        <Card className="w-full border-0 shadow-card rounded-2xl overflow-hidden animate-slide-up">
          <CardHeader className="text-center pb-4 pt-4 px-4">            
            <div className="text-4xl font-bold text-gray-600 animate-pulse-subtle">Unfortunately you do not qualify. </div>
          </CardHeader>
          <CardContent className="space-y-4 px-4">
            <p className="text-center text-lg text-gray-600">
              You must answer <b>"Yes"</b> to all qualifying questions in for us to represent you in this matter.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <Button onClick={handleHandleGoBack}>Home</Button>
          </CardFooter>
        </Card>
      </main>

    </div>
  )
}
