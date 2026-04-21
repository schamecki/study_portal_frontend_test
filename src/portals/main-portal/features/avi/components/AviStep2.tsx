import { Input, FileInput, DateInput } from '../../../../../components/shared';

interface AviStep2Props {
  formData: Record<string, any>;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
}

export const AviStep2 = ({ formData, errors, onUpdateField }: AviStep2Props) => {
  const getFieldValue = (field: string): string => (formData[field] as string) || '';

  return (
    <div className="step-form-content max-w-xl mx-auto py-4">
      <div className="flex flex-col gap-y-6">
        <Input
          placeholder="Nom de l'établissement d'accueil"
          value={getFieldValue('hostInstitution')}
          onChange={(e) => onUpdateField('hostInstitution', e.target.value)}
          error={errors.hostInstitution}
        />
        <Input
          placeholder="Titre de la formation"
          value={getFieldValue('trainingTitle')}
          onChange={(e) => onUpdateField('trainingTitle', e.target.value)}
          error={errors.trainingTitle}
        />
        <Input
          placeholder="Ville"
          value={getFieldValue('city')}
          onChange={(e) => onUpdateField('city', e.target.value)}
          error={errors.city}
        />
        <DateInput
          label="Date de début de la formation"
          value={getFieldValue('trainingStartDate')}
          onChange={(e) => onUpdateField('trainingStartDate', e.target.value)}
          error={errors.trainingStartDate}
        />
        <FileInput
          label="Attestation d'inscription / Lettre d'admission"
          fileName={getFieldValue('admissionLetterName')}
          placeholder="Aucun fichier sélectionné"
          onChange={(file) => {
            onUpdateField('admissionLetter', file);
            onUpdateField('admissionLetterName', file?.name || '');
          }}
          accept=".pdf,.jpg,.jpeg,.png"
          error={errors.admissionLetter}
        />
      </div>
    </div>
  );
};
