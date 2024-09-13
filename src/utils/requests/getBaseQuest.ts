
import { baseHeader, HttpMethod } from "./baseFetch";


export async function getBaseQuest(userId: string): Promise<boolean> {
    try {
        const response = await fetch(
            import.meta.env.VITE_API_URL
            + '/clients/get_general_questionnaire/?telegram_uid='
            + userId,
            {
                method: HttpMethod.GET,
                headers: baseHeader,
            });
        if (!response.ok) {
            const error = response.statusText;
            const statusCode = response.status;

            if (statusCode == 404) {
                return false
            }

            throw new Error("Network response is not ok: " + error + statusCode);
        }

        return true;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}