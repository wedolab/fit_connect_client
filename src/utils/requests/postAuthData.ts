import { baseFecth, HttpMethod } from "./baseFetch";

export async function postAuthData(webAppData: any): Promise<void> {
    return baseFecth<void>({
        apiUrl: import.meta.env.VITE_AUTH_URL,
        method: HttpMethod.POST,
        body: webAppData,
        onResponse: (response: Response, resolve: Function) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("Data sent successfully!");
            resolve(response);
        },
        onReject: (error: any) => {
            console.error("Error sending data:", error);
        }
    });
}