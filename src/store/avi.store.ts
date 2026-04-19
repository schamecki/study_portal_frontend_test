import { create } from 'zustand';

export interface AviStore {
    currentStep: number; // 1 to 10
    completedSteps: number[]; // array of completed steps
    setCurrentStep: (step: number) => void;
    markStepCompleted: (step: number) => void;
    reset: () => void;
}

export const useAviStore = create<AviStore>((set) => ({
    currentStep: 1,
    completedSteps: [],

    setCurrentStep: (step: number) => set({ currentStep: step }),

    markStepCompleted: (step: number) => set((state) => ({
        completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step]
    })),

    reset: () => set({ currentStep: 1, completedSteps: [] })
}));
