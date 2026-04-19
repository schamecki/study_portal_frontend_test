import { useRef, useState } from 'react';

interface FileInputProps {
  value?: File | null;
  fileName?: string;
  onChange?: (file: File | null) => void;
  accept?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const FileInput = ({
  value,
  fileName,
  onChange,
  accept = '.pdf,.jpg,.jpeg,.png',
  label,
  error,
  disabled = false,
  placeholder = 'Aucun fichier choisi',
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localFileName, setLocalFileName] = useState<string | null>(null);

  const displayName = fileName || localFileName || (value ? value.name : null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setLocalFileName(file.name);
    }
    onChange?.(file);
  };

  return (
    <div className="w-full" id="file-input">
      {label && (
        <label className="block text-sm font-medium text-secondary mb-1.5">{label}</label>
      )}
      <div
        className={`
          flex items-center border rounded-lg overflow-hidden transition-all duration-200
          ${error ? 'border-error' : 'border-light'}
          ${disabled ? 'opacity-60' : ''}
        `}
      >
        {/* "Choisir un fichier" button */}
        <button
          type="button"
          onClick={() => !disabled && inputRef.current?.click()}
          className={`
            shrink-0 px-4 py-2.5 text-sm font-medium
            bg-gray-100 text-primary border-r border-light
            hover:bg-gray-200 transition-colors duration-200
            cursor-pointer
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        >
          Choisir un fichier
        </button>

        {/* File name display */}
        <div className="flex-1 px-4 py-2.5 text-sm truncate">
          {displayName ? (
            <span className="text-primary">{displayName}</span>
          ) : (
            <span className="text-muted">{placeholder}</span>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};
