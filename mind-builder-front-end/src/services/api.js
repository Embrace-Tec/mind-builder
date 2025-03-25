import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Parent API endpoints
export const registerParent = async (registerRequest) => {
    return await axios.post(`${API_BASE_URL}/parents/register`, registerRequest);
};

export const getParent = async (id) => {
    return await axios.get(`${API_BASE_URL}/parents/${id}`);
};

export const getAllParents = async () => {
    return await axios.get(`${API_BASE_URL}/parents`);
};

export const updateParent = async (id, parentData) => {
    return await axios.put(`${API_BASE_URL}/parents/${id}`, parentData);
};

export const deleteParent = async (id) => {
    return await axios.delete(`${API_BASE_URL}/parents/${id}`);
};

export const getStudentsByParent = async (parentId) => {
    return await axios.get(`${API_BASE_URL}/parents/${parentId}/students`);
};

// Existing student API endpoints...
export const registerStudent = async (registerRequest) => {
    console.log(registerRequest)
    return await axios.post(`${API_BASE_URL}/students/register`, registerRequest);
};

export const getStudent = async (id) => {
    return await axios.get(`${API_BASE_URL}/students/${id}`);
};

export const getAllStudents = async () => {
    return await axios.get(`${API_BASE_URL}/students`);
};

export const updateStudent = async (id, studentData) => {
    return await axios.put(`${API_BASE_URL}/students/${id}`, studentData);
};

export const updateStudentRank = async (id, rank) => {
    return await axios.patch(`${API_BASE_URL}/students/${id}/rank`, null, { params: { rank } });
};

export const updateStudentTotalMarks = async (id, totalMarks) => {
    return await axios.patch(`${API_BASE_URL}/students/${id}/marks`, null, { params: { totalMarks } });
};

export const deleteStudent = async (id) => {
    return await axios.delete(`${API_BASE_URL}/students/${id}`);
};