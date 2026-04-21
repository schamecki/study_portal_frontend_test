import AccordionItem from "./AccordionItem.tsx";

interface AviStep5Props {
  formData: Record<string, any>;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
}

export const AviStep5 = ({ formData, errors, onUpdateField }: AviStep5Props) => {
  const getFieldValue = (field: string): string => (formData[field] as string) || '';

  return (
    <div className="step-form-content max-w-2xl mx-auto py-10 animate-page-in">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Sélectionnez votre mode de paiement</h2>
      <div className="flex flex-col">
        <AccordionItem 
          title="Dépôt Bancaire"
          description="Effectuez un dépôt sur le compte Boaz Study, puis téléchargez la preuve de paiement directement dans l'application."
          isActive={getFieldValue('paymentMethod') === 'bank_deposit'}
          onClick={() => onUpdateField('paymentMethod', 'bank_deposit')}
        />
        <AccordionItem 
          title="Virement Bancaire Direct"
          description="Effectuez un virement bancaire directement sur le compte Boaz Study, puis téléchargez la preuve de paiement dans l'application."
          isActive={getFieldValue('paymentMethod') === 'bank_transfer'}
          onClick={() => onUpdateField('paymentMethod', 'bank_transfer')}
        />
        <AccordionItem 
          title="Mobile Money"
          description="Effectuez un paiement via Mobile Money sur le compte Boaz Study, puis téléchargez la preuve de paiement dans l'application."
          isActive={getFieldValue('paymentMethod') === 'mobile_money'}
          onClick={() => onUpdateField('paymentMethod', 'mobile_money')}
        />
      </div>
      {errors.paymentMethod && <p className="text-error text-center mt-4">{errors.paymentMethod}</p>}
    </div>
  );
};
