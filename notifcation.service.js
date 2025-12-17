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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const notification_repository_1 = require("./repositories/notification.repository");
let NotificationService = class NotificationService {
    notificationRepository;
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async listNotifications() {
        return this.notificationRepository.getNotifications();
    }
    async getNotificationByID(id) {
        const notification = await this.notificationRepository.getNotificationByID(id);
        if (!notification)
            throw new common_1.NotFoundException(`Notification ${id} not found`);
        return notification;
    }
    async getNotificationsByAppointmentID(appointmentID) {
        return this.notificationRepository.getNotificationsByAppointmentID(appointmentID);
    }
    async getNotificationsByDateRange(start, end) {
        return this.notificationRepository.getNotificationsByDateRange(start, end);
    }
    async createNotification(data) {
        return this.notificationRepository.createNotification(data);
    }
    async updateNotificationByID(data) {
        const { NotificationID, ...updateData } = data;
        const affected = await this.notificationRepository.updateNotificationByID(NotificationID, updateData);
        if (!affected)
            throw new common_1.NotFoundException(`Notification ${NotificationID} not found`);
        const updated = await this.notificationRepository.getNotificationByID(NotificationID);
        if (!updated)
            throw new common_1.NotFoundException(`Notification ${NotificationID} not found after update`);
        return updated;
    }
    async updateNotificationsByAppointmentID(appointmentID, update) {
        await this.notificationRepository.updateNotificationsByAppointmentID(appointmentID, update);
        return true;
    }
    async updateNotificationsByDateRange(start, end, update) {
        await this.notificationRepository.updateNotificationsByDateRange(start, end, update);
        return true;
    }
    async deleteNotificationByID(id) {
        const affected = await this.notificationRepository.deleteNotificationByID(id);
        if (!affected)
            return false;
        return true;
    }
    async deleteNotificationsByAppointmentID(appointmentID) {
        const affected = await this.notificationRepository.deleteNotificationsByAppointmentID(appointmentID);
        return affected > 0;
    }
    async deleteNotificationsByDateRange(start, end) {
        const affected = await this.notificationRepository.deleteNotificationsByDateRange(start, end);
        return affected > 0;
    }
    async countNotifications() {
        return this.notificationRepository.countNotifications();
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_repository_1.NotificationRepository])
], NotificationService);
//# sourceMappingURL=notifcation.service.js.map