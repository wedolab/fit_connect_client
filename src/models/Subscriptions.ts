import type { Product } from "./Product";

export class Subscription {
    product: Product;
    createdAt: Date;

    constructor(product: Product, createdAt: Date) {
        this.product = product;
        this.createdAt = createdAt;
    }
}

