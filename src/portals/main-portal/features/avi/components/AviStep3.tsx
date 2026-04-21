import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../components/shared';
import ContractContent from "./ContractContent.tsx";
import SignatureModal from "./SignatureModal.tsx";
import { postAviFirstStep } from "../../../../../services/api/avi.api.ts";
import { useAppStore } from '../../../../../store/app.store';

interface AviStep3Props {
  formData: Record<string, unknown>;
  step1Data: Record<string, unknown>;
  showSuccess: boolean;
  isSignatureModalOpen: boolean;
  onUpdateField: (field: string, value: unknown) => void;
  onSetIsSignatureModalOpen: (open: boolean) => void;
  onSetShowSuccess: (show: boolean) => void;
  onComplete?: () => void;
}

export const AviStep3 = ({
  formData,
  step1Data,
  showSuccess,
  isSignatureModalOpen,
  onUpdateField,
  onSetIsSignatureModalOpen,
  onSetShowSuccess,
  onComplete
}: AviStep3Props) => {
  const navigate = useNavigate();
  const setLoading = useAppStore(state => state.setLoading);

  const handleContractSigne = async (data: string) => {
    onUpdateField('signature', data);
    setLoading(true);
    onSetIsSignatureModalOpen(false);
    try {
      const apiData = new FormData();
      Object.entries(step1Data).forEach(([key, value]) => {
        if (value instanceof File) apiData.append(key, value);
        else apiData.append(key, String(value));
      });
      apiData.append('signature', data);
      await postAviFirstStep(apiData);
    } catch (error) {
      console.error('Error submitting AVI step 1:', error);
    }
    if (onComplete) onComplete();
    onSetShowSuccess(true);
    setLoading(false);
  };

  if (showSuccess) {
    return (
      <div className="step-form-content flex flex-col items-center justify-center py-20 animate-page-in">
        <div className="w-32 h-32 bg-[#10B981] rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-100">
          <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Demande envoyée<br />avec succès</h2>
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
        <ContractContent formData={step1Data} />

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
        onClose={() => onSetIsSignatureModalOpen(false)}
        onSave={handleContractSigne}
        contractContent={<ContractContent formData={step1Data} />}
      />
    </div>
  );
};
