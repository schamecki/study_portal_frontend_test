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

                {/* Content area — fixed rounded container with internal scroll */}
                <main className="flex-1 flex flex-col overflow-hidden px-4 lg:px-8 pb-6 mt-4">
                    <div className="flex-1 relative bg-white rounded-2xl shadow-card overflow-hidden flex flex-col">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-50 transition-all duration-300">
                                <Loader size="lg" />
                            </div>
                        )}
                        
                        {/* Scrollable content area */}
                        <div className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-hide">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
