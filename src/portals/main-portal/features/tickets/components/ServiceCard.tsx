import { Link } from "react-router-dom";
import type {Service} from "../../../../../contracts/api-contracts.ts";
import serviceCodes from "../../../../../config/serviceCodes.ts";

export const ServiceCard = ({service}: {service: Service}) => {
    return (
        <Link
            to={serviceCodes.find(s => s.code === service.code)?.path || '/'}
            className="group relative overflow-hidden rounded-3xl aspect-auto w-full max-w-xs flex flex-col transition-all duration-300 hover:shadow-xl"
        >
            {/* Background image with overlay */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

            {/* Content: Icon and Title */}
            <div className="relative z-10 flex-1 flex flex-col justify-between p-6 md:p-8">
                {/* Icon */}
                <div className="flex justify-center pt-12">
                    <img
                        src={service.icon}
                        alt="Service icon"
                        className="w-6 h-6 md:w-8 md:h-8 drop-shadow-lg"
                    />
                </div>

                {/* Title */}
                <div className="text-center">
                    <h3 className="text-white text-xl md:text-2xl leading-tight drop-shadow-lg">
                        {service.title}
                    </h3>
                </div>
            </div>

            {/* Subscribe button */}
            <div className="relative z-20 w-full bg-boaz-orange hover:bg-orange-600 transition-colors duration-200 py-4 md:py-5 flex items-center justify-center cursor-pointer">
        <span className="text-white font-bold text-base md:text-lg">
          Souscrire
        </span>
            </div>
        </Link>
    );
};
