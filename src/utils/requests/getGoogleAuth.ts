import { baseHeader, HttpMethod } from "./baseFetch";

export async function getGoogleAuth(userId: string): Promise<any> {
    try {
        const response = await fetch(import.meta.env.VITE_GOOGLE_AUTH_URL + userId, {
            method: HttpMethod.GET,
            headers: baseHeader,
        });

        if (response.redirected == false) {
            return false;
        }

        const redirectUrl = response.url;

        return redirectUrl;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}