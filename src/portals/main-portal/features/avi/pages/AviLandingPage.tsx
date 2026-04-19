import { useNavigate } from 'react-router-dom';
import { useAviStore } from '../../../../../store/avi.store';
import { ALL_STEPS } from '../avi.config';
import { StepCard } from '../components/StepCard';
import { Button } from '../../../../../components/shared';

export const AviLandingPage = () => {
  const navigate = useNavigate();
  const { completedSteps, getFirstIncompletePageId, isAllCompleted } = useAviStore();

  const allDone = isAllCompleted();

  // Determine the first non-completed step to mark as "active"
  const activeStepId = ALL_STEPS.find((s) => !completedSteps.includes(s.id))?.id ?? null;

  const handleStart = () => {
    if (allDone) {
      // All steps done → could submit or finalize
      // For now, navigate to last page
      navigate('/ave/4');
      return;
    }

    const pageId = getFirstIncompletePageId();
    navigate(`/ave/${pageId}`);
  };

  return (
      <div className="max-w-2xl mx-auto w-full py-6 animate-page-in" id="avi-landing-page">
        {/* Steps list */}
        <div className="flex flex-col">
          {ALL_STEPS.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isActive = step.id === activeStepId;
            const isLast = index === ALL_STEPS.length - 1;

            return (
                <StepCard
                    key={step.id}
                    step={step}
                    index={index}
                    isCompleted={isCompleted}
                    isActive={isActive}
                    isLast={isLast}
                />
            );
          })}
        </div>

        {/* Action button */}
        <div className="mt-8 flex justify-end">
          <Button
              onClick={handleStart}
              variant="primary"
              size="md"
              className="px-10 py-2.5"
              id="avi-start-btn"
          >
            {allDone ? 'Terminer' : (activeStepId && activeStepId > 1 ? 'Continuer' : 'Commencer')}
          </Button>
        </div>
      </div>
  );
};
