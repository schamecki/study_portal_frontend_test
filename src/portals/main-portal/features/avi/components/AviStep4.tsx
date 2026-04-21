import AccordionItem from "./AccordionItem.tsx";

interface AviStep4Props {
  formData: Record<string, unknown>;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: unknown) => void;
}

export const AviStep4 = ({ formData, errors, onUpdateField }: AviStep4Props) => {
  const getFieldValue = (field: string): string => (formData[field] as string) || '';

  return (
    <div className="step-form-content max-w-2xl mx-auto py-10 animate-page-in">
      <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Sélectionnez votre principe de paiement</h2>
      <div className="flex flex-col">
        <AccordionItem 
          title="Paiement total"
          description="Choisissez cette option si vous souhaitez payer la totalité des frais."
          isActive={getFieldValue('paymentPrinciple') === 'total'}
          onClick={() => onUpdateField('paymentPrinciple', 'total')}
        />
        <AccordionItem 
          title="Paiement par financement"
          description="Choisissez cette option si vous avez souscrits à un financement"
          isActive={getFieldValue('paymentPrinciple') === 'financing'}
          onClick={() => onUpdateField('paymentPrinciple', 'financing')}
        />
      </div>
      {errors.paymentPrinciple && <p className="text-error text-center mt-4">{errors.paymentPrinciple}</p>}
    </div>
  );
};
