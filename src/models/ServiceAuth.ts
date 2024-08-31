class ServiceAuth {
    authGoogle: boolean;
    authFatSecret: boolean;

    constructor(authGoogle: boolean, authFatSecret: boolean) {
        this.authFatSecret = authFatSecret;
        this.authGoogle = authGoogle;
    }
}

export { ServiceAuth }