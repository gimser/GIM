import React from 'react';
import { SearchIcon, NotificationIcon, ClockIcon, MenuIcon, BarcodeIcon } from './icons';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    alertDays: number;
    setAlertDays: (days: number) => void;
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, alertDays, setAlertDays, onMenuClick }) => {
    const alertOptions = [3, 7, 14, 30];
    return (
        <header className="bg-supeco-dark p-4 flex justify-between items-center border-b border-supeco-light-gray gap-4">
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={onMenuClick} 
                    className="md:hidden text-gray-300 hover:text-white" 
                    aria-label="Open menu"
                >
                    <MenuIcon />
                </button>
                <div className="relative w-full max-w-md">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder="Search products or scan barcode..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-supeco-light-gray text-white pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-supeco-yellow"
                    />
                     <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <BarcodeIcon />
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-4 flex-shrink-0">
                 <div className="hidden lg:flex items-center space-x-2">
                    <ClockIcon />
                    <span className="text-sm text-gray-300 font-semibold whitespace-nowrap">Notify within:</span>
                    <div className="flex items-center bg-supeco-light-gray rounded-lg p-1">
                        {alertOptions.map(days => (
                            <button
                                key={days}
                                onClick={() => setAlertDays(days)}
                                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                                    alertDays === days 
                                    ? 'bg-supeco-yellow text-supeco-gray font-bold' 
                                    : 'text-gray-300 hover:bg-supeco-gray'
                                }`}
                            >
                                {days}d
                            </button>
                        ))}
                    </div>
                </div>
                <button className="relative text-gray-300 hover:text-white">
                    <NotificationIcon />
                    <span className="absolute -top-1 -right-1 bg-status-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </button>
                <div className="flex items-center space-x-3">
                    <img
                        src="https://i.pravatar.cc/40?u=manager"
                        alt="Manager"
                        className="w-10 h-10 rounded-full border-2 border-supeco-yellow"
                    />
                    <div className="hidden sm:block">
                        <p className="font-semibold text-white">Admin Manager</p>
                        <p className="text-xs text-gray-400">Store #001</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;