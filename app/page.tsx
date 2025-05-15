import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import carImg from '../public/images/cars.jpg';

// Update the HeroSection component
const HeroSection = () => (
  <section className="w-full py-16 md:py-24 lg:py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
    <div className="container px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-grid-primary-100/20 bg-[size:20px_20px] opacity-20"></div>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center relative animate-fade-in">
        <div className="flex flex-col justify-center space-y-5">
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-balance text-center md:text-left">
              Your Car Loses Value After an Auto Accident - <br />
              {/* <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800"> */}
              We'll Help You Get That Money Back
            </h1>
            <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[600px] text-center md:text-left">
              "Even after repairs, your car is worth less. New laws allow you to
              recover the money lost - even if it happened years ago."
            </p>
          </div>
          <div className="block md:hidden">
            <Image
              src={carImg.src}
              height={600}
              width={600}
              alt="Recover Card Value"
            />
          </div>
          <div className="flex flex-col justify-center items-center md:items-right md:justify-start gap-3 min-[400px]:flex-row pt-2">
            <Link href="/qualify/step1">
              <Button size="lg" className="gap-2">
                Click to see if you qualify <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:flex flex-col justify-center space-y-5 hidden">
          <Image
            src={carImg.src}
            height={600}
            width={600}
            alt="Recover Card Value"
          />
        </div>
      </div>

      <QuoteCard />
    </div>
  </section>
);

// Update the QuoteCard component
const QuoteCard = () => (
  <div className="mx-auto lg:mx-0 mt-16 md:mt-36 relative animate-slide-up">
    <div className="bg-white p-8 rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 border border-gray-100">
      <div className="text-center mb-8">
        {/* <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800"> */}
        <h2 className="text-2xl font-bold bg-clip-text">FREE INSTANT QUOTE</h2>
        <p className="text-sm text-gray-500 mt-1">
          See how much you could recover in minutes
        </p>
      </div>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="bg-success-50 p-1.5 rounded-full">
            <CheckCircle className="h-5 w-5 text-success-600" />
          </div>
          <p className="font-medium">Accident in the last 4 years</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-success-50 p-1.5 rounded-full">
            <CheckCircle className="h-5 w-5 text-success-600" />
          </div>
          <p className="font-medium">Not your fault</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-success-50 p-1.5 rounded-full">
            <CheckCircle className="h-5 w-5 text-success-600" />
          </div>
          <p className="font-medium">You own the vehicle</p>
        </div>
        <Link href="/qualify/step1" className="w-full block mt-6">
          <Button className="w-full py-6 text-lg animate-pulse-subtle">
            START YOUR FREE QUOTE
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

// Update the HowItWorksSection component
const HowItWorksSection = () => (
  <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2 max-w-[800px]">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            How It Works
          </h2>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our simple 3-step process helps you recover your car's lost value
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
        {[
          {
            number: 1,
            title: 'Qualify',
            description:
              'Answer a few simple questions to see if you qualify for a diminished value claim.',
          },
          {
            number: 2,
            title: 'Find Vehicle',
            description:
              'Provide your vehicle information so we can calculate your diminished value.',
          },
          {
            number: 3,
            title: 'Confirm Details',
            description:
              'Provide a few more details about the accident and receive your instant cash value.',
          },
        ].map((step) => (
          <div
            key={step.number}
            className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-8 shadow-soft hover-card"
          >
            <div className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white font-bold shadow-md">
              {step.number}
            </div>
            <div className="pt-12">
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-600 mt-3">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Update the FAQSection component
const FAQSection = () => (
  <section
    id="faq"
    className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary-50"
  >
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2 max-w-[800px]">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Common questions about diminished value claims
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 lg:gap-8 mt-12">
        {[
          {
            title: 'What is a diminished value claim?',
            content:
              "A diminished value claim seeks compensation for the reduction in your vehicle's market value after it has been damaged and repaired. Even with perfect repairs, a vehicle with an accident history is worth less than one without.",
          },
          {
            title: 'Who qualifies for a diminished value claim?',
            content:
              "Generally, you may qualify if: your vehicle was damaged in an accident in the last 4 years that wasn't your fault, you own the vehicle (not leased), and the vehicle has been properly repaired.",
          },
          {
            title: 'How much can I expect to recover?',
            content:
              "The amount varies based on your vehicle's make, model, age, condition before the accident, and the extent of damage. Complete our quick 3-step process to get your instant diminished value quote.",
          },
        ].map((faq, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-white text-card-foreground shadow-soft hover:shadow-card transition-all duration-300"
          >
            <div className="p-8">
              <h3 className="text-xl font-bold">{faq.title}</h3>
              <p className="text-gray-600 mt-3">{faq.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Update the main Home component
export default function Home() {
  return (
    <>
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FAQSection />
      </main>
    </>
  );
}
