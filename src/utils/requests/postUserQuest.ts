import { baseHeader, HttpMethod } from "./baseFetch";

export async function postUserQuest(userId: string, postInfo: any): Promise<any> {
    try {
        const response = await fetch(
            import.meta.env.VITE_API_URL
            + '/clients/create_general_questionnaire/?telegram_uid='
            + userId,
            {
                method: HttpMethod.POST,
                headers: baseHeader,
                body: postInfo,
            });
        if (!response.ok) {
            const error = response.statusText;
            const statusCode = response.status;
            throw new Error("Network response is not ok: " + error + statusCode);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}