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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const income_service_1 = require("./income.service");
const income_dto_1 = require("./dto/income.dto");
const create_income_dto_1 = require("./dto//create-income.dto");
const update_income_dto_1 = require("./dto/update-income.dto");
let IncomeResolver = class IncomeResolver {
    incomeService;
    constructor(incomeService) {
        this.incomeService = incomeService;
    }
    async listIncomes() {
        return this.incomeService.listIncomes();
    }
    async getIncomeByID(id) {
        const income = await this.incomeService.getIncomeByID(id);
        if (!income) {
            throw new common_1.NotFoundException(`Income with ID ${id} not found`);
        }
        return income;
    }
    async getIncomeByAppointmentID(appointmentID) {
        return this.incomeService.getIncomeByAppointmentID(appointmentID);
    }
    async getIncomeByDate(date) {
        return this.incomeService.getIncomeByDate(date);
    }
    async getIncomesByDateRange(startDate, endDate) {
        return this.incomeService.getIncomesByDateRange(startDate, endDate);
    }
    async countIncomes() {
        return this.incomeService.countIncomes();
    }
    async createIncome(data) {
        const created = await this.incomeService.createIncome(data);
        return created;
    }
    async createIncomeFromAppointment(appointmentID) {
        const income = await this.incomeService.createIncomeFromAppointment(appointmentID);
        if (!income) {
            throw new common_1.NotFoundException(`Could not create income for appointment ${appointmentID}`);
        }
        return income;
    }
    async updateIncomeByID(data) {
        const updated = await this.incomeService.updateIncomeByID(data);
        if (!updated) {
            throw new common_1.NotFoundException(`Income with ID ${data.IncomeID} not found`);
        }
        return updated;
    }
    async updateIncomeByAppointmentID(appointmentID, data) {
        await this.incomeService.updateIncomeByAppointmentID(appointmentID, data);
        return true;
    }
    async updateIncomeByDateRange(startDate, endDate, data) {
        await this.incomeService.updateIncomeByDateRange(startDate, endDate, data);
        return true;
    }
    async deleteIncomeByID(id) {
        await this.incomeService.deleteIncomeByID(id);
        return true;
    }
    async deleteIncomeByAppointmentID(appointmentID) {
        await this.incomeService.deleteIncomeByAppointmentID(appointmentID);
        return true;
    }
    async deleteIncomeByDate(date) {
        await this.incomeService.deleteIncomeByDate(date);
        return true;
    }
    async deleteIncomesByDateRange(startDate, endDate) {
        await this.incomeService.deleteIncomesByDateRange(startDate, endDate);
        return true;
    }
};
exports.IncomeResolver = IncomeResolver;
__decorate([
    (0, graphql_1.Query)(() => [income_dto_1.IncomeDTO], { name: 'incomes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "listIncomes", null);
__decorate([
    (0, graphql_1.Query)(() => income_dto_1.IncomeDTO, { name: 'income', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "getIncomeByID", null);
__decorate([
    (0, graphql_1.Query)(() => [income_dto_1.IncomeDTO], { name: 'incomesByAppointment', nullable: 'itemsAndList' }),
    __param(0, (0, graphql_1.Args)('appointmentID', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "getIncomeByAppointmentID", null);
__decorate([
    (0, graphql_1.Query)(() => [income_dto_1.IncomeDTO], { name: 'incomesByDate', nullable: 'itemsAndList' }),
    __param(0, (0, graphql_1.Args)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "getIncomeByDate", null);
__decorate([
    (0, graphql_1.Query)(() => [income_dto_1.IncomeDTO], { name: 'incomesByDateRange', nullable: 'itemsAndList' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "getIncomesByDateRange", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int, { name: 'countIncomes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "countIncomes", null);
__decorate([
    (0, graphql_1.Mutation)(() => income_dto_1.IncomeDTO, { name: 'createIncome' }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_income_dto_1.CreateIncomeDTO]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "createIncome", null);
__decorate([
    (0, graphql_1.Mutation)(() => income_dto_1.IncomeDTO, { name: 'createIncomeFromAppointment', nullable: true }),
    __param(0, (0, graphql_1.Args)('appointmentID', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "createIncomeFromAppointment", null);
__decorate([
    (0, graphql_1.Mutation)(() => income_dto_1.IncomeDTO, { name: 'updateIncomeByID' }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_income_dto_1.UpdateIncomeDTO]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "updateIncomeByID", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updateIncomeByAppointmentID' }),
    __param(0, (0, graphql_1.Args)('appointmentID', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_income_dto_1.CreateIncomeDTO]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "updateIncomeByAppointmentID", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updateIncomeByDateRange' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __param(2, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_income_dto_1.CreateIncomeDTO]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "updateIncomeByDateRange", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteIncomeByID' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "deleteIncomeByID", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteIncomeByAppointmentID' }),
    __param(0, (0, graphql_1.Args)('appointmentID', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "deleteIncomeByAppointmentID", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteIncomeByDate' }),
    __param(0, (0, graphql_1.Args)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "deleteIncomeByDate", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteIncomesByDateRange' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IncomeResolver.prototype, "deleteIncomesByDateRange", null);
exports.IncomeResolver = IncomeResolver = __decorate([
    (0, graphql_1.Resolver)(() => income_dto_1.IncomeDTO),
    __metadata("design:paramtypes", [income_service_1.IncomeService])
], IncomeResolver);
//# sourceMappingURL=income.resolver.js.map