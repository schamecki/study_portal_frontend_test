import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../components/shared/Button';
import illustration404 from '../../../../../assets/images/404-illustration.png';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* 404 illustration from Figma */}
      <img
        src={illustration404}
        alt="Page introuvable"
        className="w-72 md:w-96 mb-8"
      />

      <h2 className="text-2xl font-bold text-boaz-blue-dark uppercase tracking-wide mb-2">
        Oups! Page indisponible
      </h2>

      <p className="text-muted text-sm mb-8 max-w-md">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>

      <Button
        variant="primary"
        size="lg"
        onClick={() => navigate('/')}
      >
        Retour à l'accueil
      </Button>
    </div>
  );
};
