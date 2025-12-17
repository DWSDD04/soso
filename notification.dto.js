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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var NotificationDTO_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDTO = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const moment_1 = __importDefault(require("moment"));
let NotificationDTO = NotificationDTO_1 = class NotificationDTO {
    NotificationID;
    AppointmentID;
    message;
    timestamp;
    read;
    constructor(partial) {
        Object.assign(this, partial);
        if (partial?.timestamp) {
            this.timestamp = (0, moment_1.default)(partial.timestamp).format("YYYY-MM-DD HH:mm:ss");
        }
    }
    static fromEntity(notification) {
        return new NotificationDTO_1({
            NotificationID: notification.NotificationID,
            AppointmentID: notification.AppointmentID,
            message: notification.message,
            timestamp: notification.timestamp,
            read: notification.read,
        });
    }
};
exports.NotificationDTO = NotificationDTO;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NotificationDTO.prototype, "NotificationID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NotificationDTO.prototype, "AppointmentID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NotificationDTO.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NotificationDTO.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], NotificationDTO.prototype, "read", void 0);
exports.NotificationDTO = NotificationDTO = NotificationDTO_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], NotificationDTO);
//# sourceMappingURL=notification.dto.js.map