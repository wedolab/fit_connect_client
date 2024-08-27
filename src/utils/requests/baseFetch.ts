export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export async function baseFecth<T>(params: { apiUrl: RequestInfo | URL, method: HttpMethod, body?: any, onResponse: Function, onReject: Function, }) {
    return new Promise<T>((resovle, reject) => {
        fetch(params.apiUrl, {
            method: params.method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${import.meta.env.VITE_API_TOKEN}`,
            },
            body: params?.body != null || undefined ? JSON.stringify(params.body) : null, 
        }).then(response => {
            params.onResponse(response, resovle);
        }).catch(error => {
            params.onReject(error);
            throw error;
        })
    })
}