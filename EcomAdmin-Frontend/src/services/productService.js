import axios from "axios";

const API_URL = 'http://localhost:8080/api/products';

export const addProduct = async (productData, image) => {
    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));
    formData.append('file', image); 

    try {
        await axios.post(API_URL, formData, {headers: { "Content-Type": "multipart/form-data"}});
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
}

export const getProductList = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log('Error fetching product list', error);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(API_URL+"/"+productId);
        return response.status === 204;
    } catch (error) {
        console.log('Error while deleting the product.', error);
        throw error;
    }
}

export const updateAvailability = async (productId, isAvailable) => {
    try {
        const response = await axios.patch(
            `${API_URL}/${productId}/availability`,
            isAvailable,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('Error updating product availability', error);
        throw error;
    }
}

export const updateProduct = async (productId, updateData) => {
    try {
        const response = await axios.patch(`${API_URL}/${productId}/update`, updateData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.log('Error updating product', error);
        throw error;
    }
}

export const readProduct = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.log('Error reading product', error);
        throw error;
    }
}

export const searchProducts = async (keyword) => {
    try {
        const response = await axios.get(`${API_URL}/search?keyword=${keyword}`);
        return response.data;
    } catch (error) {
        console.log('Error searching products', error);
        throw error;
    }
}

export const getProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/category?category=${category}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching products by category', error);
        throw error;
    }
}

export const searchProductsByCategory = async (keyword, category) => {
    try {
        const response = await axios.get(`${API_URL}/search/category?keyword=${keyword}&category=${category}`);
        return response.data;
    } catch (error) {
        console.log('Error searching products by category', error);
        throw error;
    }
}