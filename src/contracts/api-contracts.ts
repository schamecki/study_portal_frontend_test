// ============================================================
// API Contracts — StudyPortal
// TypeScript interfaces matching the JWT structure and
// all domain entities as specified in the functional spec.
// ============================================================

// --------------- Auth / JWT ---------------

export interface AuthUser {
    sub: string;
    preferred_username: string;
    email: string;
    last_name: string;
    first_name: string;
    realm_access: {
        roles: string[];
    };
    resource_access: {
        [clientId: string]: {
            roles: string[];
        };
    };
    scope: string;
    authorities?: string[];
    exp: number;
}

// --------------- Permissions (scopes) ---------------

export const PERMISSIONS = {
    TICKET_CREATE: 'ticket:create',
    TICKET_READ: 'ticket:read',
    TICKET_UPDATE: 'ticket:update',
    TICKET_COMMENT: 'ticket:comment',
    DOCUMENT_UPLOAD: 'document:upload',
    DOCUMENT_READ: 'document:read',
    DOCUMENT_DOWNLOAD: 'document:download',
    NOTIFICATION_READ: 'notification:read',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// --------------- Tickets ---------------

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    assigneeId: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTicketRequest {
    title: string;
    description: string;
    priority: TicketPriority;
}

export interface UpdateTicketRequest {
    title?: string;
    description?: string;
    status?: TicketStatus;
    priority?: TicketPriority;
}

export interface TicketComment {
    id: string;
    ticketId: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt: string;
}

// --------------- Documents ---------------

export interface Document {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadedBy: string;
    uploadedAt: string;
    url: string;
}

// --------------- Notifications ---------------

export interface Notification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    active: boolean;
    code: string;
    image: string;
    icon: string;
}

// --------------- API Response Wrappers ---------------

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// --------------- API Error ---------------

export interface ApiError {
    status: number;
    message: string;
    errors?: Record<string, string[]>;
}

// --------------- API Endpoints ---------------

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        REFRESH: '/api/auth/refresh',
        ME: '/api/auth/me',
    },
    TICKETS: {
        BASE: '/api/tickets',
        BY_ID: (id: string) => `/api/tickets/${id}`,
        COMMENTS: (id: string) => `/api/tickets/${id}/comments`,
    },
    DOCUMENTS: {
        BASE: '/api/documents',
        BY_ID: (id: string) => `/api/documents/${id}`,
        UPLOAD: '/api/documents/upload',
    },
    NOTIFICATIONS: {
        BASE: '/api/notifications',
        BY_ID: (id: string) => `/api/notifications/${id}`,
        MARK_READ: (id: string) => `/api/notifications/${id}/read`,
    },
    SERVICE: {
        BASE: '/api/services',
        BY_ID: (id: string) => `/api/services/${id}`,
        MARK_READ: (id: string) => `/api/services/${id}/read`,
    }
} as const;