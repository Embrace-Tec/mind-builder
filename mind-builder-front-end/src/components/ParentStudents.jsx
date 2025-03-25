import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudentsByParent } from '../services/api';
import {
    ArrowLeftIcon,
    AcademicCapIcon,
    TrophyIcon,
    UserIcon
} from '@heroicons/react/24/outline';

const ParentStudents = () => {
    const { parentId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const response = await getStudentsByParent(parentId);
                setStudents(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStudents();
    }, [parentId]);

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
                        to={`/parents/${parentId}`}
                        className="text-red-700 hover:text-red-900 text-sm font-medium"
                    >
                        Back to parent
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <Link
                    to={`/parents/${parentId}`}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </Link>
                <h2 className="text-2xl font-bold text-gray-800">Student Children</h2>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                    {students.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {students.map((student) => (
                                <li key={student.id} className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                <UserIcon className="h-6 w-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                <Link to={`/students/${student.id}`} className="hover:underline">
                                                    {student.name}
                                                </Link>
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">{student.email}</p>
                                            <div className="flex items-center mt-1">
                                                <TrophyIcon className="h-4 w-4 text-gray-400 mr-1" />
                                                <span className={`text-xs font-medium ${
                                                    student.rank <= 10 ? 'text-green-800' :
                                                        student.rank <= 20 ? 'text-yellow-800' : 'text-red-800'
                                                }`}>
                                                    Rank: {student.rank || 'N/A'}
                                                </span>
                                                <AcademicCapIcon className="h-4 w-4 text-gray-400 ml-2 mr-1" />
                                                <span className="text-xs font-medium">
                                                    Marks: {student.totalMarks || '0'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No students found for this parent</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParentStudents;