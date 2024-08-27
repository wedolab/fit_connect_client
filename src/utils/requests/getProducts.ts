import { Product } from "../../models/Product";
import { baseHeader, HttpMethod } from "./baseFetch";


export async function getProducts(): Promise<Product[]> {


    try {
        const response = await fetch(import.meta.env.VITE_GET_PRODUCTS_URL, {
            method: HttpMethod.POST,
            headers: baseHeader,
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
            const products = data.map((item: any) => new Product(item.id, item.name, item.is_private, new Date(item.created_at)));

            return products;
        } else {
            throw new Error("Response data is not an array");
        }
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }

}