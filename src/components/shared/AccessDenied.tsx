import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface AccessDeniedProps {
  title?: string;
  message?: string;
}

export const AccessDenied = ({ 
  title = "Accès non autorisé", 
  message = "Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page ou fonctionnalité." 
}: AccessDeniedProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 animate-page-in">
      <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <svg className="w-12 h-12 text-boaz-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-boaz-blue-dark mb-3 text-center">
        {title}
      </h2>
      
      <p className="text-text-secondary text-center max-w-md mb-8 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="secondary" 
          onClick={() => window.history.back()}
          className="px-8"
        >
          Retourner
        </Button>
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
          className="px-8 bg-boaz-blue-light hover:bg-boaz-blue"
        >
          Aller à l'accueil
        </Button>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-100 w-full max-w-lg text-center">
        <p className="text-xs text-muted italic">
          Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur de votre agence.
        </p>
      </div>
    </div>
  );
};
