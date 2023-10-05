import { useCallback, useEffect, useState } from "react";

export interface WizardStep {
    name: string;
}

// Custom hook
export const useWizard = (steps: WizardStep[]) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [nextDisabled, setNextDisabled] = useState(false);
    const hasNextStep = currentStep < steps.length - 1;
    const hasPreviousStep = currentStep > 0;
    return {
        currentStep,
        hasNextStep,
        setNextStep: useCallback(
            () => (hasNextStep ? setCurrentStep(currentStep => currentStep + 1) : undefined),
            [hasNextStep]
        ),
        hasPreviousStep,
        setPreviousStep: useCallback(
            () => (hasPreviousStep ? setCurrentStep(currentStep => currentStep - 1) : undefined),
            [hasPreviousStep]
        ),
        setStep: (stepIndex: number) => {
            if (stepIndex >= 0 && stepIndex <= steps.length - 1) {
                setCurrentStep(stepIndex);
            } else {
                throw new Error("Step out of range");
            }
        },
        nextDisabled,
        setNextDisabled,
    };
};