import { Client } from "./Client";
import { Product } from "./Product";

export class Report {
    id: number;
    client: Client;
    product: Product;
    reportType: number;
    value: any;
    isActive: boolean;
    created_at: string;

    constructor(data: any) {
        this.id = data.id;
        this.client = new Client(data.client);
        this.product = new Product(data.product);
        this.reportType = data.report_type;
        this.value = data.value;
        this.isActive = data.is_active;
        this.created_at = data.created_at;
    }
}

