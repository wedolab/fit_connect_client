import { ServiceAuth } from "../../models/ServiceAuth";
import { baseHeader, HttpMethod } from "./baseFetch";


export async function getServiceAuth(userId: string): Promise<ServiceAuth> {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/clients/int_service_auth/?telegram_uid=" + userId, {
            method: HttpMethod.GET,
            headers: baseHeader,
        });
        if (!response.ok) {
            const error = response.statusText;
            const statusCode = response.status;
            throw new Error("Network response is not ok: " + error + statusCode);
        }

        const data = await response.json();

        console.log('Auth data: ' + JSON.stringify(data));

        const status = new ServiceAuth(data.auth_google, data.auth_fatsecret);

        return status;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}