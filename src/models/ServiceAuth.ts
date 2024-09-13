export interface ServiceStatus {
    status: boolean;
    url: string;
}

export class ServiceAuth {
    authGoogle: ServiceStatus;
    authFatSecret: ServiceStatus;

    constructor(authGoogle: ServiceStatus, authFatSecret: ServiceStatus) {
        this.authFatSecret = authFatSecret;
        this.authGoogle = authGoogle;
    }
}

export const convertToServiceStatus = (data: any): ServiceStatus => {
    return {
        status: data.status === "ok",
        url: data.url
    };
};