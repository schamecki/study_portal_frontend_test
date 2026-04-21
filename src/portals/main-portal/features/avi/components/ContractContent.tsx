import logoBoaz from "../../../../../assets/images/logo-boaz.png";

interface ContractContentProps {
    formData?: Record<string, any>;
}

const ContractContent = ({ formData }: ContractContentProps) => {
    const firstName = formData?.firstName || '...';
    const lastName = formData?.lastName || '...';
    const email = formData?.email || '...';
    const phone = formData?.phone || '...';
    const birthDate = formData?.birthDate || '...';

    return (
        <div className="font-sans leading-relaxed text-gray-800 text-[11px] md:text-[12px]">
            <div className="flex justify-center mb-8">
                <img src={logoBoaz} alt="BOAZ-STUDY" className="h-10" />
            </div>

            <h3 className="text-center font-extrabold underline mb-8 uppercase text-sm">Contrat de prestations de services</h3>

            <div className="space-y-5">
                <p>Entre les soussignés :</p>

                <p>
                    <span className="font-bold">BOAZ STUDY CAMEROUN</span>, SAS au capital de FCFA 7 000 000, siège social 389, rue 1239 Bonapriso Douala ; immatriculée au RC/DLN/2020/B/1412 représentée par Mme KOOH II Pamela Nadette épse BISSECK, Country Manager. Ci-après désignée « <span className="font-bold">Groupe BOAZ</span> » D'une part, et ;
                </p>

                <p>
                    Mme/M. <span className="font-bold">{lastName} {firstName}</span>, {birthDate !== '...' ? `né(e) le ${birthDate}` : ''} étudiant(e), demeurant au <span className="font-bold">CAMEROUN</span> Tél <span className="font-bold">{phone}</span>, mail : <span className="font-bold">{email}</span>. Ci-après désigné l'<span className="font-bold">ETUDIANT(e)</span> d'autre part.
                </p>

                <p className="uppercase font-extrabold italic border-b border-gray-200 pb-2">Il a été préalablement exposé ce qui suit</p>

                <p>
                    <span className="font-bold">1 – BOAZ-STUDY France</span>, Associé majoritaire de <span className="font-bold">BOAZ STUDY CAMEROUN</span>, est une société innovante qui a pour objet le cautionnement bancaire pour étudiants (AVI) et la conciergerie estudiantine.
                </p>

                <p>
                    <span className="font-bold">2 –</span> Mme/M. <span className="font-bold">{lastName} {firstName}</span> souhaite poursuivre ses études en France.
                </p>

                <p>
                    <span className="font-bold">3 –</span> En vue de se faire délivrer une AVI au <span className="font-bold">CAMEROUN</span> pour l'obtention d'un visa étudiant, l'étudiant a souhaité recourir aux services du groupe BOAZ.
                </p>
            </div>
        </div>
    );
};

export default ContractContent