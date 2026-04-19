import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAviStore } from '../../../../../store/avi.store';
import { getPageById, PAGES } from '../avi.config';
import { Stepper, Button } from '../../../../../components/shared';
import { StepFormRenderer } from '../components/StepFormRenderer';

export const AviStepPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageId = parseInt(id || '1', 10);

  const {
    currentStepInPage,
    completedSteps,
    formData,
    setPage,
    goToNextStep,
    setFormData,
    getCurrentGlobalStepId,
  } = useAviStore();

  const page = getPageById(pageId);

  // Transition direction for animation
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'none'>('none');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync store page when route changes
  useEffect(() => {
    if (page) {
      // Find the first incomplete step index in this page
      const firstIncompleteIdx = page.steps.findIndex(
        (s) => !completedSteps.includes(s.id)
      );
      setPage(pageId, firstIncompleteIdx >= 0 ? firstIncompleteIdx : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setSlideDirection('left');

    // Small delay for exit animation
    setTimeout(() => {
      const result = goToNextStep();

      if (result === 'next-step') {
        // Stay on same page, animate in from right
        setSlideDirection('right');
        setTimeout(() => {
          setSlideDirection('none');
          setIsTransitioning(false);
        }, 50);
      } else if (result === 'next-page') {
        // Navigate to next page
        const nextPageId = pageId + 1;
        if (nextPageId <= PAGES.length) {
          navigate(`/ave/${nextPageId}`);
        } else {
          navigate('/avi');
        }
        setIsTransitioning(false);
      } else {
        // Finished — go back to landing
        navigate('/avi');
        setIsTransitioning(false);
      }
    }, 200);
  }, [goToNextStep, isTransitioning, navigate, pageId]);

  const handleCancel = useCallback(() => {
    navigate('/avi');
  }, [navigate]);

  const handleFormDataChange = useCallback(
    (data: Record<string, unknown>) => {
      const globalStepId = getCurrentGlobalStepId();
      setFormData(globalStepId, data);
    },
    [getCurrentGlobalStepId, setFormData]
  );

  if (!page) {
    navigate('/avi');
    return null;
  }

  const currentStep = page.steps[currentStepInPage];
  if (!currentStep) return null;

  const globalStepId = currentStep.id;
  const currentFormData = formData[globalStepId] || {};

  // Build horizontal stepper steps for this page
  const stepperSteps = page.steps.map((s) => ({
    label: s.title,
  }));

  // Determine slide animation class
  const getSlideClass = () => {
    if (slideDirection === 'left') return 'step-slide-exit';
    if (slideDirection === 'right') return 'step-slide-enter';
    return 'step-slide-active';
  };

  // Is last step of last page?
  const isLastPage = pageId === PAGES.length;
  const isLastStepInPage = currentStepInPage === page.steps.length - 1;
  const isVeryLast = isLastPage && isLastStepInPage;

  return (
    <div className="w-full animate-page-in" id="avi-step-page">
      {/* Horizontal stepper */}
      <div className="max-w-2xl mx-auto mb-10 mt-2">
        <Stepper
          steps={stepperSteps}
          currentStep={currentStepInPage}
          orientation="horizontal"
        />
      </div>

      {/* Form area with slide transitions */}
      <div className="overflow-hidden">
        <div
          className={`transition-all duration-300 ease-out ${getSlideClass()}`}
          key={globalStepId}
        >
          <div className="max-w-4xl mx-auto px-2">
            <StepFormRenderer
              stepId={globalStepId}
              formData={currentFormData}
              onFormDataChange={handleFormDataChange}
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4 mt-10 pb-4">
        <Button
          onClick={handleCancel}
          variant="secondary"
          size="md"
          className="px-8"
          id="avi-cancel-btn"
        >
          Annuler
        </Button>
        <Button
          onClick={handleNext}
          variant="danger"
          size="md"
          className="px-8"
          id="avi-next-btn"
          disabled={isTransitioning}
        >
          {isVeryLast ? 'Terminer' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
};
