
import { baseHeader, HttpMethod } from "./baseFetch";

export async function getGoogleFit(userId: string): Promise<Array<any>> {
    try {
        const response = await fetch(import.meta.env.VITE_GET_GOOGLE_FIT_URL + userId, {
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