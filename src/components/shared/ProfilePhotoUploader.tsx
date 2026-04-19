import React, { useState, useRef, type ChangeEvent, type DragEvent } from 'react';

// Types
type ValidationError = {
  type: 'size' | 'type' | 'unknown';
  message: string;
};

type ProfilePhotoUploaderProps = {
  currentPhotoUrl?: string | null;
  username?: string;
  onPhotoUpload: (file: File) => Promise<string>; // Retourne l'URL de la nouvelle photo
  onError?: (error: ValidationError) => void;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  isUploading?: boolean;
  className?: string;
};

const DEFAULT_ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const DEFAULT_MAX_SIZE_MB = 5;

export const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  currentPhotoUrl,
  username = 'User',
  onPhotoUpload,
  onError,
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
  isUploading = false,
  className = '',
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const [localUploading, setLocalUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getInitials = (name: string): string => {
    return name.charAt(0).toUpperCase() || 'U';
  };

  const validateFile = (file: File): ValidationError | null => {
    // Vérification du type
    if (!acceptedFormats.includes(file.type)) {
      return {
        type: 'type',
        message: `Format non supporté. Utilisez: ${acceptedFormats.map(f => f.split('/')[1]).join(', ')}`,
      };
    }

    // Vérification de la taille
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        type: 'size',
        message: `L'image ne doit pas dépasser ${maxSizeMB} Mo`,
      };
    }

    return null;
  };

  const handleFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      onError?.(validationError);
      return;
    }

    // Preview locale
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setLocalUploading(true);

    try {
      // Upload vers le serveur
      const newPhotoUrl = await onPhotoUpload(file);
      setPreviewUrl(newPhotoUrl);
      
      // Cleanup de l'URL temporaire
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      onError?.({
        type: 'unknown',
        message: 'Erreur lors de l\'upload. Veuillez réessayer.',
      });
      // Restaure l'ancienne photo
      setPreviewUrl(currentPhotoUrl || null);
    } finally {
      setLocalUploading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset l'input pour permettre de re-uploader le même fichier
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    } else {
      onError?.({
        type: 'type',
        message: 'Veuillez déposer une image valide',
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const isLoading = isUploading || localUploading;

  return (
    <div className={`flex flex-col items-center mb-8 ${className}`}>
      {/* Zone de la photo avec drag & drop */}
      <div
        className={`
          relative w-24 h-24 rounded-full mb-3 cursor-pointer group
          transition-all duration-200
          ${isDragging ? 'ring-4 ring-blue-500 ring-offset-2 scale-105' : ''}
          ${isLoading ? 'opacity-50 cursor-wait' : 'hover:opacity-90'}
        `}
        onClick={!isLoading ? triggerFileInput : undefined}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Image ou fallback initials */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={username}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
            {getInitials(username)}
          </div>
        )}


        {/* Overlay au hover */}
        <div className="absolute inset-0 rounded-full bg-transparent bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
          {!isLoading && (
            <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              📷
            </span>
          )}
        </div>

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Bouton de modification */}
      <button
        onClick={triggerFileInput}
        disabled={isLoading}
        className="text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        type="button"
      >
        {isLoading ? 'Upload en cours...' : 'Modifier la Photo'}
      </button>

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(',')}
        onChange={handleFileChange}
        className="hidden"
        disabled={isLoading}
      />
    </div>
  );
};