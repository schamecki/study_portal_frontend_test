import type { ReactNode } from 'react';
import { usePermissions } from '../hooks/usePermissions';

interface ProtectedComponentProps {
    /** Children to render when the user has the required permissions. */
    children: ReactNode;

    /** If set, user must hold ALL of these permission scopes. */
    requiredPermissions?: string[];

    /** If set, user must hold at least ONE of these permission scopes. */
    anyPermissions?: string[];

    /** Optional fallback — defaults to null (element absent from DOM). */
    fallback?: ReactNode;
}

export const ProtectedComponent = ({
                                       children,
                                       requiredPermissions,
                                       anyPermissions,
                                       fallback = null,
                                   }: ProtectedComponentProps) => {
    const { hasAllAuthorities, hasAnyAuthority } = usePermissions();

    // Check required permissions (ALL must match)
    if (requiredPermissions && requiredPermissions.length > 0) {
        if (!hasAllAuthorities(requiredPermissions)) {
            return <>{fallback}</>;
        }
    }

    // Check any permissions (at least ONE must match)
    if (anyPermissions && anyPermissions.length > 0) {
        if (!hasAnyAuthority(anyPermissions)) {
            return <>{fallback}</>;
        }
    }

    return <>{children}</>;
};
