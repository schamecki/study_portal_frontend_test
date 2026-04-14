import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import router from "./router";
import {Loader} from "./components/shared";

const AppContent = () => {
  const { initialize, isLoading } = useAuth();


  useEffect(() => {
    initialize().then(r => console.log(r));
  }, [initialize]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen bg-bg-page">
            <Loader size="lg" text="Initialisation..." />
        </div>
    );
  }

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
      <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen bg-bg-page">
                <Loader size="lg" text="Chargement..." />
            </div>
          }
      >
        <AppContent />
      </Suspense>
  );
};

export default App;