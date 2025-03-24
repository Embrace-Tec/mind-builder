import { Link, useLocation } from 'react-router-dom'
import {
    ChartBarIcon,
    ShoppingCartIcon,
    UsersIcon,
    CogIcon,
    HomeIcon
} from '@heroicons/react/24/outline'

export default function Sidebar({ sidebarOpen }) {
    const location = useLocation()

    const navItems = [
        { name: 'Dashboard', path: '/', icon: HomeIcon },
        { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
        { name: 'Products', path: '/products', icon: ShoppingCartIcon },
        { name: 'Customers', path: '/customers', icon: UsersIcon },
        { name: 'Settings', path: '/settings', icon: CogIcon },
    ]

    return (
        <aside className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out 
      ${sidebarOpen ? 'w-64' : 'w-20'} pt-16 z-0`}>
            <nav className="p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`flex items-center p-3 rounded-lg transition-colors
                  ${location.pathname === item.path
                                    ? 'bg-primary text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-500 hover:text-white'}`}
                            >
                                <item.icon className={`h-6 w-6 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                                {sidebarOpen && <span>{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}