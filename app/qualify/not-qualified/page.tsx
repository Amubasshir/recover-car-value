import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import { SimpleHeader } from "@/components/simple-header"
import { SimpleFooter } from "@/components/simple-footer"

export default function NotQualified() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md text-center border-0 shadow-card rounded-2xl overflow-hidden animate-fade-in">
          <CardHeader className="pb-4 pt-8 px-8">
            <div className="mx-auto bg-red-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-sm">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-bold">Not Qualified</CardTitle>
            <CardDescription className="text-base mt-2">
              Unfortunately, you don't qualify for a diminished value claim at this time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <p className="text-gray-600">
              Based on your answers, your situation doesn't meet the criteria for a diminished value claim. This is
              typically because:
            </p>
            <ul className="text-left list-disc list-inside space-y-2 bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 text-gray-600">
              <li>The accident occurred more than 4 years ago</li>
              <li>You were at fault in the accident</li>
              <li>You don't own the vehicle (it's leased)</li>
            </ul>
            <p className="mt-4 text-gray-600">
              If your circumstances change or if you have another vehicle that was in an accident, please feel free to
              try again.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 px-8 pb-8">
            <Link href="/" className="w-full">
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-xl shadow-md hover:shadow-lg py-6 text-lg">
                Return to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>

    </div>
  )
}
