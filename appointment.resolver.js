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
exports.AppointmentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("./appointment.service");
const appointment_dto_1 = require("./dto/appointment.dto");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const update_appointment_dto_1 = require("./dto/update-appointment.dto");
let AppointmentResolver = class AppointmentResolver {
    appointmentService;
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    async listAppointments() {
        return this.appointmentService.listAppointments();
    }
    async getAppointmentByID(id) {
        const appointment = await this.appointmentService.getAppointmentByID(id);
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
    async getAppointmentsByService(serviceID) {
        return this.appointmentService.getAppointmentsByService(serviceID);
    }
    async getAppointmentsByStatus(status) {
        return this.appointmentService.getAppointmentsByStatus(status);
    }
    async getUpcomingAppointments() {
        return this.appointmentService.getUpcomingAppointments();
    }
    async getAppointmentsByDateRange(startDate, endDate) {
        return this.appointmentService.getAppointmentsByDateRange(startDate, endDate);
    }
    async createAppointment(data) {
        const created = await this.appointmentService.createAppointment(data);
        if (!created)
            throw new common_1.NotFoundException('Failed to create appointment');
        return created;
    }
    async updateAppointmentByID(id, data) {
        const updated = await this.appointmentService.updateAppointmentByID(id, data);
        if (!updated)
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        return updated;
    }
    async deleteAppointmentByID(id) {
        return this.appointmentService.deleteAppointmentByID(id);
    }
};
exports.AppointmentResolver = AppointmentResolver;
__decorate([
    (0, graphql_1.Query)(() => [appointment_dto_1.AppointmentDTO], { name: 'appointments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "listAppointments", null);
__decorate([
    (0, graphql_1.Query)(() => appointment_dto_1.AppointmentDTO, { name: 'appointment', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "getAppointmentByID", null);
__decorate([
    (0, graphql_1.Query)(() => [appointment_dto_1.AppointmentDTO], { name: 'appointmentsByService', nullable: 'itemsAndList' }),
    __param(0, (0, graphql_1.Args)('serviceID', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "getAppointmentsByService", null);
__decorate([
    (0, graphql_1.Query)(() => [appointment_dto_1.AppointmentDTO], { name: 'appointmentsByStatus', nullable: 'itemsAndList' }),
    __param(0, (0, graphql_1.Args)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "getAppointmentsByStatus", null);
__decorate([
    (0, graphql_1.Query)(() => [appointment_dto_1.AppointmentDTO], { name: 'upcomingAppointments', nullable: 'itemsAndList' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "getUpcomingAppointments", null);
__decorate([
    (0, graphql_1.Query)(() => [appointment_dto_1.AppointmentDTO], { name: 'appointmentsByDateRange', nullable: 'itemsAndList' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "getAppointmentsByDateRange", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_dto_1.AppointmentDTO, { name: 'createAppointment' }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_dto_1.CreateAppointmentDTO]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "createAppointment", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_dto_1.AppointmentDTO, { name: 'updateAppointmentByID' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_appointment_dto_1.UpdateAppointmentDTO]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "updateAppointmentByID", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteAppointmentByID' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "deleteAppointmentByID", null);
exports.AppointmentResolver = AppointmentResolver = __decorate([
    (0, graphql_1.Resolver)(() => appointment_dto_1.AppointmentDTO),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentResolver);
//# sourceMappingURL=appointment.resolver.js.map