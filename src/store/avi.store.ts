import { create } from 'zustand';
import { PAGES, getPageById, getNextPage, getFirstIncompleteStep, ALL_STEPS } from '../portals/main-portal/features/avi/avi.config';

export interface AviStore {
    // Current navigation state
    currentPageId: number;       // 1–4 (the page group)
    currentStepInPage: number;   // 0-based index within the page's steps array

    // Completion tracking
    completedSteps: number[];    // array of completed global step IDs (1–10)

    // Form data persistence (keyed by step ID)
    formData: Record<number, Record<string, unknown>>;

    // Actions
    setPage: (pageId: number, stepInPage?: number) => void;
    goToNextStep: () => 'next-step' | 'next-page' | 'finished';
    goToPrevStep: () => 'prev-step' | 'prev-page' | 'at-start';
    markStepCompleted: (stepId: number) => void;
    setFormData: (stepId: number, data: Record<string, unknown>) => void;
    getCurrentGlobalStepId: () => number;
    isAllCompleted: () => boolean;
    getFirstIncompletePageId: () => number;
    reset: () => void;
}

export const useAviStore = create<AviStore>((set, get) => ({
    currentPageId: 1,
    currentStepInPage: 0,
    completedSteps: [],
    formData: {},

    setPage: (pageId: number, stepInPage: number = 0) => set({
        currentPageId: pageId,
        currentStepInPage: stepInPage,
    }),

    getCurrentGlobalStepId: () => {
        const { currentPageId, currentStepInPage } = get();
        const page = getPageById(currentPageId);
        if (!page) return 1;
        return page.steps[currentStepInPage]?.id ?? 1;
    },

    goToNextStep: () => {
        const { currentPageId, currentStepInPage } = get();
        const page = getPageById(currentPageId);
        if (!page) return 'finished';

        // Mark current step as completed
        const currentStepId = page.steps[currentStepInPage]?.id;
        if (currentStepId) {
            get().markStepCompleted(currentStepId);
        }

        // If not last step in page → go to next step within same page
        if (currentStepInPage < page.steps.length - 1) {
            set({ currentStepInPage: currentStepInPage + 1 });
            return 'next-step';
        }

        // Last step in page → check if there's a next page
        const nextPage = getNextPage(currentPageId);
        if (nextPage) {
            set({ currentPageId: nextPage.id, currentStepInPage: 0 });
            return 'next-page';
        }

        // Last step of last page → finished
        return 'finished';
    },

    goToPrevStep: () => {
        const { currentPageId, currentStepInPage } = get();

        // If not first step in page → go to previous step within same page
        if (currentStepInPage > 0) {
            set({ currentStepInPage: currentStepInPage - 1 });
            return 'prev-step';
        }

        // First step in page → check if there's a previous page
        const pageIdx = PAGES.findIndex((p) => p.id === currentPageId);
        if (pageIdx > 0) {
            const prevPage = PAGES[pageIdx - 1];
            set({
                currentPageId: prevPage.id,
                currentStepInPage: prevPage.steps.length - 1,
            });
            return 'prev-page';
        }

        return 'at-start';
    },

    markStepCompleted: (stepId: number) => set((state) => ({
        completedSteps: state.completedSteps.includes(stepId)
            ? state.completedSteps
            : [...state.completedSteps, stepId],
    })),

    setFormData: (stepId: number, data: Record<string, unknown>) => set((state) => ({
        formData: { ...state.formData, [stepId]: { ...(state.formData[stepId] || {}), ...data } },
    })),

    isAllCompleted: () => {
        const { completedSteps } = get();
        return ALL_STEPS.every((s) => completedSteps.includes(s.id));
    },

    getFirstIncompletePageId: () => {
        const { completedSteps } = get();
        const firstIncomplete = getFirstIncompleteStep(completedSteps);
        // Find which page contains this step
        for (const page of PAGES) {
            if (page.steps.some((s) => s.id === firstIncomplete)) {
                return page.id;
            }
        }
        return 1;
    },

    reset: () => set({
        currentPageId: 1,
        currentStepInPage: 0,
        completedSteps: [],
        formData: {},
    }),
}));
