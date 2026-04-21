import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, Modal } from '../../../../../components/shared';

// Fix for ESM/CommonJS interop with react-signature-canvas
const SignaturePad = (SignatureCanvas as any).default || SignatureCanvas;

interface SignatureModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (signatureData: string) => void;
  contractContent: React.ReactNode;
}

const SignatureModal = ({ open, onClose, onSave, contractContent }: SignatureModalProps) => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handleConfirm = () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) return;
    
    // On utilise getCanvas() au lieu de getTrimmedCanvas() pour éviter le bug d'import interne de la librairie
    const canvas = sigCanvas.current.getCanvas();
    const signatureData = canvas.toDataURL('image/png');
    
    onSave(signatureData);
  };

  return (
    <Modal open={open} onClose={onClose} variant="none" maxWidth="max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
        
        {/* Colonne Gauche: Visualisation du Contrat (60%) */}
        <div className="flex-[0.6] bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 overflow-y-auto max-h-[70vh] shadow-inner relative">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-boaz-blue-light to-blue-400"></div>
           {contractContent}
        </div>

        {/* Colonne Droite: Signature & Avertissement (40%) */}
        <div className="flex-[0.4] flex flex-col gap-6">
          
          {/* En-tête d'avertissement - Repris de Figma second.png */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
             <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center mb-4 shadow-xl shadow-yellow-100 animate-bounce-slow">
                <span className="text-white text-5xl font-bold">!</span>
             </div>
             <p className="text-gray-800 font-bold text-center leading-snug text-lg">
                En acceptant et en signant, vous approuvez toutes les proformats et contrats qui vous ont été présentés, et autres indications
             </p>
          </div>

          {/* Zone de Signature - Design Sombre de Figma */}
          <div className="flex-1 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col p-1 border-4 border-gray-800">
            <div className="py-4 text-center text-gray-300 font-semibold text-lg uppercase tracking-wider">
              Votre Signature
            </div>
            <div className="flex-1 bg-white mx-3 mb-3 rounded-2xl relative border-2 border-dashed border-gray-200">
              <SignaturePad 
                ref={sigCanvas}
                penColor='black'
                canvasProps={{className: 'w-full h-full cursor-crosshair rounded-2xl'}}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                 <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                 </svg>
              </div>
            </div>
          </div>

          {/* Actions de la modale */}
          <div className="flex items-center gap-4 mt-2">
            <Button 
              variant="secondary" 
              size="lg" 
              className="flex-1 bg-gray-100 text-gray-500 hover:bg-gray-200 border-none h-14 rounded-xl font-bold"
              onClick={onClose}
            >
              Annuler
            </Button>
            
            <button 
              onClick={clearSignature}
              className="w-14 h-14 rounded-xl bg-orange-400 flex items-center justify-center text-white hover:bg-orange-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-100"
              title="Effacer la signature"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

            <Button 
              variant="primary" 
              size="lg" 
              className="flex-[1.5] bg-boaz-blue-light hover:bg-boaz-blue border-none h-14 rounded-xl font-bold shadow-xl shadow-blue-100"
              onClick={handleConfirm}
            >
              Confirmer
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SignatureModal