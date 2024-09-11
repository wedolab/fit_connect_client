import { Product } from "../../models/Product";
import { baseHeader, HttpMethod } from "./baseFetch";


export async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch(
            import.meta.env.VITE_API_URL
            + '/products/product/', {
            method: HttpMethod.GET,
            headers: baseHeader,
        });
        if (!response.ok) {
            const error = response.statusText;
            const statusCode = response.status;
            throw new Error("Network response is not ok: " + error + statusCode);
        }

        const data = await response.json();

        const products = data.map((item: any) => new Product(item));

        return products;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}