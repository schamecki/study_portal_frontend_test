import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePermissions } from '../usePermissions';
import { useAuthStore } from '../../store/auth.store';

// Mock du store auth pour contrôler les permissions
vi.mock('../../store/auth.store', () => ({
  useAuthStore: vi.fn(),
}));

describe('usePermissions', () => {
  it('doit retourner hasAuthority true pour un ADMIN avec ticket:create', () => {
    vi.mocked(useAuthStore).mockReturnValue({ authorities: ['ticket:create', 'ticket:read'] });

    const { result } = renderHook(() => usePermissions());
    expect(result.current.hasAuthority('ticket:create')).toBe(true);
  });

  it('doit retourner hasAuthority false pour un USER sans ticket:create', () => {
    vi.mocked(useAuthStore).mockReturnValue({ authorities: ['ticket:read'] });

    const { result } = renderHook(() => usePermissions());
    expect(result.current.hasAuthority('ticket:create')).toBe(false);
  });

  it('doit retourner hasAnyAuthority true si au moins un scope est présent', () => {
    vi.mocked(useAuthStore).mockReturnValue({ authorities: ['ticket:read'] });

    const { result } = renderHook(() => usePermissions());
    expect(result.current.hasAnyAuthority(['ticket:create', 'ticket:read'])).toBe(true);
  });

  it('doit retourner hasAllAuthorities true si tous les scopes sont présents', () => {
    vi.mocked(useAuthStore).mockReturnValue({ authorities: ['ticket:create', 'ticket:read', 'ticket:update'] });

    const { result } = renderHook(() => usePermissions());
    expect(result.current.hasAllAuthorities(['ticket:create', 'ticket:read'])).toBe(true);
  });

  it('doit retourner false si l\'utilisateur n\'a aucune autorité', () => {
    vi.mocked(useAuthStore).mockReturnValue(null);

    const { result } = renderHook(() => usePermissions());
    expect(result.current.hasAuthority('ticket:read')).toBe(false);
  });
});
