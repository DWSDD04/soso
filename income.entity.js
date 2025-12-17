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
var Income_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Income = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let Income = Income_1 = class Income {
    IncomeID;
    AppointmentID;
    Price;
    Date;
    constructor(IncomeID, AppointmentID, Price, Date) {
        if (IncomeID)
            this.IncomeID = IncomeID;
        if (AppointmentID)
            this.AppointmentID = AppointmentID;
        if (Price)
            this.Price = Price;
        if (Date)
            this.Date = Date;
    }
    static fromRow(row) {
        if (!row)
            return null;
        return new Income_1(row.IncomeID, row.AppointmentID, row.Price, row.Date);
    }
};
exports.Income = Income;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Income.prototype, "IncomeID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Income.prototype, "AppointmentID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Income.prototype, "Price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Income.prototype, "Date", void 0);
exports.Income = Income = Income_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('income'),
    __metadata("design:paramtypes", [Number, Number, Number, String])
], Income);
//# sourceMappingURL=income.entity.js.map