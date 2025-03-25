// src/components/StudentForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getStudent,
    registerStudent,
    updateStudent,
    updateStudentRank,
    updateStudentTotalMarks,
    getAllParents
} from '../services/api';
import {
    ArrowLeftIcon,
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    TrophyIcon,
    AcademicCapIcon,
    CheckIcon,
    XMarkIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rank: '',
        totalMarks: '',
        parentId: ''
    });
    const [parents, setParents] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingParents, setLoadingParents] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch parents list
// Update the fetchParents function in useEffect
        const fetchParents = async () => {
            try {
                setLoadingParents(true);
                const response = await getAllParents();
                console.log('Parents API response:', response); // Debug log
                // Ensure we're working with an array
                const parentsData = Array.isArray(response.data) ? response.data : [];
                setParents(parentsData);
                setLoadingParents(false);
            } catch (err) {
                console.error('Error fetching parents:', err); // Debug log
                setError(err.message);
                setParents([]); // Set to empty array on error
                setLoadingParents(false);
            }
        };

        fetchParents();

        if (id) {
            setIsEdit(true);
            const fetchStudent = async () => {
                try {
                    setLoading(true);
                    const response = await getStudent(id);
                    setFormData({
                        name: response.data.name,
                        email: response.data.email,
                        password: '',
                        rank: response.data.rank || '',
                        totalMarks: response.data.totalMarks || '',
                        parentId: response.data.parent?.id || ''
                    });
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };
            fetchStudent();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isEdit) {
                await updateStudent(id, formData);
                if (formData.rank) {
                    await updateStudentRank(id, formData.rank);
                }
                if (formData.totalMarks) {
                    await updateStudentTotalMarks(id, formData.totalMarks);
                }
            } else {
                await registerStudent(formData);
            }
            setLoading(false);
            navigate('/students');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                    <button
                        onClick={() => setError(null)}
                        className="text-red-700 hover:text-red-900"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate('/students')}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                    {isEdit ? 'Edit Student' : 'Add New Student'}
                </h2>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                    <div className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={isEdit ? 'Leave blank to keep unchanged' : '••••••••'}
                                    required={!isEdit}
                                    minLength={isEdit ? 0 : 8}
                                />
                            </div>
                            {!isEdit && (
                                <p className="mt-1 text-xs text-gray-500">
                                    Password must be at least 8 characters
                                </p>
                            )}
                        </div>

                        {/* Parent Field */}
                        <div>
                            <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 mb-1">
                                Parent
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserGroupIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    id="parentId"
                                    name="parentId"
                                    value={formData.parentId}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                >
                                    <option value="">Select a parent</option>
                                    {loadingParents ? (
                                        <option disabled>Loading parents...</option>
                                    ) : (
                                        parents.map(parent => (
                                            <option key={parent.id} value={parent.id}>
                                                {parent.name} ({parent.email})
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Rank and Marks Fields - Side by Side on larger screens */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Rank Field */}
                            <div>
                                <label htmlFor="rank" className="block text-sm font-medium text-gray-700 mb-1">
                                    Rank
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <TrophyIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="rank"
                                        name="rank"
                                        value={formData.rank}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="1-100"
                                        min="1"
                                        max="100"
                                    />
                                </div>
                            </div>

                            {/* Total Marks Field */}
                            <div>
                                <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700 mb-1">
                                    Total Marks
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="totalMarks"
                                        name="totalMarks"
                                        value={formData.totalMarks}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0-100"
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="mt-8 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/students')}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <XMarkIcon className="h-5 w-5 mr-2" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <CheckIcon className="h-5 w-5 mr-2" />
                            {isEdit ? 'Update Student' : 'Register Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;