import { Input, PhoneInput, FileInput, DateInput } from '../../../../../components/shared';

interface AviStep1Props {
  formData: Record<string, any>;
  errors: Record<string, string>;
  onUpdateField: (field: string, value: any) => void;
}

export const AviStep1 = ({ formData, errors, onUpdateField }: AviStep1Props) => {
  const getFieldValue = (field: string): string => (formData[field] as string) || '';

  return (
    <div className="step-form-content">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <Input
          placeholder="Nom"
          value={getFieldValue('lastName')}
          onChange={(e) => onUpdateField('lastName', e.target.value)}
          error={errors.lastName}
        />
        <Input
          placeholder="Numéro de passeport"
          value={getFieldValue('passportNumber')}
          onChange={(e) => onUpdateField('passportNumber', e.target.value)}
          error={errors.passportNumber}
        />
        <Input
          placeholder="Prénom"
          value={getFieldValue('firstName')}
          onChange={(e) => onUpdateField('firstName', e.target.value)}
          error={errors.firstName}
        />
        <DateInput
          label="Date de délivrance du passeport"
          value={getFieldValue('passportIssueDate')}
          onChange={(e) => onUpdateField('passportIssueDate', e.target.value)}
          error={errors.passportIssueDate}
        />
        <DateInput
          label="Date de naissance"
          value={getFieldValue('birthDate')}
          onChange={(e) => onUpdateField('birthDate', e.target.value)}
          error={errors.birthDate}
        />
        <DateInput
          label="Date d'expiration du passeport"
          value={getFieldValue('passportExpiryDate')}
          onChange={(e) => onUpdateField('passportExpiryDate', e.target.value)}
          error={errors.passportExpiryDate}
        />
        <Input
          placeholder="Email"
          type="email"
          value={getFieldValue('email')}
          onChange={(e) => onUpdateField('email', e.target.value)}
          error={errors.email}
        />
        <PhoneInput
          label="Numéro de téléphone"
          value={getFieldValue('phone')}
          onChange={(val) => onUpdateField('phone', val)}
          error={errors.phone}
        />
        <FileInput
          label="Scan du passeport"
          fileName={getFieldValue('passportScanName')}
          onChange={(file) => {
            onUpdateField('passportScan', file);
            onUpdateField('passportScanName', file?.name || '');
          }}
          accept=".pdf,.jpg,.jpeg,.png"
          error={errors.passportScan}
        />
      </div>
    </div>
  );
};
