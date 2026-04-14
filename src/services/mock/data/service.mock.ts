import type {Service} from "../../../contracts/api-contracts.ts";

export const MOCK_SERVICES: Service[] = [
    {
        id: '1',
        name: 'Développement Web',
        description: 'Création d’applications web modernes',
        active: true,
        code: '',
        image: '',
        icon: ''
    },
    {
        id: '2',
        name: 'Consulting IT',
        description: 'Audit et conseil en architecture',
        active: true,
        code: '',
        image: '',
        icon: ''
    },
    {
        id: '3',
        name: 'Maintenance',
        description: 'Support et maintenance des applications',
        active: false,
        code: '',
        image: '',
        icon: ''
    },
];