export class ServiceLoginProcess {
    isGoogleProcess: boolean;
    isFatSecretProcess: boolean;

    constructor(isGoogleProcess: boolean, isFatSecretProcess: boolean) {
        this.isFatSecretProcess = isFatSecretProcess;
        this.isGoogleProcess = isGoogleProcess;
    }
}
