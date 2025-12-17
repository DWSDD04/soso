"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDTO = void 0;
const class_validator_1 = require("class-validator");
class ProductDTO {
    ProductID;
    Type;
    Name;
    Description;
    Brand;
    CostPrice;
    quantity;
    Available;
    constructor(partial) {
        Object.assign(this, partial);
    }
    static fromEntity(product) {
        if (!product)
            throw new Error('Product is null');
        return new ProductDTO({
            ProductID: product.ProductID,
            Type: product.Type,
            Name: product.Name,
            Description: product.Description,
            Brand: product.Brand,
            CostPrice: product.CostPrice,
            quantity: product.quantity,
            Available: product.Available,
        });
    }
}
exports.ProductDTO = ProductDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductDTO.prototype, "ProductID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "Type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "Name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "Description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "Brand", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductDTO.prototype, "CostPrice", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductDTO.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ProductDTO.prototype, "Available", void 0);
//# sourceMappingURL=product.dto.js.map