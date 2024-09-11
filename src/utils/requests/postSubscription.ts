import { Product } from "../../models/Product";
import { Subscription } from "../../models/Subscriptions";
import { baseHeader, HttpMethod } from "./baseFetch";


export async function postSubscription(userId: string, productId: number): Promise<Subscription> {
    try {
        const response = await fetch(import.meta.env.VITE_SET_SUBSCRIPTION_URL, {
            method: HttpMethod.POST,
            headers: baseHeader,
            body: JSON.stringify({
                'telegram_uid': userId,
                'product_id': productId,
            }),
        });
        if (!response.ok) {
            const error = response.statusText;
            const statusCode = response.status;
            throw new Error("Network response is not ok: " + error + statusCode);
        }

        const data = await response.json();

        const productData = data.product;

        const product = new Product(productData);

        return new Subscription(product, new Date(data.created_at));
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}