import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProtectedComponent } from '../ProtectedComponent';
import { usePermissions } from '../../hooks/usePermissions';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

// Mock du hook usePermissions
vi.mock('../../hooks/usePermissions', () => ({
  usePermissions: vi.fn(),
}));

const MockChildren = () => <div>Contenu Protégé</div>;

describe('ProtectedComponent', () => {
  it('doit rendre les enfants si l\'utilisateur a la permission requise', () => {
    // Simule un utilisateur avec les droits
    vi.mocked(usePermissions).mockReturnValue({
      hasAllAuthorities: (req: string[]) => true,
      hasAnyAuthority: (any: string[]) => true,
      authUser: { authorities: ['ticket:create'] },
      hasAuthority: (a: string) => true
    });

    render(
      <MemoryRouter>
        <ProtectedComponent requiredPermissions={['ticket:create']}>
          <MockChildren />
        </ProtectedComponent>
      </MemoryRouter>
    );

    expect(screen.getByText('Contenu Protégé')).toBeInTheDocument();
  });

  it('doit rendre le fallback AccessDenied par défaut si la permission est absente', () => {
    // Simule un utilisateur sans les droits
    vi.mocked(usePermissions).mockReturnValue({
      hasAllAuthorities: (req: string[]) => false,
      hasAnyAuthority: (any: string[]) => false,
      authUser: { authorities: [] },
      hasAuthority: (a: string) => false
    });

    render(
      <MemoryRouter>
        <ProtectedComponent requiredPermissions={['ticket:create']}>
          <MockChildren />
        </ProtectedComponent>
      </MemoryRouter>
    );

    // Ne doit pas afficher le contenu
    expect(screen.queryByText('Contenu Protégé')).not.toBeInTheDocument();
    // Doit afficher le message d'accès refusé (titre par défaut d'AccessDenied)
    expect(screen.getByText('Accès non autorisé')).toBeInTheDocument();
  });

  it('doit rendre un fallback personnalisé si fourni', () => {
    vi.mocked(usePermissions).mockReturnValue({
      hasAllAuthorities: (req: string[]) => false,
      hasAnyAuthority: (any: string[]) => false,
      authUser: { authorities: [] },
      hasAuthority: (a: string) => false
    });

    render(
      <MemoryRouter>
        <ProtectedComponent 
            requiredPermissions={['ticket:create']}
            fallback={<div>Désolé, pas de ticket</div>}
        >
          <MockChildren />
        </ProtectedComponent>
      </MemoryRouter>
    );

    expect(screen.getByText('Désolé, pas de ticket')).toBeInTheDocument();
  });

  it('doit valider anyPermissions (AU MOINS UN)', () => {
    vi.mocked(usePermissions).mockReturnValue({
      hasAllAuthorities: (req: string[]) => false,
      hasAnyAuthority: (any: string[]) => true,
      authUser: { authorities: ['ticket:read'] },
      hasAuthority: (a: string) => a === 'ticket:read'
    });

    render(
      <MemoryRouter>
        <ProtectedComponent anyPermissions={['ticket:create', 'ticket:read']}>
          <MockChildren />
        </ProtectedComponent>
      </MemoryRouter>
    );

    expect(screen.getByText('Contenu Protégé')).toBeInTheDocument();
  });
});
