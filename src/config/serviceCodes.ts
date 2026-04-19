interface ServiceCode {
    code: string;
    path: string
}

const serviceCodes : ServiceCode[] = [
    {
        code: 'SERVICE_AVI',
        path: '/services/avi'
    },
    {
        code: 'SERVICE_AL',
        path: '/services/al'
    },
    {
        code: 'SERVICE_AV',
        path: '/services/av'
    },
    {
        code: 'SERVICE_DF',
        path: '/services/df'
    }
]

export default serviceCodes