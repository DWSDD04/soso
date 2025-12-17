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
exports.NotificationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const notifcation_service_1 = require("./notifcation.service");
const notification_dto_1 = require("./dto/notification.dto");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const update_notification_dto_1 = require("./dto/update-notification.dto");
let NotificationResolver = class NotificationResolver {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async listNotifications() {
        return this.notificationService.listNotifications();
    }
    async getNotificationByID(id) {
        const notification = await this.notificationService.getNotificationByID(id);
        if (!notification) {
            throw new common_1.NotFoundException(`Notification with ID ${id} not found`);
        }
        return notification;
    }
    async getNotificationsByAppointmentID(appointmentID) {
        return this.notificationService.getNotificationsByAppointmentID(appointmentID);
    }
    async getNotificationsByDateRange(startDate, endDate) {
        return this.notificationService.getNotificationsByDateRange(startDate, endDate);
    }
    async countNotifications() {
        return this.notificationService.countNotifications();
    }
    async createNotification(data) {
        return this.notificationService.createNotification(data);
    }
    async updateNotificationByID(data) {
        const updated = await this.notificationService.updateNotificationByID(data);
        if (!updated) {
            throw new common_1.NotFoundException(`Notification with ID ${data.NotificationID} not found`);
        }
        return updated;
    }
    async updateNotificationsByAppointmentID(appointmentID, data) {
        await this.notificationService.updateNotificationsByAppointmentID(appointmentID, data);
        return true;
    }
    async updateNotificationsByDateRange(startDate, endDate, data) {
        await this.notificationService.updateNotificationsByDateRange(startDate, endDate, data);
        return true;
    }
    async deleteNotificationByID(id) {
        const ok = await this.notificationService.deleteNotificationByID(id);
        if (!ok)
            throw new common_1.NotFoundException(`Notification with ID ${id} not found`);
        return true;
    }
    async deleteNotificationsByAppointmentID(appointmentID) {
        const ok = await this.notificationService.deleteNotificationsByAppointmentID(appointmentID);
        if (!ok)
            throw new common_1.NotFoundException(`No notifications found for appointment ${appointmentID}`);
        return true;
    }
    async deleteNotificationsByDateRange(startDate, endDate) {
        await this.notificationService.deleteNotificationsByDateRange(startDate, endDate);
        return true;
    }
};
exports.NotificationResolver = NotificationResolver;
__decorate([
    (0, graphql_1.Query)(() => [notification_dto_1.NotificationDTO], { name: 'notifications' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "listNotifications", null);
__decorate([
    (0, graphql_1.Query)(() => notification_dto_1.NotificationDTO, { name: 'notification', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "getNotificationByID", null);
__decorate([
    (0, graphql_1.Query)(() => [notification_dto_1.NotificationDTO], { name: 'notificationsByAppointment', nullable: 'itemsAndList' }),
    __param(0, (0, graphql_1.Args)('appointmentID', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "getNotificationsByAppointmentID", null);
__decorate([
    (0, graphql_1.Query)(() => [notification_dto_1.NotificationDTO], { name: 'notificationsByDateRange', nullable: 'itemsAndList' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "getNotificationsByDateRange", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int, { name: 'countNotifications' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "countNotifications", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_dto_1.NotificationDTO, { name: 'createNotification' }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.CreateNotificationDTO]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "createNotification", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_dto_1.NotificationDTO, { name: 'updateNotificationByID' }),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_notification_dto_1.UpdateNotificationDTO]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "updateNotificationByID", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updateNotificationsByAppointmentID' }),
    __param(0, (0, graphql_1.Args)('appointmentID', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_notification_dto_1.CreateNotificationDTO]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "updateNotificationsByAppointmentID", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updateNotificationsByDateRange' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __param(2, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_notification_dto_1.CreateNotificationDTO]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "updateNotificationsByDateRange", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteNotificationByID' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "deleteNotificationByID", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteNotificationsByAppointmentID' }),
    __param(0, (0, graphql_1.Args)('appointmentID', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "deleteNotificationsByAppointmentID", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteNotificationsByDateRange' }),
    __param(0, (0, graphql_1.Args)('startDate')),
    __param(1, (0, graphql_1.Args)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationResolver.prototype, "deleteNotificationsByDateRange", null);
exports.NotificationResolver = NotificationResolver = __decorate([
    (0, graphql_1.Resolver)(() => notification_dto_1.NotificationDTO),
    __metadata("design:paramtypes", [notifcation_service_1.NotificationService])
], NotificationResolver);
//# sourceMappingURL=notification.resolver.js.map