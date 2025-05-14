import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md text-center border-0 shadow-card rounded-2xl overflow-hidden animate-fade-in">
          <CardHeader className="pb-4 pt-8 px-8">
            <div className="mx-auto bg-success-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle className="h-10 w-10 text-success-600" />
            </div>
            <CardTitle className="text-3xl font-bold">Thank You!</CardTitle>
            <CardDescription className="text-base mt-2">
              Your diminished value claim has been submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <p className="text-gray-600">
              A representative from Prime Counsel Law Group will contact you
              shortly to discuss your claim and the next steps.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl text-left shadow-sm border border-gray-100">
              <p className="font-medium text-lg">What happens next?</p>
              <ol className="list-decimal list-inside mt-3 space-y-2 text-gray-600">
                <li>Our legal team will review your claim details</li>
                <li>We'll contact you to gather any additional information</li>
                <li>
                  We'll prepare and submit your claim to the insurance company
                </li>
                <li>
                  We'll negotiate on your behalf to maximize your compensation
                </li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 px-8 pb-8">
            <Link href="/" className="w-full">
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-white rounded-xl shadow-md hover:shadow-lg py-6 text-lg">
                Return to Home
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Reference ID:{" "}
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
