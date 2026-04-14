// Mock data for authentication
import type { AuthUser } from '../../contracts/api-contracts';

export const MOCK_ADMIN_USER: AuthUser = {
    sub: 'admin-uuid-0001',
    preferred_username: 'admin.boaz',
    email: 'admin@boaz-study.com',
    realm_access: {
        roles: ['ADMIN', 'USER'],
    },
    resource_access: {
        'studyportal-app': {
            roles: ['ADMIN'],
        },
    },
    scope: 'openid profile email',
    authorities: [
        'ticket:create',
        'ticket:read',
        'ticket:update',
        'ticket:comment',
        'document:upload',
        'document:read',
        'document:download',
        'notification:read',
    ],
    exp: Math.floor(Date.now() / 1000) + 3600,
};

export const MOCK_BASIC_USER: AuthUser = {
    sub: 'user-uuid-0002',
    preferred_username: 'john.doe',
    email: 'john.doe@boaz-study.com',
    realm_access: {
        roles: ['USER'],
    },
    resource_access: {
        'studyportal-app': {
            roles: ['AGENT'],
        },
    },
    scope: 'openid profile',
    authorities: [
        'ticket:read',
        'ticket:comment',
        'document:read',
        'notification:read',
    ],
    exp: Math.floor(Date.now() / 1000) + 3600,
};

export const mockUsers: AuthUser[] = [MOCK_ADMIN_USER, MOCK_BASIC_USER];