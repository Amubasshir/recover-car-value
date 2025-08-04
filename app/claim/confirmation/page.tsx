import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, Scale } from 'lucide-react';

export default function Confirmation() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Card className="w-full max-w-md text-center border-0 shadow-card rounded-2xl overflow-hidden animate-fade-in mt-8">
        <CardHeader className="pb-4 pt-8 px-8">
          <div className="mx-auto bg-success-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle className="h-10 w-10 text-success-600" />
          </div>
          <CardTitle className="text-3xl font-bold">
            Claim Submitted Successfully!
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Thank you for submitting your diminished value claim
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8">
          <p className="text-gray-600">
            Your claim has been received and is being processed. A claim
            specialist will contact you within 1-2 business days to discuss the
            next steps.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl text-left shadow-sm border border-gray-100">
            <p className="font-medium text-lg">What happens next?</p>
            <ol className="list-decimal list-inside mt-3 space-y-2 text-gray-600">
              <li>Our team will review your claim details</li>
              <li>
                A specialist will contact you to gather any additional
                information
              </li>
              <li>We'll assess your vehicle's diminished value</li>
              <li>
                We'll prepare and submit your claim to the insurance company
              </li>
              <li>
                We'll negotiate on your behalf to maximize your compensation
              </li>
            </ol>
          </div>

          <div className="border border-primary-200 bg-primary-50 p-6 rounded-xl text-left mt-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Scale className="h-6 w-6 text-primary" />
              <p className="font-medium text-lg">Recover Car Value</p>
            </div>
            <p className="text-gray-600">
              You've opted to be represented by Recover Car Value. An attorney
              will contact you shortly to discuss your case and the next steps
              in the legal process.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 px-8 pb-8">
          <p className="text-sm text-gray-500 mt-2">
            Reference ID:{' '}
            {Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
