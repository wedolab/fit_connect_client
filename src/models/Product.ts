class Product {
    id: number;
    name: string;
    isPrivate: boolean;
    createdAt: Date;

    constructor(id: number, name: string, isPrivate: boolean, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.isPrivate = isPrivate;
        this.createdAt = createdAt;
    }
}

export { Product }