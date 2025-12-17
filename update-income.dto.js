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
exports.UpdateIncomeDTO = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_income_dto_1 = require("./create-income.dto");
const class_validator_1 = require("class-validator");
let UpdateIncomeDTO = class UpdateIncomeDTO extends (0, graphql_1.PartialType)(create_income_dto_1.CreateIncomeDTO) {
    IncomeID;
};
exports.UpdateIncomeDTO = UpdateIncomeDTO;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateIncomeDTO.prototype, "IncomeID", void 0);
exports.UpdateIncomeDTO = UpdateIncomeDTO = __decorate([
    (0, graphql_1.InputType)()
], UpdateIncomeDTO);
//# sourceMappingURL=update-income.dto.js.map