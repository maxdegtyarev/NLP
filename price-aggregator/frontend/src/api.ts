import { Product, Category } from './types';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
    async searchProducts(query: string): Promise<Product[]> {
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
        return response.json();
    },

    async getCategories(): Promise<Category[]> {
        const response = await fetch(`${API_BASE_URL}/categories`);
        return response.json();
    },

    async getFeaturedDeals(): Promise<Product[]> {
        const response = await fetch(`${API_BASE_URL}/featured`);
        return response.json();
    }
}; 