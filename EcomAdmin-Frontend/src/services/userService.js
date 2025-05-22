import axios from "axios";

const API_URL = 'http://localhost:8080/api';

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`);
        return response.data;
    } catch (error) {
        console.log('Error fetching users', error);
        throw error;
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching user details', error);
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.log('Error deleting user', error);
        throw error;
    }
}
