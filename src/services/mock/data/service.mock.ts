import type {Service} from "../../../contracts/api-contracts.ts";

export const MOCK_SERVICES: Service[] = [
    {
        id: '1',
        title: 'Attestation de virement irrévocable',
        active: true,
        code: 'SERVICE_AVI',
        image: '/images/a_v_i.png',
        icon: '/images/icons/documentAltIcon.png'
    },
    {
        id: '2',
        title: 'Attestation de logement',
        active: true,
        code: 'SERVICE_AL',
        image: '/images/a_l.png',
        icon: '/images/icons/homeIcon.png'
    },
    {
        id: '3',
        title: 'Assurance vie',
        active: true,
        code: 'SERVICE_AV',
        image: '/images/a_v.png',
        icon: '/images/icons/thumbUpIcon.png'
    },
    {
        id: '4',
        title: 'Demande de financement',
        active: true,
        code: 'SERVICE_DF',
        image: '/images/d_f.png',
        icon: '/images/icons/documentIcon.png'
    }
];