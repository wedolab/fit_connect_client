export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

export const baseHeader = {
    "Content-Type": "application/json",
    "Authorization": `Token ${import.meta.env.VITE_API_TOKEN}`,
}