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
exports.IncomeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const income_entity_1 = require("../entities/income.entity");
let IncomeRepository = class IncomeRepository {
    dataSource;
    repo;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repo = this.dataSource.getRepository(income_entity_1.Income);
    }
    async createIncome(incomeDto) {
        const income = this.repo.create(incomeDto);
        return this.repo.save(income);
    }
    async getIncomeByID(IncomeID) {
        return this.repo.findOneBy({ IncomeID });
    }
    async getIncomes() {
        return this.repo.find();
    }
    async getIncomeByAppointmentID(AppointmentID) {
        return this.repo.findBy({ AppointmentID });
    }
    async getIncomeByPrice(Price) {
        return this.repo.findBy({ Price });
    }
    async getIncomeByDate(Date) {
        return this.repo.findBy({ Date });
    }
    async getIncomesByDateRange(startDate, endDate) {
        return this.repo
            .createQueryBuilder('income')
            .where('income.Date BETWEEN :start AND :end', { start: startDate, end: endDate })
            .orderBy('income.Date', 'ASC')
            .getMany();
    }
    async updateIncomeByID(IncomeID, updateData) {
        await this.repo.update({ IncomeID }, updateData);
    }
    async updateIncomeByAppointmentID(AppointmentID, updateData) {
        await this.repo.update({ AppointmentID }, updateData);
    }
    async updateIncomeByDateRange(startDate, endDate, updateData) {
        await this.repo
            .createQueryBuilder()
            .update(income_entity_1.Income)
            .set(updateData)
            .where('Date BETWEEN :start AND :end', { start: startDate, end: endDate })
            .execute();
    }
    async deleteIncomeByID(IncomeID) {
        await this.repo.delete({ IncomeID });
    }
    async deleteIncomeByAppointmentID(AppointmentID) {
        await this.repo.delete({ AppointmentID });
    }
    async deleteIncomeByDate(Date) {
        await this.repo.delete({ Date });
    }
    async deleteIncomesByDateRange(startDate, endDate) {
        await this.repo
            .createQueryBuilder()
            .delete()
            .from(income_entity_1.Income)
            .where('Date BETWEEN :start AND :end', { start: startDate, end: endDate })
            .execute();
    }
    async countIncomes() {
        return this.repo.count();
    }
};
exports.IncomeRepository = IncomeRepository;
exports.IncomeRepository = IncomeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], IncomeRepository);
//# sourceMappingURL=income.repository.js.map