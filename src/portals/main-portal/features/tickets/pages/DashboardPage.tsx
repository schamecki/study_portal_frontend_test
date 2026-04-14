// Import card images
import assuranceImg from '../../../../../assets/images/assurance.png';
import attestationLogementImg from '../../../../../assets/images/attestation_de_logement.png';
import attestationVirementImg from '../../../../../assets/images/attestation_de_virement_irrévoccable.png';
import demandeFinancementImg from '../../../../../assets/images/demande_de_financement.png';

// Import icons
import documentIcon from '../../../../../assets/images/Vector.png';
import homeIcon from '../../../../../assets/images/Vector1.png';
import thumbUpIcon from '../../../../../assets/images/thumb-up.png';
import documentIconAlt from '../../../../../assets/images/Vector2.png';
import {ServiceCard} from "../components/ServiceCard.tsx";
import {useAppStore} from "../../../../../store/app.store.ts";
import {useEffect} from "react";
import {getAppServices} from "../../../../../services/api/service.api.ts";

// Import ServiceCard component

// Service card configuration with proper structure
const serviceCards = [
  {
    title: 'Attestation de virement irrévocable',
    icon: documentIconAlt,
    backgroundImage: attestationVirementImg,
    path: '/avi',
  },
  {
    title: 'Attestation de logement',
    icon: homeIcon,
    backgroundImage: attestationLogementImg,
    path: '/services/logement',
  },
  {
    title: 'Assurance',
    icon: thumbUpIcon,
    backgroundImage: assuranceImg,
    path: '/services/assurance',
  },
  {
    title: 'Demande de financement',
    icon: documentIcon,
    backgroundImage: demandeFinancementImg,
    path: '/services/financement',
  },
];

export const DashboardPage = () => {
  //const services = useAppStore((state) => state.services);
  const setServices = useAppStore((state) => state.setServices);

  useEffect(() => {
    getAppServices()
      .then((r) => {
        setServices(r);
      })
      .catch(console.error)
  }, [setServices]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-boaz-blue mb-6">Les services Boaz</h2>

      {/* Service cards grid — matching Figma layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {serviceCards.map((card) => (
          <ServiceCard
            key={card.title}
            title={card.title}
            icon={card.icon}
            backgroundImage={card.backgroundImage}
            path={card.path}
          />
        ))}
      </div>
    </div>
  );
};
