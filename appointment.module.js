"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const appointment_repository_1 = require("./repositories/appointment.repository");
const appointment_service_1 = require("./appointment.service");
const appointment_resolver_1 = require("./appointment.resolver");
const service_module_1 = require("../service/service.module");
const income_module_1 = require("../income/income.module");
let AppointmentModule = class AppointmentModule {
};
exports.AppointmentModule = AppointmentModule;
exports.AppointmentModule = AppointmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([appointment_entity_1.Appointment]),
            (0, common_1.forwardRef)(() => service_module_1.ServiceModule),
            (0, common_1.forwardRef)(() => income_module_1.IncomeModule),
        ],
        providers: [appointment_service_1.AppointmentService, appointment_repository_1.AppointmentRepository, appointment_resolver_1.AppointmentResolver],
        exports: [appointment_service_1.AppointmentService, appointment_repository_1.AppointmentRepository],
    })
], AppointmentModule);
//# sourceMappingURL=appointment.module.js.map