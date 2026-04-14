import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logoBoaz from '../../assets/images/logo-boaz.png';

// ---- Icons (SVG inline, matching Figma Heroicons) ----

const HomeIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
    </svg>
);

const BuildingIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const ServiceIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const SubscriptionIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const DocumentIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const WalletIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v1" />
    </svg>
);

const ChartIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const SettingsIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

// ---- Navigation structure (from Figma "Menu Espace Client") ----

interface SubItem {
    label: string;
    path: string;
}

interface NavItem {
    label: string;
    icon: React.ReactNode;
    path?: string;
    children?: SubItem[];
}

const mainNav: NavItem[] = [
    { label: 'Accueil', icon: <HomeIcon />, path: '/' },
    { label: 'Mon agence', icon: <BuildingIcon />, path: '/agence' },
    { label: 'Services', icon: <ServiceIcon />, path: '/services' },
    {
        label: 'Mes souscriptions',
        icon: <SubscriptionIcon />,
        children: [
            { label: 'Services', path: '/souscriptions/services' },
            { label: 'Financement', path: '/souscriptions/financement' },
            { label: 'Remboursements', path: '/souscriptions/remboursements' },
        ],
    },
    { label: 'Preuves de versement', icon: <DocumentIcon />, path: '/preuves' },
    {
        label: 'Mon Wallet Boaz',
        icon: <WalletIcon />,
        children: [
            { label: 'Mes historiques', path: '/wallet/historiques' },
        ],
    },
    { label: 'Programme d\'affiliation', icon: <UsersIcon />, path: '/affiliation' },
];

const generalNav: NavItem[] = [
    { label: 'Tableau de bord', icon: <ChartIcon />, path: '/dashboard' },
    { label: 'Paramètres', icon: <SettingsIcon />, path: '/parametres' },
];

// ---- Component ----

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

    const toggleMenu = (label: string) => {
        setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const isActive = (path?: string, children?: SubItem[]) => {
        if (path && location.pathname === path) return true;
        if (children) return children.some((c) => location.pathname === c.path);
        return false;
    };

    const renderNavItem = (item: NavItem) => {
        const active = isActive(item.path, item.children);
        const expanded = expandedMenus[item.label] || active;

        if (item.children) {
            return (
                <div key={item.label}>
                    <button
                        onClick={() => toggleMenu(item.label)}
                        className={`
              w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm
              transition-colors duration-150 cursor-pointer
              ${active ? 'text-sidebar-active-text bg-sidebar-active-bg font-medium' : 'text-secondary hover:bg-sidebar-hover-bg'}
            `}
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                        <ChevronIcon open={expanded} />
                    </button>

                    {/* Sub-items */}
                    <div className={`overflow-hidden transition-all duration-200 ${expanded ? 'max-h-40' : 'max-h-0'}`}>
                        <div className="ml-8 mt-1 flex flex-col gap-0.5">
                            {item.children.map((sub) => (
                                <NavLink
                                    key={sub.path}
                                    to={sub.path}
                                    onClick={onClose}
                                    className={({ isActive: linkActive }) => `
                    block px-3 py-1.5 text-sm rounded-md transition-colors duration-150
                    ${linkActive ? 'text-sidebar-active-text font-medium bg-sidebar-active-bg' : 'text-secondary hover:text-primary'}
                  `}
                                >
                                    {sub.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <NavLink
                key={item.path}
                to={item.path!}
                onClick={onClose}
                className={({ isActive: linkActive }) => `
          flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors duration-150
          ${linkActive ? 'text-sidebar-active-text bg-sidebar-active-bg font-medium' : 'text-secondary hover:bg-sidebar-hover-bg'}
        `}
            >
                {item.icon}
                <span>{item.label}</span>
            </NavLink>
        );
    };

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-sidebar shadow-sidebar
          flex flex-col overflow-y-auto
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Logo */}
                <div className="flex items-center px-6 py-5 shrink-0">
                    <img src={logoBoaz} alt="Boaz Study" className="h-10 object-contain" />
                </div>

                {/* Main nav */}
                <nav className="flex-1 px-3 py-2 flex flex-col gap-0.5">
                    {mainNav.map(renderNavItem)}

                    {/* Separator */}
                    <div className="flex items-center gap-2 px-4 py-3 mt-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs font-semibold text-muted tracking-wider">GENERAL</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {generalNav.map(renderNavItem)}
                </nav>
            </aside>
        </>
    );
};
