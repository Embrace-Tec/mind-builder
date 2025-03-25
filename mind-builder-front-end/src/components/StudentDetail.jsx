// src/components/StudentDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudent } from '../services/api';
import {
    ArrowLeftIcon,
    PencilIcon,
    EnvelopeIcon,
    TrophyIcon,
    AcademicCapIcon,
    UserIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

const StudentDetail = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);
                const response = await getStudent(id);
                setStudent(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

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
                    <Link
                        to="/students"
                        className="text-red-700 hover:text-red-900 text-sm font-medium"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Student not found</h3>
                <Link
                    to="/students"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Students
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <Link
                    to="/students"
                    className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </Link>
                <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                                <UserIcon className="h-10 w-10 text-blue-600" />
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-gray-900 truncate">{student.name}</h3>

                            <div className="mt-4 space-y-4">
                                <div className="flex items-start">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="text-sm text-gray-900">{student.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <UserGroupIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Parent</p>
                                        <p className="text-sm text-gray-900">
                                            {student.parent ? (
                                                <Link
                                                    to={`/parents/${student.parent.id}`}
                                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                    {student.parent.name}
                                                </Link>
                                            ) : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <TrophyIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Rank</p>
                                        <p className="text-sm text-gray-900">
                                            {student.rank ? (
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    student.rank <= 10 ? 'bg-green-100 text-green-800' :
                                                        student.rank <= 20 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                }`}>
                                                    #{student.rank}
                                                </span>
                                            ) : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total Marks</p>
                                        <div className="flex items-center">
                                            <span className="text-sm text-gray-900 mr-2">{student.totalMarks || '0'}</span>
                                            {student.totalMarks && (
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full"
                                                        style={{ width: `${Math.min(100, student.totalMarks)}%` }}
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-3">
                        <Link
                            to="/students"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <ArrowLeftIcon className="h-5 w-5 mr-2" />
                            Back to List
                        </Link>
                        <Link
                            to={`/students/edit/${student.id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <PencilIcon className="h-5 w-5 mr-2" />
                            Edit Student
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;