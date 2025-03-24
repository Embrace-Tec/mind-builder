import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
    return (
        <header className="fixed top-0 right-0 left-0 bg-white shadow-sm z-10">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <h1 className="ml-4 text-xl font-semibold text-gray-800">MindBuilder</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-1 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100">
                        <BellIcon className="h-6 w-6" />
                    </button>
                    <button className="flex items-center space-x-2">
                        <UserCircleIcon className="h-8 w-8 text-gray-500" />
                        <span className="hidden md:inline-block text-sm font-medium">Admin</span>
                    </button>
                </div>
            </div>
        </header>
    )
}