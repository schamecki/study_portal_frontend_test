import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import router from "./router";

const AppContent = () => {
  const { initialize, isLoading } = useAuth();


  useEffect(() => {
    initialize().then(r => console.log(r));
  }, [initialize]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen bg-bg-page">
          <p>Chargement...</p>
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
                <p>Chargement...</p>
            </div>
          }
      >
        <AppContent />
      </Suspense>
  );
};

export default App;