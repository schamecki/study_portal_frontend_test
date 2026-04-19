import {ServiceCard} from "../components/ServiceCard.tsx";
import {useAppStore} from "../../../../../store/app.store.ts";
import {useEffect} from "react";
import {getAppServices} from "../../../../../services/api/service.api.ts";

export const DashboardPage = () => {
  const services = useAppStore((state) => state.services);
  const setServices = useAppStore((state) => state.setServices);
  const setLoading = useAppStore((state) => state.setLoading);

  useEffect(() => {
      if (services.length === 0) {
          setLoading(true);
          getAppServices()
              .then((r) => {setServices(r)})
              .catch(console.error)
      }
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold text-boaz-blue mb-6">Les services Boaz</h2>

      {/* Service cards grid — matching Figma layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}
      </div>
    </div>
  );
};
