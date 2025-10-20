
import React from 'react';
import supecoLogo from '../assets/logo';
import { ViewType } from './Dashboard';
import { DashboardIcon, ProductsIcon, AIIcon, ReportsIcon, EmployeesIcon, LogoutIcon } from './icons';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <li
        onClick={onClick}
        className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
            isActive ? 'bg-supeco-yellow text-supeco-gray' : 'text-gray-300 hover:bg-supeco-light-gray hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-4 font-semibold">{label}</span>
    </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'products', label: 'Products List', icon: <ProductsIcon /> },
        { id: 'ai_suggestions', label: 'AI Suggestions', icon: <AIIcon /> },
        { id: 'reports', label: 'Reports', icon: <ReportsIcon /> },
        { id: 'employees', label: 'Employees', icon: <EmployeesIcon /> },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>

            <aside
                className={`w-64 bg-supeco-dark text-white flex flex-col p-4 border-r border-supeco-light-gray 
                fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out 
                md:relative md:translate-x-0 md:flex-shrink-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="py-4 mb-4 border-b border-supeco-light-gray">
                    {supecoLogo('text-white')}
                </div>

                <nav className="flex-1">
                    <ul>
                        {navItems.map((item) => (
                            <NavItem
                                key={item.id}
                                icon={item.icon}
                                label={item.label}
                                isActive={activeView === item.id}
                                onClick={() => setActiveView(item.id as ViewType)}
                            />
                        ))}
                    </ul>
                </nav>

                <div>
                    <ul>
                        <li
                            onClick={() => window.location.reload()}
                            className="flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 text-gray-400 hover:bg-status-red hover:text-white"
                        >
                            <LogoutIcon />
                            <span className="ml-4 font-semibold">Logout</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
