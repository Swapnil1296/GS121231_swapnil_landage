import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChartBarIcon, HomeIcon, TableCellsIcon, TagIcon } from '@heroicons/react/24/solid'

const Sidebar: React.FC = () => {
    const menuItems = [
        { path: '/stores', label: 'Store', icon: <HomeIcon className="h-5 w-5" /> },
        { path: '/skus', label: 'SKU', icon: <TagIcon className="h-5 w-5" /> },
        { path: '/planning', label: 'Planning', icon: <TableCellsIcon className="h-5 w-5" /> },
        { path: '/chart', label: 'Charts', icon: <ChartBarIcon className="h-5 w-5" /> }
    ];

    return (
        <aside className="w-56 bg-white border-r shadow-sm">
            <nav className="flex flex-col py-4">
                {menuItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 
               ${isActive ? 'bg-gray-100 font-semibold' : ''}`
                        }
                    >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
