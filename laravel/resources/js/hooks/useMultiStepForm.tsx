import { usePage } from '@inertiajs/react';
import { ReactElement, useRef, useState } from 'react';

export function useMultiStepFrom(steps: ReactElement[], otpVerified: boolean) {
    // starts from one.
    const { current_step } = usePage().props;
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(current_step);
    console.log('Current Index', currentStepIndex);
    console.log('Step length', steps.length);
    // this ref will help use slide the window to the top when we click next everytime.
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollIntoView = () => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    function next() {
        // remove this to let the form work without verification
        if (currentStepIndex === 1 && !otpVerified) {
            return;
        }
        // scrollIntoView()
        setCurrentStepIndex((prev: number) => {
            if (prev === steps.length) return prev;
            return prev + 1;
        });
    }
    function back() {
        // scrollIntoView()
        setCurrentStepIndex((prev: number) => {
            if (prev <= 0) return prev;
            return prev - 1;
        });
    }

    function goTo(index: number) {
        // remove this to let the form work without verification
        if (currentStepIndex === 1 && !otpVerified) {
            return;
        }
        setCurrentStepIndex(index);
    }

    return {
        next,
        back,
        goTo,
        // -1 because array starts from index 0, so if the current step is 1 then it means we should display the 1st element of the array i.e. 0
        step: steps[currentStepIndex - 1],
        currStep: currentStepIndex,
        steps,
        isFirstStep: currentStepIndex === 1,
        isLastStep: currentStepIndex === steps.length,
        containerRef,
    };
}
