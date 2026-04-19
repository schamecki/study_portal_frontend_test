import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Loader } from '../shared';
import {useAppStore} from "../../store/app.store.ts";

export const MainLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLoading = useAppStore((state) => state.isLoading);

    return (
        <div className="flex h-screen overflow-hidden bg-page">
            {/* Sidebar */}
            <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-4 lg:px-8 pt-6">
                    <Header onMenuClick={() => setMobileMenuOpen(true)} />
                </div>

                {/* Content area — white rounded card matching Figma */}
                <main className="flex-1 overflow-y-auto rounded-2xl px-4 lg:px-8 pb-6">
                    <div className="relative bg-card rounded-2xl shadow-card p-6 lg:p-8 min-h-full bg-white">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-50 transition-all duration-300">
                                <Loader size="lg" />
                            </div>
                        )}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
