import { useNavigate } from 'react-router-dom';
import { useAviStore } from '../../../../../store/avi.store';
import { Button } from '../../../../../components/shared';

const stepsData = [
  { id: 1, title: 'Informations Personnelles', desc: 'Ici, veuillez remplir vos informations personnelles' },
  { id: 2, title: 'Détails de la Formation', desc: 'Saisissez les détails concernant votre formation' },
  { id: 3, title: 'Informations Financières et Autres', desc: 'Complétez vos informations financières' },
  { id: 4, title: 'Principe de paiement', desc: 'Prenez connaissance de nos principes de paiement' },
  { id: 5, title: 'Mode de paiement', desc: 'Choisissez votre mode de paiement' },
  { id: 6, title: 'Etablissement bancaire', desc: 'Renseignez votre établissement bancaire' },
  { id: 7, title: 'Coordonnées bancaires', desc: 'Saisissez vos coordonnées bancaires' },
  { id: 8, title: 'Proforma', desc: 'Consultez et validez votre proforma' },
  { id: 9, title: 'Mon contrat', desc: 'Signez votre contrat' },
  { id: 10, title: 'Dépôt de preuve', desc: 'Déposez vos documents justificatifs' }
];

export const AviLandingPage = () => {
  const navigate = useNavigate();
  const { currentStep, completedSteps } = useAviStore();

  const handleStart = () => {
    // Navigate to the correct form group chunk depending on currentStep
    navigate(`/avi/${currentStep}`);
  };

  const isAllCompleted = completedSteps.length === 10;

  return (
    <div className="max-w-3xl mx-auto w-full py-8 page-enter">
      <div className="flex flex-col gap-4">
        {stepsData.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          
          return (
            <div key={step.id} className="flex gap-4">
              {/* Le cercle gauche et la ligne */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${isCompleted ? 'bg-boaz-blue text-white' : ''}
                    ${isActive && !isCompleted ? 'bg-white border-2 border-boaz-blue text-boaz-blue' : ''}
                    ${!isActive && !isCompleted ? 'bg-white border-2 border-boaz-blue text-boaz-blue' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    String(step.id).padStart(2, '0')
                  )}
                </div>
                {step.id !== 10 && (
                  <div className="w-[2px] bg-boaz-blue/20 absolute top-8 bottom-[-16px]" />
                )}
              </div>

              {/* L'encart de contenu */}
              <div
                className={`flex-1 rounded-lg border flex flex-col overflow-hidden transition-all duration-300
                  ${isActive ? 'border-boaz-blue ring-1 ring-boaz-blue' : 'border-gray-300'}
                `}
              >
                <div className={`flex items-center justify-between p-3 cursor-pointer ${isActive ? 'border-b border-gray-200' : ''}`}>
                  <h3 className={`font-semibold ${isActive ? 'text-boaz-blue' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  <div className="bg-gray-200 w-6 h-6 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {isActive && (
                  <div className="p-4 bg-white text-sm text-gray-500">
                    {step.desc}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleStart} variant="primary" className="px-8">
          {isAllCompleted ? 'Terminer' : (currentStep > 1 ? 'Continuer' : 'Commencer')}
        </Button>
      </div>
    </div>
  );
};
