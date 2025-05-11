
import { useEffect } from "react";
import { useSurvey } from "@/contexts/SurveyContext";
import SurveyProgress from "@/components/SurveyProgress";
import StartScreen from "@/components/survey/StartScreen";
import Step1 from "@/components/survey/Step1";
import Step2 from "@/components/survey/Step2";
import Step3 from "@/components/survey/Step3";
import Results from "@/components/survey/Results";
import RejectionPage from "@/components/survey/RejectionPage";
import Timer from "@/components/Timer";
import FacebookReviews from "@/components/FacebookReviews";
import { useIsMobile } from "@/hooks/use-mobile";

const SurveyContainer = () => {
  const { currentStep, totalSteps, goToNextStep } = useSurvey();
  const isMobile = useIsMobile();

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Skip Step5 (ticking step) and go directly from Step3 to Results
  useEffect(() => {
    if (currentStep === 4) {
      // Automatically progress to results after a short delay
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, goToNextStep]);

  // Determine which component to render based on currentStep
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <StartScreen />;
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 5:
        return <Results />;
      case 6:
        return <RejectionPage />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8">
      {/* Timer only visible during active survey steps (not on start screen) */}
      {currentStep > 0 && currentStep < totalSteps && <Timer minutes={3} />}
      
      {/* Progress bar only shown during active survey steps */}
      {currentStep > 0 && currentStep < totalSteps && (
        <SurveyProgress currentStep={currentStep} totalSteps={totalSteps - 1} />
      )}
      
      {/* Only render the current step */}
      {renderCurrentStep()}
      
      {/* Facebook Reviews - shown in all steps except start screen and rejection page */}
      {currentStep > 0 && currentStep !== 6 && <FacebookReviews />}
      
      {/* Add padding at the bottom for mobile fixed buttons */}
      {isMobile && <div className="h-24"></div>}
    </div>
  );
};

export default SurveyContainer;
