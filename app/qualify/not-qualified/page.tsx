import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function NotQualified() {
  return (
    <div className=" bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md text-center border-0 shadow-card rounded-2xl overflow-hidden animate-fade-in">
          <CardHeader className="pb-4 pt-8 px-8">
            <div className="mx-auto bg-red-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-sm">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-bold">Not Qualified</CardTitle>
            <CardDescription className="text-base mt-2">
              Unfortunately you do not qualify. You must answer <b>"Yes"</b> to
              all qualifying questions in for us to represent you in this
              matter.
            </CardDescription>
          </CardHeader>
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
  );
}
