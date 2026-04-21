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
    markStepCompleted,
  } = useAviStore();

  const page = getPageById(pageId);

  // States
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'none'>('none');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [customFooter, setCustomFooter] = useState<React.ReactNode>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Sync store page when route changes
  useEffect(() => {
    if (page) {
      const firstIncompleteIdx = page.steps.findIndex(
        (s) => !completedSteps.includes(s.id)
      );
      setPage(pageId, firstIncompleteIdx >= 0 ? firstIncompleteIdx : 0);
      setFieldErrors({}); // Reset errors on page change
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]); // Only sync when the page ID changes, not when steps are completed

  // Validation Logic
  const validateStep = (stepId: number, data: Record<string, unknown>): Record<string, string> => {
    const errors: Record<string, string> = {};
    const required = (field: string, msg = 'Ce champ est obligatoire') => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors[field] = msg;
      }
    };

    switch (stepId) {
      case 1:
        required('lastName');
        required('firstName');
        required('passportNumber');
        required('passportIssueDate');
        required('passportExpiryDate');
        required('email');
        required('phone');
        required('passportScanName', 'Veuillez télécharger un scan de votre passeport');
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) {
          errors.email = 'Veuillez entrer un email valide';
        }
        break;
      case 2:
        required('hostInstitution');
        required('trainingTitle');
        required('city');
        required('trainingStartDate');
        required('admissionLetterName', 'Veuillez télécharger votre lettre d\'admission');
        break;
      case 3:
        required('monthlyAllocation');
        required('annualAmount');
        required('sourceOfFunds');
        break;
      case 4:
        required('paymentPrinciple', 'Veuillez sélectionner un principe de paiement');
        break;
      case 5:
        required('paymentMethod', 'Veuillez sélectionner un mode de paiement');
        break;
      case 10:
        required('paymentProofName', 'Veuillez télécharger votre preuve de paiement');
        break;
    }

    return errors;
  };

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    // Validate current step
    const currentGlobalStepId = getCurrentGlobalStepId();
    const currentFormData = formData[currentGlobalStepId] || {};
    const errors = validateStep(currentGlobalStepId, currentFormData);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsTransitioning(true);
    setSlideDirection('left');
    setFieldErrors({}); // Clear errors on success

    setTimeout(() => {
      const result = goToNextStep();

      if (result === 'next-step') {
        setSlideDirection('right');
        setTimeout(() => {
          setSlideDirection('none');
          setIsTransitioning(false);
        }, 50);
      } else if (result === 'next-page') {
        const nextPageId = pageId + 1;
        if (nextPageId <= PAGES.length) {
          navigate(`/avi/${nextPageId}`);
        } else {
          navigate('/avi');
        }
        setIsTransitioning(false);
      } else {
        navigate('/avi');
        setIsTransitioning(false);
      }
    }, 200);
  }, [goToNextStep, isTransitioning, navigate, pageId, getCurrentGlobalStepId, formData]);

  const handleCancel = useCallback(() => {
    navigate('/avi');
  }, [navigate]);

  const handleFormDataChange = useCallback(
    (data: Record<string, unknown>) => {
      const globalStepId = getCurrentGlobalStepId();
      setFormData(globalStepId, data);
      
      if (Object.keys(fieldErrors).length > 0) {
        setFieldErrors({});
      }
    },
    [getCurrentGlobalStepId, setFormData, fieldErrors]
  );

  if (!page) {
    navigate('/avi');
    return null;
  }

  const currentStep = page.steps[currentStepInPage];
  if (!currentStep) return null;

  const globalStepId = currentStep.id;
  const currentFormData = formData[globalStepId] || {};
  const stepperSteps = page.steps.map((s) => ({ label: s.title }));

  const isLastPage = pageId === PAGES.length;
  const isLastStepInPage = currentStepInPage === page.steps.length - 1;
  const isVeryLast = isLastPage && isLastStepInPage;

  return (
    <div className="w-full animate-page-in" id="avi-step-page">
      <div className="max-w-2xl mx-auto mb-10 mt-2">
        <Stepper
          steps={stepperSteps}
          currentStep={currentStepInPage}
          orientation="horizontal"
          startAt={page.steps[0].id}
          completedSteps={completedSteps}
        />
      </div>

      <div className="overflow-hidden">
        <div
          className={`transition-all duration-300 ease-out ${
            slideDirection === 'left' ? 'step-slide-exit' : 
            slideDirection === 'right' ? 'step-slide-enter' : 'step-slide-active'
          }`}
          key={globalStepId}
        >
          <div className="max-w-4xl mx-auto px-2">
            <StepFormRenderer
              stepId={globalStepId}
              formData={currentFormData}
              onFormDataChange={handleFormDataChange}
              setCustomFooter={setCustomFooter}
              onNext={handleNext}
              errors={fieldErrors}
              onComplete={() => markStepCompleted(globalStepId)}
            />
          </div>
        </div>
      </div>

      {!customFooter ? (
        <div className="flex items-center justify-center gap-4 mt-10 pb-4">
          <Button onClick={handleCancel} variant="secondary" size="md" className="px-8">
            Annuler
          </Button>
          <Button
            onClick={handleNext}
            variant="danger"
            size="md"
            className="px-8"
            disabled={isTransitioning}
          >
            {isVeryLast ? 'Terminer' : 'Suivant'}
          </Button>
        </div>
      ) : (
        <div className="mt-10 pb-4">{customFooter}</div>
      )}
    </div>
  );
};
