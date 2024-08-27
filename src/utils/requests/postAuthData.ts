import { baseHeader, HttpMethod } from "./baseFetch";

export async function postAuthData(webAppData: any): Promise<void> {
    try {
        const response = await fetch(import.meta.env.VITE_AUTH_URL,
            {
                method: HttpMethod.POST,
                headers: baseHeader,
                body: JSON.stringify(webAppData),
            }
        );

        if (!response.ok) {
            throw new Error("Network response is not ok");
        }
    } catch (error) {
        console.log(error);

        throw error;
    }
}