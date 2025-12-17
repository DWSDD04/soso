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
var Notification_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
let Notification = Notification_1 = class Notification {
    NotificationID;
    AppointmentID;
    message;
    timestamp;
    constructor(NotificationID, AppointmentID, message, timestamp) {
        if (NotificationID)
            this.NotificationID = NotificationID;
        if (AppointmentID)
            this.AppointmentID = AppointmentID;
        if (message)
            this.message = message;
        if (timestamp) {
            this.timestamp = (0, moment_1.default)(timestamp).format("YYYY-MM-DD HH:mm:ss");
        }
    }
    static fromRow(row) {
        if (!row)
            return null;
        return new Notification_1(row.NotificationID, row.AppointmentID, row.message, row.timestamp);
    }
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notification.prototype, "NotificationID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Notification.prototype, "AppointmentID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "timestamp", void 0);
exports.Notification = Notification = Notification_1 = __decorate([
    (0, typeorm_1.Entity)('notification'),
    __metadata("design:paramtypes", [Number, Number, String, Object])
], Notification);
//# sourceMappingURL=notification.entity.js.map