import { Product } from "../../models/Product";
import { Subscription } from "../../models/Subscriptions";
import { baseFecth, HttpMethod } from "./baseFetch";
 

export async function getSubscriptions(userId: String): Promise<Subscription[]>{
    return baseFecth<Subscription[]>({
        apiUrl: import.meta.env.VITE_CLIENT_SUBSCRIPTIONS_URL+userId,
        method: HttpMethod.GET,
        onResponse: async (response: Response, resolve: Function) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            try {
                const data = await response.json();
                if (Array.isArray(data)) {
                    const subscriptions = data.map((data) => transformJsonToData(data));
                    resolve(subscriptions); // Возвращаем массив данных
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

// Трансформер из JSON в массив Subscription
function transformJsonToData(jsonData: any): Subscription {
    const productData = jsonData.product;
    const product = new Product(productData.id, productData.name, productData.is_private, new Date(productData.created_at));
    const createdAt = new Date(jsonData.created_at);
    return new Subscription(product, createdAt);
}