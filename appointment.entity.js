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
var Appointment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
let Appointment = Appointment_1 = class Appointment {
    AppointmentID;
    Name;
    ServiceID;
    Status;
    ScheduledTime;
    constructor(AppointmentID, Name, ServiceID, Status, ScheduledTime) {
        if (AppointmentID)
            this.AppointmentID = AppointmentID;
        if (Name)
            this.Name = Name;
        if (ServiceID)
            this.ServiceID = ServiceID;
        if (Status)
            this.Status = Status;
        if (ScheduledTime)
            this.ScheduledTime = ScheduledTime;
    }
    static fromRow(row) {
        if (!row)
            return null;
        return new Appointment_1(row.AppointmentID, row.Name, row.ServiceID, row.Status, row.ScheduledTime);
    }
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointment.prototype, "AppointmentID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Appointment.prototype, "ServiceID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Object)
], Appointment.prototype, "ScheduledTime", void 0);
exports.Appointment = Appointment = Appointment_1 = __decorate([
    (0, typeorm_1.Entity)('appointments'),
    __metadata("design:paramtypes", [Number, String, Number, String, Date])
], Appointment);
//# sourceMappingURL=appointment.entity.js.map