"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QualifyStep1() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    recentAccident: null,
    notAtFault: null,
    ownVehicle: null,
  });

  const handleAnswer = (question, answer) => {
    console.log(question, answer);
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const handleContinue = () => {
    // Store answers in localStorage to persist through the flow
    localStorage.setItem("qualifyAnswers", JSON.stringify(answers));

    // Check if all answers are "yes" to qualify
    if (answers.recentAccident && answers.notAtFault && answers.ownVehicle) {
      router.push("/qualify/step2");
    } else {
      router.push("/qualify/not-qualified");
    }
  };

  const allQuestionsAnswered =
    answers.recentAccident !== null &&
    answers.notAtFault !== null &&
    answers.ownVehicle !== null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-16 animate-fade-in">
        <div className="mb-12">
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-center text-primary">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 border-primary bg-primary text-white shadow-md">
                1
              </div>
              <span className="mt-2 text-center text-sm font-medium max-w-16 md:max-w-sm">
                Qualify
              </span>
            </div>
            <div className="flex-1 mt-[3.75%] h-1 mx-2 bg-gray-200 rounded-full" />
            <div className="flex flex-col items-center text-gray-400">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 border-gray-200 bg-white shadow-sm">
                2
              </div>
              <span className="mt-2 text-center text-sm font-medium max-w-16 md:max-w-sm">
                Find Vehicle
              </span>
            </div>
            <div className="flex-1 mt-[3.75%] h-1 mx-2 bg-gray-200 rounded-full" />
            <div className="flex flex-col items-center text-gray-400">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 border-gray-200 bg-white shadow-sm">
                3
              </div>
              <span className="mt-2 text-center text-sm font-medium max-w-16 md:max-w-sm">
                Confirm Details
              </span>
            </div>
          </div>
        </div>

        <Card className="w-full border-0 shadow-card rounded-2xl overflow-hidden animate-slide-up">
          <CardHeader className="text-center pb-4 pt-8 px-8">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Step 1: Qualify
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Answer these questions to see if you qualify
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8">
            <div className="space-y-5 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-center">
                Were you in a car accident in the last 4 years?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  variant={
                    answers.recentAccident === true ? "default" : "outline"
                  }
                  className={`
                    text-sm px-6 py-2 md:text-base md:py-3.5 md:px-8
                    ${
                      answers.recentAccident === true
                        ? "bg-success-600 hover:bg-success-700 shadow-md"
                        : "shadow-sm"
                    }
                  `}
                  onClick={() => handleAnswer("recentAccident", true)}
                  size="lg"
                >
                  Yes
                </Button>
                <Button
                  variant={
                    answers.recentAccident === false ? "default" : "outline"
                  }
                  className={`text-sm px-6 py-2 md:text-base md:py-3.5 md:px-8 ${
                    answers.recentAccident === false
                      ? "bg-red-600 hover:bg-red-700 shadow-md"
                      : "shadow-sm"
                  }`}
                  onClick={() => handleAnswer("recentAccident", false)}
                  size="lg"
                >
                  No
                </Button>
              </div>
            </div>

            <div className="space-y-5 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-center">
                Was it the other person's fault?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  variant={answers.notAtFault === true ? "default" : "outline"}
                  className={`text-sm px-6 py-2 md:text-base md:py-3.5 md:px-8
                    ${
                      answers.notAtFault === true
                        ? "bg-success-600 hover:bg-success-700 shadow-md"
                        : "shadow-sm"
                    }
                  `}
                  onClick={() => handleAnswer("notAtFault", true)}
                  size="lg"
                >
                  Yes
                </Button>
                <Button
                  variant={answers.notAtFault === false ? "default" : "outline"}
                  className={`text-sm px-6 py-2 md:text-base md:py-3.5 md:px-8 ${
                    answers.notAtFault === false
                      ? "bg-red-600 hover:bg-red-700 shadow-md"
                      : "shadow-sm"
                  }`}
                  onClick={() => handleAnswer("notAtFault", false)}
                  size="lg"
                >
                  No
                </Button>
              </div>
            </div>

            <div className="space-y-5 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-center">
                Do you own the damaged vehicle (not lease)?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  variant={answers.ownVehicle === true ? "default" : "outline"}
                  className={` text-sm px-6 py-2 md:text-base md:py-3.5 md:px-8
                    ${
                      answers.ownVehicle === true
                        ? "bg-success-600 hover:bg-success-700 shadow-md"
                        : "shadow-sm"
                    }
                  `}
                  onClick={() => handleAnswer("ownVehicle", true)}
                  size="lg"
                >
                  Yes
                </Button>
                <Button
                  variant={answers.ownVehicle === false ? "default" : "outline"}
                  className={`text-sm px-6 py-2 md:text-base md:py-3.5 md:px-8  ${
                    answers.ownVehicle === false
                      ? "bg-red-600 hover:bg-red-700 shadow-md"
                      : "shadow-sm"
                  }`}
                  onClick={() => handleAnswer("ownVehicle", false)}
                  size="lg"
                >
                  No
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-8 pb-8">
            <Button
              className="w-full text-sm px-6 py-2 md:text-lg md:py-3.5 md:px-8"
              onClick={handleContinue}
              disabled={!allQuestionsAnswered}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
