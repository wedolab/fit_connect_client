
import { baseHeader, HttpMethod } from "./baseFetch";

export async function getFatSecret(dateBy: String, userId: String): Promise<any> {
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



        const today = new Date();
        const startDate = new Date(1970, 0, 1);

        const arr = data.response.month.day.find((item: { date_int: number; }) => {
            let endDate = new Date(startDate);
            endDate.setDate(item.date_int);

            return today.getTime() === endDate.getTime();
        });


        return arr;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}