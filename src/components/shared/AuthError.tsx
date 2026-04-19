import { Button } from './Button';

interface AuthErrorProps {
  onRetry: () => void;
  errorDetails?: string;
}

export const AuthError = ({ onRetry, errorDetails }: AuthErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bg-page px-4">
      <div className="bg-bg-card shadow-card rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Erreur d'authentification
        </h1>
        
        <p className="text-text-secondary mb-6">
          Nous n'avons pas pu nous connecter au service d'authentification. Veuillez vérifier votre connexion ou réessayer plus tard.
        </p>
        
        {errorDetails && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-3 mb-6 text-sm text-error text-left overflow-hidden">
            <span className="font-semibold block mb-1">Détails :</span>
            <code className="truncate block">{errorDetails}</code>
          </div>
        )}

        <Button onClick={onRetry} className="w-full flex justify-center items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Réessayer
        </Button>
      </div>
    </div>
  );
};
