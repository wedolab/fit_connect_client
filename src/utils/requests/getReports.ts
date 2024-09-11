import { Report } from "../../models/Report";
import { baseHeader, HttpMethod } from "./baseFetch";


export async function getReports(userId: string): Promise<Report[]> {
    try {
        const response = await fetch(
            import.meta.env.VITE_API_URL
            + '/reports/get_reports/?telegram_uid='
            + userId,
            {
                method: HttpMethod.GET,
                headers: baseHeader,
            });
        if (!response.ok) {
            const error = response.statusText;
            const statusCode = response.status;
            throw new Error("Network response is not ok: " + error + statusCode);
        }

        const data = await response.json();

        const reports = data.map((report: any) => new Report(report));

        return reports;
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}