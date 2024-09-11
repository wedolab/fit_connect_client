export class Product {
    id: number;
    name: string;
    isGeneral: boolean;
    isActive: boolean;
    isPrivate: boolean;
    created_at: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.isGeneral = data.is_general;
        this.isActive = data.is_active;
        this.isPrivate = data.is_private;
        this.created_at = data.created_at;
    }
}