import { Product } from "../../models/Product";
import { baseFecth, HttpMethod } from "./baseFetch";
 

export async function getProducts(): Promise<Product[]>{
    return baseFecth<Product[]>({
        apiUrl: import.meta.env.VITE_GET_PRODUCTS_URL,
        method: HttpMethod.GET,
        onResponse: async (response: Response, resolve: Function) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            try {
                const data = await response.json();
                if (Array.isArray(data)) {
                    const products = data.map((item: any) => new Product(item.id, item.name, item.is_private, new Date(item.created_at)));
                    resolve(products); // Возвращаем массив данных
                } else {
                    throw new Error("Response data is not an array");
                }
            } catch (error) {
                console.error("Error parsing response:", error);
                throw error;
            }
        },
        onReject: (error: any) => {
            console.error("Error sending data:", error);
        }
    });
}