import { useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { useAuth } from '../../hooks/useAuth';
import {Link, useLocation} from 'react-router-dom';
import {PAGE_TITLES} from "../../config/pageTitle.ts";
import {usePageTitle} from "../../hooks/usePageTitle.ts";
import userProfil from "./../../assets/images/user.png";

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header = ({onMenuClick}: HeaderProps) => {
    const user = useAuthStore((s) => s.authUser);

    const { logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const location = useLocation();

    const getPageInfos = () => {
        let result = {name: 'page introuvable', title: 'Study portal home'}
        const path = location.pathname;
        const titleEntry = Object.entries(PAGE_TITLES).find(([route]) => {
            const routeRegex = new RegExp(`^${route.replace(/:id/, "[^/]+")}$`);
            return routeRegex.test(path);
        });

        if (titleEntry) {
            const [, data] = titleEntry;
            result = data as {name: string, title: string};
            if (typeof data.title === "function") {
                // Extraire l'ID pour les routes dynamiques
                const id = path.split("/").pop();
                result.title = data.title(id || "");
            }
        }

        return result
    };

    const pageInfos = getPageInfos();

    usePageTitle(pageInfos.title)

    // Extract first letter of username for avatar
    const avatarLetter = user?.preferred_username?.charAt(0).toUpperCase() || 'U';

    return (
        <header className="bg-white rounded-2xl shadow-card px-6 lg:px-8 py-4 mb-6">
            <div className="flex items-center justify-between">
                {/* Mobile menu button */}
                <button onClick={onMenuClick} className="lg:hidden text-secondary mr-4 cursor-pointer">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Page title */}
                <h1 className="text-2xl lg:text-3xl font-bold text-boaz-blue">{pageInfos.name}</h1>

                {/* Right side — user profile section */}
                <div className="flex items-center gap-6">
                    {/* Organisation badge */}
                    <div className="hidden md:flex items-center gap-2 text-sm text-secondary">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>Mon organisation</span>
                    </div>

                    {/* User profile dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-boaz-orange flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                                <img
                                    src={user?.profile || userProfil}
                                    alt={user?.preferred_username}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        const parent = e.currentTarget.parentElement;
                                        if (parent) parent.textContent = avatarLetter;
                                    }}
                                />
                            </div>

                            {/* User info */}
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-semibold text-primary">
                                    {user?.preferred_username || 'Utilisateur'}
                                </p>
                                <p className="text-xs text-muted">Admin</p>
                            </div>

                            {/* Chevron */}
                            <svg
                                className={`w-4 h-4 text-muted hidden md:block transition-transform ${
                                    dropdownOpen ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {dropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                                <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-lg border border-light py-2 z-20">
                                    <Link
                                        to="/profil"
                                        className="block px-4 py-2 text-sm text-secondary hover:bg-sidebar-hover-bg transition-colors"
                                    >
                                        Mon Profil
                                    </Link>
                                    <Link
                                        to="/parametres"
                                        className="block px-4 py-2 text-sm text-secondary hover:bg-sidebar-hover-bg transition-colors"
                                    >
                                        Paramètres
                                    </Link>
                                    <hr className="my-1 border-light" />
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
