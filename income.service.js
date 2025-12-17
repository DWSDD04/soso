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
exports.IncomeService = void 0;
const common_1 = require("@nestjs/common");
const income_repository_1 = require("./repositories/income.repository");
const appointment_repository_1 = require("../appointment/repositories/appointment.repository");
const service_repository_1 = require("../service/repositories/service.repository");
let IncomeService = class IncomeService {
    incomeRepository;
    appointmentRepository;
    serviceRepository;
    constructor(incomeRepository, appointmentRepository, serviceRepository) {
        this.incomeRepository = incomeRepository;
        this.appointmentRepository = appointmentRepository;
        this.serviceRepository = serviceRepository;
    }
    async listIncomes() {
        const incomes = await this.incomeRepository.getIncomes();
        return incomes.map(i => i);
    }
    async getIncomeByID(id) {
        const income = await this.incomeRepository.getIncomeByID(id);
        if (!income)
            throw new common_1.NotFoundException(`Income ${id} not found`);
        return income;
    }
    async getIncomeByAppointmentID(AppointmentID) {
        return this.incomeRepository.getIncomeByAppointmentID(AppointmentID);
    }
    async getIncomeByPrice(price) {
        return this.incomeRepository.getIncomeByPrice(price);
    }
    async getIncomeByDate(date) {
        return this.incomeRepository.getIncomeByDate(date);
    }
    async getIncomesByDateRange(start, end) {
        return this.incomeRepository.getIncomesByDateRange(start, end);
    }
    async createIncome(data) {
        const created = await this.incomeRepository.createIncome(data);
        return created;
    }
    async updateIncomeByID(data) {
        const { IncomeID, ...updateData } = data;
        await this.incomeRepository.updateIncomeByID(IncomeID, updateData);
        const updated = await this.incomeRepository.getIncomeByID(IncomeID);
        if (!updated)
            throw new common_1.NotFoundException(`Income ${IncomeID} not found`);
        return updated;
    }
    async updateIncomeByAppointmentID(AppointmentID, update) {
        await this.incomeRepository.updateIncomeByAppointmentID(AppointmentID, update);
        return true;
    }
    async updateIncomeByDateRange(start, end, update) {
        await this.incomeRepository.updateIncomeByDateRange(start, end, update);
        return true;
    }
    async deleteIncomeByID(id) {
        await this.incomeRepository.deleteIncomeByID(id);
        return true;
    }
    async deleteIncomeByAppointmentID(AppointmentID) {
        await this.incomeRepository.deleteIncomeByAppointmentID(AppointmentID);
        return true;
    }
    async deleteIncomeByDate(date) {
        await this.incomeRepository.deleteIncomeByDate(date);
        return true;
    }
    async deleteIncomesByDateRange(start, end) {
        await this.incomeRepository.deleteIncomesByDateRange(start, end);
        return true;
    }
    async countIncomes() {
        return this.incomeRepository.countIncomes();
    }
    async createIncomeFromAppointment(AppointmentID) {
        const appointment = await this.appointmentRepository.getAppointmentByID(AppointmentID);
        if (!appointment)
            throw new common_1.NotFoundException(`Appointment ${AppointmentID} not found`);
        const service = await this.serviceRepository.getServiceByID(appointment.ServiceID);
        if (!service)
            throw new common_1.NotFoundException(`Service ${appointment.ServiceID} not found`);
        const existing = await this.incomeRepository.getIncomeByAppointmentID(AppointmentID);
        if (existing.length > 0)
            return existing[0];
        const newIncome = await this.incomeRepository.createIncome({
            AppointmentID,
            Price: service.Price,
            Date: new Date().toISOString(),
        });
        return newIncome;
    }
};
exports.IncomeService = IncomeService;
exports.IncomeService = IncomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [income_repository_1.IncomeRepository,
        appointment_repository_1.AppointmentRepository,
        service_repository_1.ServiceRepository])
], IncomeService);
//# sourceMappingURL=income.service.js.map