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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const notification_entity_1 = require("../entities/notification.entity");
const notification_dto_1 = require("../dto/notification.dto");
let NotificationRepository = class NotificationRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getNotifications() {
        const rows = await this.repo.find({ order: { timestamp: 'DESC' } });
        return rows.map(r => notification_dto_1.NotificationDTO.fromEntity(r));
    }
    async getNotificationByID(id) {
        const row = await this.repo.findOne({ where: { NotificationID: id } });
        if (!row)
            return null;
        return notification_dto_1.NotificationDTO.fromEntity(row);
    }
    async getNotificationsByAppointmentID(appointmentID) {
        const rows = await this.repo.find({ where: { AppointmentID: appointmentID }, order: { timestamp: 'DESC' } });
        return rows.map(r => notification_dto_1.NotificationDTO.fromEntity(r));
    }
    async getNotificationsByDateRange(startDate, endDate) {
        const start = (0, moment_1.default)(startDate).format('YYYY-MM-DD HH:mm:ss');
        const end = (0, moment_1.default)(endDate).format('YYYY-MM-DD HH:mm:ss');
        const rows = await this.repo.find({
            where: { timestamp: (0, typeorm_2.Between)(start, end) },
            order: { timestamp: 'DESC' },
        });
        return rows.map(r => notification_dto_1.NotificationDTO.fromEntity(r));
    }
    async createNotification(data) {
        const toSave = this.repo.create({
            AppointmentID: data.AppointmentID,
            message: data.message,
            timestamp: data['timestamp']
                ? (0, moment_1.default)(data.timestamp).format('YYYY-MM-DD HH:mm:ss')
                : (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
        });
        const saved = await this.repo.save(toSave);
        return notification_dto_1.NotificationDTO.fromEntity(saved);
    }
    async updateNotificationByID(id, updateData) {
        if (updateData.timestamp) {
            updateData.timestamp = (0, moment_1.default)(updateData.timestamp).format('YYYY-MM-DD HH:mm:ss');
        }
        const res = await this.repo.update({ NotificationID: id }, updateData);
        return res.affected ?? 0;
    }
    async updateNotificationsByAppointmentID(appointmentID, updateData) {
        if (updateData.timestamp) {
            updateData.timestamp = (0, moment_1.default)(updateData.timestamp).format('YYYY-MM-DD HH:mm:ss');
        }
        const res = await this.repo.update({ AppointmentID: appointmentID }, updateData);
        return res.affected ?? 0;
    }
    async updateNotificationsByDateRange(startDate, endDate, updateData) {
        if (updateData.timestamp) {
            updateData.timestamp = (0, moment_1.default)(updateData.timestamp).format('YYYY-MM-DD HH:mm:ss');
        }
        const start = (0, moment_1.default)(startDate).format('YYYY-MM-DD HH:mm:ss');
        const end = (0, moment_1.default)(endDate).format('YYYY-MM-DD HH:mm:ss');
        const qb = this.repo.createQueryBuilder()
            .update(notification_entity_1.Notification)
            .set(updateData)
            .where('timestamp BETWEEN :start AND :end', { start, end });
        const res = await qb.execute();
        return res.affected ?? 0;
    }
    async deleteNotificationByID(id) {
        const res = await this.repo.delete({ NotificationID: id });
        return res.affected ?? 0;
    }
    async deleteNotificationsByAppointmentID(appointmentID) {
        const res = await this.repo.delete({ AppointmentID: appointmentID });
        return res.affected ?? 0;
    }
    async deleteNotificationsByDateRange(startDate, endDate) {
        const start = (0, moment_1.default)(startDate).format('YYYY-MM-DD HH:mm:ss');
        const end = (0, moment_1.default)(endDate).format('YYYY-MM-DD HH:mm:ss');
        const qb = this.repo.createQueryBuilder()
            .delete()
            .from(notification_entity_1.Notification)
            .where('timestamp BETWEEN :start AND :end', { start, end });
        const res = await qb.execute();
        return res.affected ?? 0;
    }
    async countNotifications() {
        return this.repo.count();
    }
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationRepository);
//# sourceMappingURL=notification.repository.js.map