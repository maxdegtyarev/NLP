export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    storeName: string;
    storeIcon: string;
    category: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    count: number;
}

export interface SearchResponse {
    products: Product[];
} 