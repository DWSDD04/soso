import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationDTO } from '../dto/notification.dto';
import { CreateNotificationDTO } from '../dto/create-notification.dto';
export declare class NotificationRepository {
    private readonly repo;
    constructor(repo: Repository<Notification>);
    getNotifications(): Promise<NotificationDTO[]>;
    getNotificationByID(id: number): Promise<NotificationDTO | null>;
    getNotificationsByAppointmentID(appointmentID: number): Promise<NotificationDTO[]>;
    getNotificationsByDateRange(startDate: string, endDate: string): Promise<NotificationDTO[]>;
    createNotification(data: CreateNotificationDTO | Partial<Notification>): Promise<NotificationDTO>;
    updateNotificationByID(id: number, updateData: Partial<CreateNotificationDTO>): Promise<number>;
    updateNotificationsByAppointmentID(appointmentID: number, updateData: Partial<CreateNotificationDTO>): Promise<number>;
    updateNotificationsByDateRange(startDate: string, endDate: string, updateData: Partial<CreateNotificationDTO>): Promise<number>;
    deleteNotificationByID(id: number): Promise<number>;
    deleteNotificationsByAppointmentID(appointmentID: number): Promise<number>;
    deleteNotificationsByDateRange(startDate: string, endDate: string): Promise<number>;
    countNotifications(): Promise<number>;
}
