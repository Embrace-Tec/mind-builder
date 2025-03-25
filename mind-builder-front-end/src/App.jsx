import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import StudentList from "./components/StudentList.jsx";
import StudentForm from "./components/StudentForm.jsx";
import ParentStudents from "./components/ParentStudents.jsx";
import StudentDetail from "./components/StudentDetail.jsx";
import ParentList from "./components/ParentList.jsx";
import ParentForm from "./components/ParentForm.jsx";
import ParentDetail from "./components/ParentDetail.jsx";

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
                            <Route path="/students" element={<StudentList />} />
                            <Route path="/students/add" element={<StudentForm />} />
                            <Route path="/students/edit/:id" element={<StudentForm />} />
                            <Route path="/students/:id" element={<StudentDetail />} />
                            <Route path="/parent/:parentId" element={<ParentStudents />} />
                            <Route path="/parents" element={<ParentList />} />
                            <Route path="/parents/add" element={<ParentForm />} />
                            <Route path="/parents/edit/:id" element={<ParentForm />} />
                            <Route path="/parents/:id" element={<ParentDetail />} />
                            <Route path="/parents/:parentId/students" element={<ParentStudents/>} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    )
}