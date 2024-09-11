import { Report } from "../../models/Report";
import { baseHeader, HttpMethod } from "./baseFetch";

export enum ReportType {
    WEIGHT = '0',
    STEPS = '1',
    CCAL = '2',
}

export async function postReports(userId: string, reportType: ReportType, postInfo: any): Promise<Report> {
    try {
        const response = await fetch(
            import.meta.env.VITE_API_URL
            + '/reports/create_report/?report_type='
            + reportType
            + '&telegram_uid='
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

        return new Report(data);
    } catch (error) {
        console.error("Error parsing response:", error);
        throw error;
    }
}