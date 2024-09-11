import { baseHeader, HttpMethod } from "./baseFetch";

export async function getFSAuth(userId: string): Promise<any> {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL
            + '/fatsecret_int/fs_get_auth_url/?telegram_uid='
            + userId, {
            method: HttpMethod.GET,
            headers: baseHeader,
        });

        const data = await response.json();

        const redirectUrl: null | String = data['response'];

        return redirectUrl;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}