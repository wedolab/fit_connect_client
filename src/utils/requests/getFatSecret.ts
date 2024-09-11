
import { baseHeader, HttpMethod } from "./baseFetch";

export async function getFatSecret(dateBy: String, userId: String): Promise<Array<any>> {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL
            + "/fatsecret_int/fs_get_dairy_month/?dairy_date="
            + dateBy
            + "&telegram_uid="
            + userId, {
            method: HttpMethod.GET,
            headers: baseHeader,
        });
        if (!response.ok) {
            const error = response.statusText;
            const statusCode = response.status;
            throw new Error("Network response is not ok: " + error + statusCode);
        }

        const data = await response.json();

        const arr = Object.entries(data).map(([key, value]) => ({ key, value }));

        return arr;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}