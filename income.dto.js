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
var IncomeDTO_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeDTO = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let IncomeDTO = IncomeDTO_1 = class IncomeDTO {
    IncomeID;
    AppointmentID;
    Price;
    Date;
    constructor(partial) {
        Object.assign(this, partial);
    }
    static fromEntity(income) {
        if (!income)
            throw new Error('Income is null');
        return new IncomeDTO_1({
            IncomeID: income.IncomeID,
            AppointmentID: income.AppointmentID,
            Price: income.Price,
            Date: income.Date,
        });
    }
    static fromRow(row) {
        return new IncomeDTO_1({
            IncomeID: row.IncomeID,
            AppointmentID: row.AppointmentID,
            Price: row.Price,
            Date: row.Date,
        });
    }
};
exports.IncomeDTO = IncomeDTO;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], IncomeDTO.prototype, "IncomeID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], IncomeDTO.prototype, "AppointmentID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], IncomeDTO.prototype, "Price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], IncomeDTO.prototype, "Date", void 0);
exports.IncomeDTO = IncomeDTO = IncomeDTO_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], IncomeDTO);
//# sourceMappingURL=income.dto.js.map