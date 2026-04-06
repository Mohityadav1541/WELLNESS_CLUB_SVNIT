import axios from 'axios';

const API_URL = 'http://localhost:5000/api/committees';

// Get token from local storage
const getConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getCommittees = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

export const createCommittee = async (committeeData: any) => {
    const response = await axios.post(API_URL, committeeData, getConfig());
    return response.data;
};

export const updateCommittee = async (id: string, committeeData: any) => {
    const response = await axios.put(`${API_URL}/${id}`, committeeData, getConfig());
    return response.data;
};

export const deleteCommittee = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`, getConfig());
    return response.data;
};

export const addMember = async (committeeId: string, userId: string, role: string) => {
    const response = await axios.post(
        `${API_URL}/${committeeId}/members`,
        { userId, role },
        getConfig()
    );
    return response.data;
};

export const addMemberWithDetails = async (committeeId: string, data: any) => {
    const response = await axios.post(
        `${API_URL}/${committeeId}/members/details`,
        data,
        getConfig()
    );
    return response.data;
};

export const exportCommittee = async (committeeId: string, committeeName: string) => {
    const response = await axios.get(`${API_URL}/${committeeId}/export`, {
        ...getConfig(),
        responseType: 'blob'
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${committeeName.replace(/\s+/g, '_')}_Members.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const removeMember = async (committeeId: string, userId: string) => {
    const response = await axios.delete(
        `${API_URL}/${committeeId}/members/${userId}`,
        getConfig()
    );
    return response.data;
};

export const updateMemberRole = async (committeeId: string, userId: string, role: string) => {
    const response = await axios.put(
        `${API_URL}/${committeeId}/members/${userId}`,
        { role },
        getConfig()
    );
    return response.data;
};
