import { Input, PhoneInput, FileInput, DateInput } from '../../../../../components/shared';

interface StepFormRendererProps {
  stepId: number;
  formData: Record<string, unknown>;
  onFormDataChange: (data: Record<string, unknown>) => void;
}

/**
 * Renders the appropriate form fields for each global step ID.
 * Step 1 is fully detailed; others have placeholder fields for now.
 */
export const StepFormRenderer = ({ stepId, formData, onFormDataChange }: StepFormRendererProps) => {
  const updateField = (field: string, value: unknown) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const getFieldValue = (field: string): string => {
    return (formData[field] as string) || '';
  };

  // Step 1: Informations Personnelles (fully detailed — matches image 3)
  if (stepId === 1) {
    return (
      <div className="step-form-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {/* Left column */}
          <Input
            placeholder="Nom"
            value={getFieldValue('firstName')}
            onChange={(e) => updateField('firstName', e.target.value)}
          />
          <Input
            placeholder="Numéro de passeport"
            value={getFieldValue('passportNumber')}
            onChange={(e) => updateField('passportNumber', e.target.value)}
          />
          <Input
            placeholder="Prénom"
            value={getFieldValue('lastName')}
            onChange={(e) => updateField('lastName', e.target.value)}
          />
          <DateInput
            label="Date de délivrance du passeport"
            value={getFieldValue('passportIssueDate')}
            onChange={(e) => updateField('passportIssueDate', e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={getFieldValue('email')}
            onChange={(e) => updateField('email', e.target.value)}
          />
          <DateInput
            label="Date d'expiration du passeport"
            value={getFieldValue('passportExpiryDate')}
            onChange={(e) => updateField('passportExpiryDate', e.target.value)}
          />
          <PhoneInput
            label="Numéro de téléphone"
            value={getFieldValue('phone')}
            onChange={(val) => updateField('phone', val)}
          />
          <FileInput
            label="Scan du passeport"
            fileName={getFieldValue('passportScanName')}
            onChange={(file) => {
              updateField('passportScan', file);
              updateField('passportScanName', file?.name || '');
            }}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
      </div>
    );
  }

  // Step 2: Détails de la Formation
  if (stepId === 2) {
    return (
      <div className="step-form-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          <Input
            placeholder="Nom de l'établissement"
            value={getFieldValue('schoolName')}
            onChange={(e) => updateField('schoolName', e.target.value)}
          />
          <Input
            placeholder="Pays de destination"
            value={getFieldValue('destinationCountry')}
            onChange={(e) => updateField('destinationCountry', e.target.value)}
          />
          <Input
            placeholder="Niveau d'études"
            value={getFieldValue('studyLevel')}
            onChange={(e) => updateField('studyLevel', e.target.value)}
          />
          <Input
            placeholder="Filière / Domaine"
            value={getFieldValue('fieldOfStudy')}
            onChange={(e) => updateField('fieldOfStudy', e.target.value)}
          />
          <DateInput
            label="Date de début de formation"
            value={getFieldValue('startDate')}
            onChange={(e) => updateField('startDate', e.target.value)}
          />
          <DateInput
            label="Date de fin de formation"
            value={getFieldValue('endDate')}
            onChange={(e) => updateField('endDate', e.target.value)}
          />
        </div>
      </div>
    );
  }

  // Step 3: Informations Financières et Autres Détails
  if (stepId === 3) {
    return (
      <div className="step-form-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          <Input
            placeholder="Montant des frais de scolarité"
            value={getFieldValue('tuitionFees')}
            onChange={(e) => updateField('tuitionFees', e.target.value)}
          />
          <Input
            placeholder="Source de financement"
            value={getFieldValue('fundingSource')}
            onChange={(e) => updateField('fundingSource', e.target.value)}
          />
          <Input
            placeholder="Montant du budget de vie"
            value={getFieldValue('livingBudget')}
            onChange={(e) => updateField('livingBudget', e.target.value)}
          />
          <Input
            placeholder="Devise"
            value={getFieldValue('currency')}
            onChange={(e) => updateField('currency', e.target.value)}
          />
        </div>
      </div>
    );
  }

  // Steps 4-10: Generic placeholder forms
  const placeholderFields: Record<number, { fields: { placeholder: string; key: string }[] }> = {
    4: {
      fields: [
        { placeholder: 'Type de paiement', key: 'paymentType' },
        { placeholder: 'Fréquence de paiement', key: 'paymentFrequency' },
      ],
    },
    5: {
      fields: [
        { placeholder: 'Mode de paiement préféré', key: 'paymentMode' },
        { placeholder: 'Numéro de compte', key: 'accountNumber' },
      ],
    },
    6: {
      fields: [
        { placeholder: 'Nom de la banque', key: 'bankName' },
        { placeholder: 'Code SWIFT / BIC', key: 'swiftCode' },
        { placeholder: 'Agence', key: 'branch' },
        { placeholder: 'Adresse de la banque', key: 'bankAddress' },
      ],
    },
    7: {
      fields: [
        { placeholder: 'IBAN', key: 'iban' },
        { placeholder: 'RIB', key: 'rib' },
        { placeholder: 'Titulaire du compte', key: 'accountHolder' },
      ],
    },
    8: {
      fields: [
        { placeholder: 'Numéro de proforma', key: 'proformaNumber' },
        { placeholder: 'Montant total', key: 'totalAmount' },
      ],
    },
    9: {
      fields: [
        { placeholder: 'Référence du contrat', key: 'contractRef' },
        { placeholder: 'Date de signature', key: 'signatureDate' },
      ],
    },
    10: {
      fields: [
        { placeholder: 'Type de document', key: 'docType' },
      ],
    },
  };

  const config = placeholderFields[stepId];

  if (!config) {
    return (
      <div className="step-form-content">
        <p className="text-muted text-sm">Formulaire en cours de développement...</p>
      </div>
    );
  }

  return (
    <div className="step-form-content">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {config.fields.map((field) => (
          <Input
            key={field.key}
            placeholder={field.placeholder}
            value={getFieldValue(field.key)}
            onChange={(e) => updateField(field.key, e.target.value)}
          />
        ))}
        {stepId === 10 && (
          <FileInput
            label="Document justificatif"
            fileName={getFieldValue('proofDocName')}
            onChange={(file) => {
              updateField('proofDoc', file);
              updateField('proofDocName', file?.name || '');
            }}
          />
        )}
      </div>
    </div>
  );
};
