import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getParent, registerParent, updateParent } from '../services/api';
import {
    ArrowLeftIcon,
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    CheckIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const ParentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            const fetchParent = async () => {
                try {
                    setLoading(true);
                    const response = await getParent(id);
                    setFormData({
                        name: response.data.name,
                        email: response.data.email,
                        password: ''
                    });
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };
            fetchParent();
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
                await updateParent(id, formData);
            } else {
                await registerParent(formData);
            }
            setLoading(false);
            navigate('/parents');
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
                    onClick={() => navigate('/parents')}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                    {isEdit ? 'Edit Parent' : 'Add New Parent'}
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
                    </div>

                    {/* Form Actions */}
                    <div className="mt-8 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/parents')}
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
                            {isEdit ? 'Update Parent' : 'Register Parent'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ParentForm;