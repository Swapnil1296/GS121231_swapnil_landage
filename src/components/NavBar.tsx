import React from 'react';
import logo from '../assets/Gsynergy Logo V2 Long Description.svg';

const Navbar: React.FC = () => {
    return (
        <nav className="flex items-center justify-between bg-white shadow px-4 py-2 border-b">
            <div className="flex items-center space-x-3">
                <img src={logo} alt="GSynergy" className="h-10 w-10 object-contain" />
                <div className="flex flex-col leading-tight">
                    <span className="font-semibold text-gray-700">GSynergy</span>
                    <span className="text-xs text-gray-500">Next-Gen Business Transformation</span>
                </div>
            </div>
            <h1 className="text-xl font-bold text-gray-700">Data Viewer App</h1>
            <div>
                {/* Placeholder for authentication / settings icons */}
                <button className="text-gray-600 hover:text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 3h18M3 21h18M4 8h16M4 16h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
