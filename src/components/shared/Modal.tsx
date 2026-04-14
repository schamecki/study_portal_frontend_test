import { useEffect, type ReactNode } from 'react';
import { Button } from './Button';

// ---- Modal types matching Figma pop-ups ----

type ModalVariant = 'confirm' | 'success' | 'error' | 'warning';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  variant?: ModalVariant;
  title?: string;
  message?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  children?: ReactNode;
}

const variantConfig: Record<ModalVariant, {
  icon: ReactNode;
  titleColor: string;
  defaultTitle: string;
}> = {
  confirm: {
    icon: (
      <div className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center mx-auto">
        <span className="text-white text-3xl font-bold">!</span>
      </div>
    ),
    titleColor: 'text-primary',
    defaultTitle: 'Confirmation',
  },
  success: {
    icon: (
      <div className="w-16 h-16 rounded-full border-4 border-success flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    ),
    titleColor: 'text-success',
    defaultTitle: 'SUCCESS!',
  },
  error: {
    icon: (
      <div className="w-16 h-16 rounded-full border-4 border-error flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-error" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="9" cy="10" r="1.5" />
          <circle cx="15" cy="10" r="1.5" />
          <path d="M8 16c0-2.2 1.8-4 4-4s4 1.8 4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    titleColor: 'text-error',
    defaultTitle: 'ERREUR!',
  },
  warning: {
    icon: (
      <div className="w-16 h-16 flex items-center justify-center mx-auto">
        <svg className="w-16 h-16 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86l-8.6 14.86A1.98 1.98 0 003.4 21h17.2a1.98 1.98 0 001.71-2.98L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
    ),
    titleColor: 'text-warning',
    defaultTitle: 'ATTENTION!',
  },
};

export const Modal = ({
  open,
  onClose,
  variant = 'confirm',
  title,
  message,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const config = variantConfig[variant];
  const showCancel = variant === 'confirm' || variant === 'warning';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-modal p-8 w-full max-w-md mx-4 text-center animate-[fadeIn_200ms_ease-out]">
        {children ? (
          children
        ) : (
          <>
            <div className="mb-4">{config.icon}</div>

            <h3 className={`text-xl font-bold mb-2 ${config.titleColor}`}>
              {title || config.defaultTitle}
            </h3>

            {message && (
              <p className="text-primary font-medium mb-1">{message}</p>
            )}
            {description && (
              <p className="text-muted text-sm mb-6">{description}</p>
            )}

            <div className="flex gap-3 justify-center mt-6">
              {showCancel && (
                <Button variant="secondary" size="lg" onClick={onClose}>
                  {cancelLabel || 'Annuler'}
                </Button>
              )}
              <Button
                variant={variant === 'error' ? 'danger' : variant === 'warning' ? 'warning' : 'success'}
                size="lg"
                onClick={() => { onConfirm?.(); onClose(); }}
              >
                {confirmLabel || (variant === 'error' ? 'REESSAYER' : 'Confirmer')}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
