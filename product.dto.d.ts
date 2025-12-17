import { Product } from '../entities/product.entity';
export declare class ProductDTO {
    ProductID?: number;
    Type: string;
    Name: string;
    Description?: string;
    Brand: string;
    CostPrice: number;
    quantity: number;
    Available: boolean;
    constructor(partial: Partial<ProductDTO>);
    static fromEntity(product: Product | null): ProductDTO;
}
