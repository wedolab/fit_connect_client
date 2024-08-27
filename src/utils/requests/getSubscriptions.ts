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
            const error = response.statusText;
            throw new Error("Network response is not ok: " + error);
        }

        const data = response.json();
        if (Array.isArray(data)) {
            const subscriptions = data.map((json) => {
                const productData = json.product;
                const product = new Product(productData.id, productData.name, productData.is_private, new Date(productData.created_at))

                return new Subscription(product, new Date(json.created_at));
            });
            return subscriptions;
        } else {
            throw new Error("Data is not array");
        }


    } catch (error) {
        console.log("Something goes wrong: " + error)
        throw error;
    }
}

