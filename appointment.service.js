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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const appointment_repository_1 = require("./repositories/appointment.repository");
const service_repository_1 = require("../service/repositories/service.repository");
const income_repository_1 = require("../income/repositories/income.repository");
const appointment_dto_1 = require("./dto/appointment.dto");
let AppointmentService = class AppointmentService {
    appointmentRepository;
    serviceRepository;
    incomeRepository;
    constructor(appointmentRepository, serviceRepository, incomeRepository) {
        this.appointmentRepository = appointmentRepository;
        this.serviceRepository = serviceRepository;
        this.incomeRepository = incomeRepository;
    }
    async getAppointmentByID(id) {
        const appointment = await this.appointmentRepository.getAppointmentByID(id);
        if (!appointment)
            throw new common_1.NotFoundException(`Appointment ${id} not found`);
        return appointment_dto_1.AppointmentDTO.fromEntity(appointment);
    }
    async listAppointments() {
        const appointments = await this.appointmentRepository.getAllAppointments();
        return appointments.map(a => appointment_dto_1.AppointmentDTO.fromEntity(a));
    }
    async getAppointmentsByService(serviceID) {
        const appointments = await this.appointmentRepository.getAppointmentsByService(serviceID);
        return appointments.map(a => appointment_dto_1.AppointmentDTO.fromEntity(a));
    }
    async getAppointmentsByStatus(status) {
        const appointments = await this.appointmentRepository.getAppointmentsByStatus(status);
        return appointments.map(a => appointment_dto_1.AppointmentDTO.fromEntity(a));
    }
    async getUpcomingAppointments() {
        const appointments = await this.appointmentRepository.getUpcomingAppointments();
        return appointments.map(a => appointment_dto_1.AppointmentDTO.fromEntity(a));
    }
    async getAppointmentsByDateRange(start, end) {
        const appointments = await this.appointmentRepository.getAppointmentsByDateRange(start, end);
        return appointments.map(a => appointment_dto_1.AppointmentDTO.fromEntity(a));
    }
    async createAppointment(data) {
        const created = await this.appointmentRepository.createAppointment(data);
        return appointment_dto_1.AppointmentDTO.fromEntity(created);
    }
    async updateAppointmentByID(id, data) {
        const existing = await this.appointmentRepository.getAppointmentByID(id);
        if (!existing)
            throw new common_1.NotFoundException(`Appointment ${id} not found`);
        const wasCompleted = existing.Status?.toLowerCase() === 'completed';
        const newStatus = data.Status ? data.Status.toLowerCase() : null;
        await this.appointmentRepository.updateAppointmentByID(id, data);
        const updated = await this.appointmentRepository.getAppointmentByID(id);
        if (!updated)
            throw new common_1.NotFoundException(`Appointment ${id} not found after update`);
        if (!wasCompleted && newStatus === 'completed') {
            const service = await this.serviceRepository.getServiceByID(updated.ServiceID);
            if (service && service.Price != null) {
                const existingIncome = await this.incomeRepository.getIncomeByAppointmentID(id);
                if (!existingIncome || existingIncome.length === 0) {
                    await this.incomeRepository.createIncome({
                        AppointmentID: id,
                        Price: service.Price,
                        Date: new Date().toISOString(),
                    });
                }
            }
        }
        return appointment_dto_1.AppointmentDTO.fromEntity(updated);
    }
    async deleteAppointmentByID(id) {
        await this.appointmentRepository.deleteAppointmentByID(id);
        return true;
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [appointment_repository_1.AppointmentRepository,
        service_repository_1.ServiceRepository,
        income_repository_1.IncomeRepository])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map