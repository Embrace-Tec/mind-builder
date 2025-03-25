import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    AcademicCapIcon,
    UserGroupIcon,
    ChartBarIcon,
    CogIcon,
    DocumentTextIcon,
    UserPlusIcon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ sidebarOpen, onClose }) {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: HomeIcon },
        { name: 'Students', path: '/students', icon: AcademicCapIcon },
        { name: 'Reports', path: '/reports', icon: DocumentTextIcon },
        { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
        { name: 'Parents', path: '/parents', icon: UserGroupIcon },
        { name: 'Exams', path: '/exams', icon: ClipboardDocumentListIcon },
        { name: 'Settings', path: '/settings', icon: CogIcon },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out 
          ${sidebarOpen ? 'w-64' : 'w-20'} pt-16 z-20`}
            >
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-3 rounded-lg transition-colors
                    ${location.pathname === item.path
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
                                >
                                    <item.icon className={`h-6 w-6 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                                    {sidebarOpen && <span className="font-medium">{item.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Collapse/Expand button */}
                <div className={`absolute bottom-4 ${sidebarOpen ? 'right-4' : 'right-0 left-0'}`}>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors
              ${sidebarOpen ? '' : 'mx-auto block'}`}
                        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                    >
                        {sidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zM5.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L1.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}