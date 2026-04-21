import { useState, useEffect } from 'react';
import { Input, Button } from '../../../../../components/shared';
import { useAviStore } from '../../../../../store/avi.store';
import { AviStep1 } from './AviStep1';
import { AviStep2 } from './AviStep2';
import { AviStep3 } from './AviStep3';
import { AviStep4 } from './AviStep4';
import { AviStep5 } from './AviStep5';

interface StepFormRendererProps {
  stepId: number;
  formData: Record<string, unknown>;
  onFormDataChange: (data: Record<string, unknown>) => void;
  setCustomFooter?: (footer: React.ReactNode) => void;
  onNext?: () => void;
  onComplete?: () => void;
  errors?: Record<string, string>;
}

export const StepFormRenderer = ({
  stepId,
  formData,
  onFormDataChange,
  setCustomFooter,
  onNext,
  onComplete,
  errors = {}
}: StepFormRendererProps) => {
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { formData: allFormData } = useAviStore();

  const step1Data = allFormData[1] || {};

  const updateField = (field: string, value: unknown) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const getFieldValue = (field: string): string => {
    return (formData[field] as string) || '';
  };

  // Reset states when step changes
  useEffect(() => {
    if (setCustomFooter) setCustomFooter(null);
    //setShowSuccess(false); // Reset success state on step change
  }, [stepId, setCustomFooter]);

  // Handle custom footer for Step 3 (Contract)
  useEffect(() => {
    if (stepId === 3 && setCustomFooter && !showSuccess) {
      const isSigned = !!formData.signature;
      setCustomFooter(
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="md"
            className="px-8"
            onClick={() => window.history.back()}
          >
            Annuler
          </Button>
          <Button
            variant={isSigned ? "primary" : "secondary"}
            size="md"
            className="px-8 bg-boaz-blue-light hover:bg-boaz-blue text-white disabled:opacity-50"
            onClick={isSigned ? onNext : () => setIsSignatureModalOpen(true)}
          >
            {isSigned ? "Suivant" : "Cliquer pour signer"}
          </Button>
        </div>
      );
    } else if (stepId === 3 && setCustomFooter && showSuccess) {
        setCustomFooter(<div />);
    }
  }, [stepId, setCustomFooter, formData.signature, onNext, showSuccess]);

  // Default renderer for placeholders (Steps 6-10)
  const renderPlaceholder = () => {
    const placeholderFields: Record<number, { fields: { placeholder: string; key: string }[] }> = {
      6: { fields: [{ placeholder: 'Nom de la banque', key: 'bankName' }, { placeholder: 'Code SWIFT / BIC', key: 'swiftCode' }] },
      7: { fields: [{ placeholder: 'IBAN', key: 'iban' }, { placeholder: 'RIB', key: 'rib' }] },
      8: { fields: [{ placeholder: 'Numéro de proforma', key: 'proformaNumber' }, { placeholder: 'Montant total', key: 'totalAmount' }] },
      9: { fields: [{ placeholder: 'Montant mensuel', key: 'monthlyAllocation' }, { placeholder: 'Source de fonds', key: 'sourceOfFunds' }] },
      10: { fields: [{ placeholder: 'Preuve de paiement', key: 'paymentProof' }] },
    };

    const config = placeholderFields[stepId];
    if (!config) return <div className="py-20 text-center text-muted">Formulaire en cours de développement...</div>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {config.fields.map((field) => (
          <Input
            key={field.key}
            placeholder={field.placeholder}
            value={getFieldValue(field.key)}
            onChange={(e) => updateField(field.key, e.target.value)}
            error={errors[field.key]}
          />
        ))}
      </div>
    );
  };

  switch (stepId) {
    case 1: 
      return <AviStep1 formData={formData} errors={errors} onUpdateField={updateField} />;
    case 2: 
      return <AviStep2 formData={formData} errors={errors} onUpdateField={updateField} />;
    case 3: 
      return (
        <AviStep3 
          formData={formData} 
          step1Data={step1Data} 
          showSuccess={showSuccess} 
          isSignatureModalOpen={isSignatureModalOpen}
          onUpdateField={updateField}
          onSetIsSignatureModalOpen={setIsSignatureModalOpen}
          onSetShowSuccess={setShowSuccess}
          onComplete={onComplete}
        />
      );
    case 4: 
      return <AviStep4 formData={formData} errors={errors} onUpdateField={updateField} />;
    case 5: 
      return <AviStep5 formData={formData} errors={errors} onUpdateField={updateField} />;
    default: 
      return <div className="step-form-content">{renderPlaceholder()}</div>;
  }
};
