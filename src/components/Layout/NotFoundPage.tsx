import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from "../shared";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
          Oups! Page indisponible
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été supprimée.
        </p>

        <div className="space-y-4">
          <Button
            fullWidth
            onClick={() => navigate('/')}
            className="md:w-auto md:mr-4"
          >
            Retour à l'accueil
          </Button>
          <Button
            fullWidth
            variant="secondary"
            onClick={() => navigate(-1)}
            className="md:w-auto"
          >
            Retour précédent
          </Button>
        </div>

        <div className="mt-16">
          <div className="inline-block text-8xl animate-bounce">
            😕
          </div>
        </div>
      </div>
    </div>
  );
};
