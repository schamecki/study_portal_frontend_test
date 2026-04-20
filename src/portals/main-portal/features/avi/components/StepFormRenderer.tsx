import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, PhoneInput, FileInput, DateInput, Button } from '../../../../../components/shared';
import { SignatureModal, ContractContent } from './SignatureModal';

interface StepFormRendererProps {
  stepId: number;
  formData: Record<string, unknown>;
  onFormDataChange: (data: Record<string, unknown>) => void;
  setCustomFooter?: (footer: React.ReactNode) => void;
  onNext?: () => void;
  onComplete?: () => void;
  errors?: Record<string, string>;
}

// Reusable Accordion Component for Steps 4 & 5
const AccordionItem = ({ 
  title, 
  description, 
  isActive, 
  onClick 
}: { 
  title: string; 
  description: string; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <div 
    className={`
      mb-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
      ${isActive 
        ? 'border-boaz-blue-light bg-white shadow-lg shadow-blue-50' 
        : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}
    `}
    onClick={onClick}
  >
    <div className="flex items-center justify-between p-5 md:p-6">
      <div className="flex items-center gap-4">
        {isActive && <div className="w-1 h-6 bg-boaz-blue-light rounded-full" />}
        <span className={`text-lg font-semibold ${isActive ? 'text-boaz-blue-light' : 'text-gray-700'}`}>
          {title}
        </span>
      </div>
      <svg 
        className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-boaz-blue-light' : ''}`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    
    <div 
      className={`
        transition-all duration-300 ease-in-out
        ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      <div className="px-6 pb-6 text-blue-500 italic text-sm leading-relaxed">
        {description}
      </div>
    </div>
  </div>
);

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
  const navigate = useNavigate();
  
  const updateField = (field: string, value: unknown) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const getFieldValue = (field: string): string => {
    return (formData[field] as string) || '';
  };

  // Reset states when step changes
  useEffect(() => {
    if (setCustomFooter) setCustomFooter(null);
    //setShowSuccess(false);
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
        // Hide footer on success screen
        setCustomFooter(<div />);
    }
  }, [stepId, setCustomFooter, formData.signature, onNext, showSuccess]);

  // --- Step Renderers ---

  const renderStep1 = () => (
    <div className="step-form-content">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <Input
          placeholder="Nom"
          value={getFieldValue('lastName')}
          onChange={(e) => updateField('lastName', e.target.value)}
          error={errors.lastName}
        />
        <Input
          placeholder="Numéro de passeport"
          value={getFieldValue('passportNumber')}
          onChange={(e) => updateField('passportNumber', e.target.value)}
          error={errors.passportNumber}
        />
        <Input
          placeholder="Prénom"
          value={getFieldValue('firstName')}
          onChange={(e) => updateField('firstName', e.target.value)}
          error={errors.firstName}
        />
        <DateInput
          label="Date de délivrance du passeport"
          value={getFieldValue('passportIssueDate')}
          onChange={(e) => updateField('passportIssueDate', e.target.value)}
          error={errors.passportIssueDate}
        />
        <Input
          placeholder="Email"
          type="email"
          value={getFieldValue('email')}
          onChange={(e) => updateField('email', e.target.value)}
          error={errors.email}
        />
        <DateInput
          label="Date d'expiration du passeport"
          value={getFieldValue('passportExpiryDate')}
          onChange={(e) => updateField('passportExpiryDate', e.target.value)}
          error={errors.passportExpiryDate}
        />
        <PhoneInput
          label="Numéro de téléphone"
          value={getFieldValue('phone')}
          onChange={(val) => updateField('phone', val)}
          error={errors.phone}
        />
        <FileInput
          label="Scan du passeport"
          fileName={getFieldValue('passportScanName')}
          onChange={(file) => {
            updateField('passportScan', file);
            updateField('passportScanName', file?.name || '');
          }}
          accept=".pdf,.jpg,.jpeg,.png"
          error={errors.passportScan}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="step-form-content max-w-xl mx-auto py-4">
      <div className="flex flex-col gap-y-6">
        <Input
          placeholder="Nom de l'établissement d'accueil"
          value={getFieldValue('hostInstitution')}
          onChange={(e) => updateField('hostInstitution', e.target.value)}
          error={errors.hostInstitution}
        />
        <Input
          placeholder="Titre de la formation"
          value={getFieldValue('trainingTitle')}
          onChange={(e) => updateField('trainingTitle', e.target.value)}
          error={errors.trainingTitle}
        />
        <Input
          placeholder="Ville"
          value={getFieldValue('city')}
          onChange={(e) => updateField('city', e.target.value)}
          error={errors.city}
        />
        <DateInput
          label="Date de début de la formation"
          value={getFieldValue('trainingStartDate')}
          onChange={(e) => updateField('trainingStartDate', e.target.value)}
          error={errors.trainingStartDate}
        />
        <FileInput
          label="Attestation d'inscription / Lettre d'admission"
          fileName={getFieldValue('admissionLetterName')}
          placeholder="Aucun fichier sélectionné"
          onChange={(file) => {
            updateField('admissionLetter', file);
            updateField('admissionLetterName', file?.name || '');
          }}
          accept=".pdf,.jpg,.jpeg,.png"
          error={errors.admissionLetter}
        />
      </div>
    </div>
  );

  const renderStep3 = () => {
      console.log(showSuccess, 'as show succèss')
    if (showSuccess) {
      return (
        <div className="step-form-content flex flex-col items-center justify-center py-20 animate-page-in">
          <div className="w-32 h-32 bg-[#10B981] rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-100">
             <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
             </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Demande envoyée<br/>avec succès</h2>
          <div className="mt-12">
            <Button 
                variant="primary" 
                size="lg" 
                className="bg-boaz-blue-light hover:bg-boaz-blue px-10 rounded-xl"
                onClick={() => navigate('/avi')}
            >
                Aller à mes demandes
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="step-form-content max-w-2xl mx-auto py-4 animate-page-in">
        <h2 className="text-2xl font-semibold text-center mb-8">Mon contrat</h2>
        
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 shadow-sm overflow-y-auto max-h-[600px]">
          <ContractContent />
          
          {formData.signature && (
            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
              <div className="text-right">
                <p className="text-[8px] text-gray-400 mb-1">Signé numériquement le {new Date().toLocaleDateString()}</p>
                <img src={formData.signature as string} alt="Signature" className="h-12 object-contain" />
              </div>
            </div>
          )}
        </div>

        <SignatureModal 
          open={isSignatureModalOpen}
          onClose={() => setIsSignatureModalOpen(false)}
          onSave={(data) => {
            updateField('signature', data);
            setIsSignatureModalOpen(false);
            if (onComplete) onComplete();
            setShowSuccess(true);
          }}
          contractContent={<ContractContent />}
        />
      </div>
    );
  };

    const renderStep4 = () => (
        <div className="step-form-content max-w-2xl mx-auto py-10 animate-page-in">
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Sélectionnez votre principe de
                paiement</h2>
            <div className="flex flex-col">
                <AccordionItem
                    title="Paiement total"
                    description="Choisissez cette option si vous souhaitez payer la totalité des frais."
                    isActive={getFieldValue('paymentPrinciple') === 'total'}
                    onClick={() => updateField('paymentPrinciple', 'total')}
                />
                <AccordionItem
                    title="Paiement par financement"
                    description="Choisissez cette option si vous avez souscrits à un financement"
                    isActive={getFieldValue('paymentPrinciple') === 'financing'}
                    onClick={() => updateField('paymentPrinciple', 'financing')}
                />
            </div>
            {errors.paymentPrinciple && <p className="text-error text-center mt-4">{errors.paymentPrinciple}</p>}
        </div>
    );

    const renderStep5 = () => (
        <div className="step-form-content max-w-2xl mx-auto py-10 animate-page-in">
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Sélectionnez votre mode de paiement</h2>
            <div className="flex flex-col">
                <AccordionItem
                    title="Dépôt Bancaire"
          description="Effectuez un dépôt sur le compte Boaz Study, puis téléchargez la preuve de paiement directement dans l'application."
          isActive={getFieldValue('paymentMethod') === 'bank_deposit'}
          onClick={() => updateField('paymentMethod', 'bank_deposit')}
        />
        <AccordionItem 
          title="Virement Bancaire Direct"
          description="Effectuez un virement bancaire directement sur le compte Boaz Study, puis téléchargez la preuve de paiement dans l'application."
          isActive={getFieldValue('paymentMethod') === 'bank_transfer'}
          onClick={() => updateField('paymentMethod', 'bank_transfer')}
        />
        <AccordionItem 
          title="Mobile Money"
          description="Effectuez un paiement via Mobile Money sur le compte Boaz Study, puis téléchargez la preuve de paiement dans l'application."
          isActive={getFieldValue('paymentMethod') === 'mobile_money'}
          onClick={() => updateField('paymentMethod', 'mobile_money')}
        />
      </div>
      {errors.paymentMethod && <p className="text-error text-center mt-4">{errors.paymentMethod}</p>}
    </div>
  );

  const renderStep9 = () => {
    return (
      <div className="step-form-content max-w-xl mx-auto py-4">
          <div className="flex flex-col gap-y-6">
              <Input
                  placeholder="Montant mensuel souhaité (en EUR)"
                  type="number"
                  value={getFieldValue('monthlyAllocation')}
                  onChange={(e) => updateField('monthlyAllocation', e.target.value)}
                  error={errors.monthlyAllocation}
              />
              <Input
                  placeholder="Montant total annuel (en EUR)"
                  type="number"
                  value={getFieldValue('annualAmount')}
                  onChange={(e) => updateField('annualAmount', e.target.value)}
                  error={errors.annualAmount}
              />
              <Input
                  placeholder="Source de financement"
                  value={getFieldValue('sourceOfFunds')}
                  onChange={(e) => updateField('sourceOfFunds', e.target.value)}
                  error={errors.sourceOfFunds}
              />
          </div>
      </div>
    );
  };

  const renderStep10 = () => {
    if (showSuccess) {
      return (
        <div className="step-form-content flex flex-col items-center justify-center py-20 animate-page-in">
          <div className="w-32 h-32 bg-[#10B981] rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-100">
             <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
             </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Demande envoyée<br/>avec succès</h2>
          <div className="mt-12">
            <Button 
                variant="primary" 
                size="lg" 
                className="bg-boaz-blue-light hover:bg-boaz-blue px-10 rounded-xl"
                onClick={() => navigate('/avi')}
            >
                Aller à mes demandes
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="step-form-content max-w-xl mx-auto py-4">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Dépôt de preuve</h2>
        <div className="flex flex-col gap-y-6">
            <FileInput
              label="Preuve de paiement"
              fileName={getFieldValue('paymentProofName')}
              onChange={(file) => {
                updateField('paymentProof', file);
                updateField('paymentProofName', file?.name || '');
              }}
              accept=".pdf,.jpg,.jpeg,.png"
              error={errors.paymentProof}
            />
            <div className="mt-8 flex justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-boaz-blue-light hover:bg-boaz-blue px-10 rounded-xl"
                onClick={() => {
                  if (getFieldValue('paymentProofName')) {
                    if (onComplete) onComplete();
                    setShowSuccess(true);
                  }
                }}
              >
                Terminer et soumettre
              </Button>
            </div>
        </div>
      </div>
    );
  };

  // Default renderer for placeholders
  const renderPlaceholder = () => {
    const placeholderFields: Record<number, { fields: { placeholder: string; key: string }[] }> = {
      6: { fields: [{ placeholder: 'Nom de la banque', key: 'bankName' }, { placeholder: 'Code SWIFT / BIC', key: 'swiftCode' }] },
      7: { fields: [{ placeholder: 'IBAN', key: 'iban' }, { placeholder: 'RIB', key: 'rib' }] },
      8: { fields: [{ placeholder: 'Numéro de proforma', key: 'proformaNumber' }, { placeholder: 'Montant total', key: 'totalAmount' }] },
    };

    const config = placeholderFields[stepId];
    if (!config) return <p className="text-muted text-sm text-center py-10">Formulaire en cours de développement...</p>;

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
    case 1: return renderStep1();
    case 2: return renderStep2();
    case 3: return renderStep3();
    case 4: return renderStep4();
    case 5: return renderStep5();
    case 9: return renderStep9();
    case 10: return renderStep10();
    default: return <div className="step-form-content">{renderPlaceholder()}</div>;
  }
};
