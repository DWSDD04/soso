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
exports.AppointmentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const appointment_entity_1 = require("../entities/appointment.entity");
let AppointmentRepository = class AppointmentRepository {
    dataSource;
    repo;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repo = this.dataSource.getRepository(appointment_entity_1.Appointment);
    }
    async createAppointment(dto) {
        const entity = this.repo.create({
            Name: dto.Name,
            ServiceID: dto.ServiceID,
            Status: dto.Status,
            ScheduledTime: dto.ScheduledTime ? new Date(dto.ScheduledTime) : undefined,
        });
        return this.repo.save(entity);
    }
    async getAppointmentByID(AppointmentID) {
        return this.repo.findOneBy({ AppointmentID });
    }
    async getAllAppointments() {
        return this.repo.find();
    }
    async getAppointmentsByService(ServiceID) {
        return this.repo.findBy({ ServiceID });
    }
    async getAppointmentsByStatus(Status) {
        return this.repo.findBy({ Status });
    }
    async getUpcomingAppointments() {
        return this.repo
            .createQueryBuilder('appointment')
            .where('appointment.ScheduledTime >= :now', { now: new Date() })
            .andWhere('appointment.Status != :completed', { completed: 'Completed' })
            .orderBy('appointment.ScheduledTime', 'ASC')
            .getMany();
    }
    async getAppointmentsByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.repo
            .createQueryBuilder('appointment')
            .where('appointment.ScheduledTime BETWEEN :start AND :end', { start, end })
            .orderBy('appointment.ScheduledTime', 'ASC')
            .getMany();
    }
    async updateAppointmentByID(AppointmentID, updateData) {
        const payload = {};
        if (updateData.Name !== undefined)
            payload.Name = updateData.Name;
        if (updateData.ServiceID !== undefined)
            payload.ServiceID = updateData.ServiceID;
        if (updateData.Status !== undefined)
            payload.Status = updateData.Status;
        if (updateData.ScheduledTime !== undefined) {
            if (updateData.ScheduledTime === null) {
                payload.ScheduledTime = null;
            }
            else {
                payload.ScheduledTime = updateData.ScheduledTime;
            }
        }
        await this.repo.update({ AppointmentID }, payload);
    }
    async deleteAppointmentByID(AppointmentID) {
        await this.repo.delete({ AppointmentID });
    }
    async countAppointments() {
        return this.repo.count();
    }
};
exports.AppointmentRepository = AppointmentRepository;
exports.AppointmentRepository = AppointmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AppointmentRepository);
//# sourceMappingURL=appointment.repository.js.map