import { Product } from "../../models/Product";
import { Subscription } from "../../models/Subscriptions";
import { baseHeader, HttpMethod } from "./baseFetch";


export async function getSubscriptions(userId: String): Promise<Subscription[]> {
    try {
        const response = await fetch(import.meta.env.VITE_CLIENT_SUBSCRIPTIONS_URL + userId, {
            method: HttpMethod.POST,
            headers: baseHeader,
        });

        if (!response.ok) {
            throw new Error("Network response is not ok");
        }

        const data = response.json();
        if (Array.isArray(data)) {
            const subscriptions = data.map(transformJsonToData);
            return subscriptions;
        } else {
            throw new Error("Data is not array");
        }


    } catch (error) {
        console.log("Something goes wrong: " + error)
        throw error;
    }
}

// Трансформер из JSON в массив Subscription
function transformJsonToData(jsonData: any): Subscription {
    const productData = jsonData.product;
    const product = new Product(productData.id, productData.name, productData.is_private, new Date(productData.created_at));
    const createdAt = new Date(jsonData.created_at);
    return new Subscription(product, createdAt);
}