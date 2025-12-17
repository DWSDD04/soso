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
var AppointmentDTO_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentDTO = void 0;
const graphql_1 = require("@nestjs/graphql");
let AppointmentDTO = AppointmentDTO_1 = class AppointmentDTO {
    AppointmentID;
    Name;
    ServiceID;
    Status;
    ScheduledTime;
    constructor(partial) {
        Object.assign(this, partial);
    }
    static safeToDate(value) {
        if (value === null || value === undefined || value === '')
            return null;
        if (value instanceof Date) {
            return isNaN(value.getTime()) ? null : value;
        }
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d;
    }
    static fromEntity(appointment) {
        if (!appointment)
            throw new Error('Appointment is null');
        return new AppointmentDTO_1({
            AppointmentID: appointment.AppointmentID ?? undefined,
            Name: appointment.Name ?? null,
            ServiceID: appointment.ServiceID ?? undefined,
            Status: appointment.Status ?? null,
            ScheduledTime: AppointmentDTO_1.safeToDate(appointment.ScheduledTime),
        });
    }
};
exports.AppointmentDTO = AppointmentDTO;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], AppointmentDTO.prototype, "AppointmentID", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AppointmentDTO.prototype, "Name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], AppointmentDTO.prototype, "ServiceID", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AppointmentDTO.prototype, "Status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
    __metadata("design:type", Object)
], AppointmentDTO.prototype, "ScheduledTime", void 0);
exports.AppointmentDTO = AppointmentDTO = AppointmentDTO_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], AppointmentDTO);
//# sourceMappingURL=appointment.dto.js.map