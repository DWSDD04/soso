import { NotificationRepository } from './repositories/notification.repository';
import { NotificationDTO } from './dto/notification.dto';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { UpdateNotificationDTO } from './dto/update-notification.dto';
export declare class NotificationService {
    private readonly notificationRepository;
    constructor(notificationRepository: NotificationRepository);
    listNotifications(): Promise<NotificationDTO[]>;
    getNotificationByID(id: number): Promise<NotificationDTO>;
    getNotificationsByAppointmentID(appointmentID: number): Promise<NotificationDTO[]>;
    getNotificationsByDateRange(start: string, end: string): Promise<NotificationDTO[]>;
    createNotification(data: CreateNotificationDTO): Promise<NotificationDTO>;
    updateNotificationByID(data: UpdateNotificationDTO): Promise<NotificationDTO>;
    updateNotificationsByAppointmentID(appointmentID: number, update: Partial<CreateNotificationDTO>): Promise<boolean>;
    updateNotificationsByDateRange(start: string, end: string, update: Partial<CreateNotificationDTO>): Promise<boolean>;
    deleteNotificationByID(id: number): Promise<boolean>;
    deleteNotificationsByAppointmentID(appointmentID: number): Promise<boolean>;
    deleteNotificationsByDateRange(start: string, end: string): Promise<boolean>;
    countNotifications(): Promise<number>;
}
