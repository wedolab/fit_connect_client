export class Client {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    telegram_uid: number;
    role: string;
    created_at: string;

    constructor(data: any) {
        this.id = data.id;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.username = data.username;
        this.telegram_uid = data.telegram_uid;
        this.role = data.role;
        this.created_at = data.created_at;
    }
}
