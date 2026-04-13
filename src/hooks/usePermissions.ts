import { useMemo, useCallback } from 'react'
import { useAuthStore } from '../store/auth.store'

export const usePermissions = () => {
    const authUser = useAuthStore((state) => state.authUser)

    const authoritySet = useMemo(() => {
        return new Set(authUser?.authorities || []);
    }, [authUser]);

    const hasAuthority = useCallback(
        (authority: string) => authoritySet.has(authority),
        [authoritySet]
    );

    const hasAllAuthorities = useCallback(
        (required: string[]) => required.every((a) => authoritySet.has(a)),
        [authoritySet]
    )

    const hasAnyAuthority = useCallback(
        (required: string[]) => required.some((a) => authoritySet.has(a)),
        [authoritySet]
    );

    return {
        authUser,
        hasAuthority,
        hasAllAuthorities,
        hasAnyAuthority,
    }
}