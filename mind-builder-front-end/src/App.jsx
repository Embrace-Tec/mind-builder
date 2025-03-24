import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Sidebar sidebarOpen={sidebarOpen} />

                <main className={`pt-16 transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'pl-64' : 'pl-20'
                }`}>
                    <div className="p-6">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/analytics" element={<Analytics />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    )
}