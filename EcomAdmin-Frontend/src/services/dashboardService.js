import axios from "axios";

const API_URL = 'http://localhost:8080/api/dashboard';

export const getUserCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/countuser`);
        return response.data;
    } catch (error) {
        console.log('Error fetching user count', error);
        throw error;
    }
}

export const getOrderCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/countorder`);
        return response.data;
    } catch (error) {
        console.log('Error fetching order count', error);
        throw error;
    }
}

export const getProductCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/countproduct`);
        return response.data;
    } catch (error) {
        console.log('Error fetching product count', error);
        throw error;
    }
}

export const getTotalRevenue = async () => {
    try {
        const response = await axios.get(`${API_URL}/revenue`);
        return response.data;
    } catch (error) {
        console.log('Error fetching total revenue', error);
        throw error;
    }
}
