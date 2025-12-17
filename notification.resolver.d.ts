import { NotificationService } from './notifcation.service';
import { NotificationDTO } from './dto/notification.dto';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { UpdateNotificationDTO } from './dto/update-notification.dto';
export declare class NotificationResolver {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    listNotifications(): Promise<NotificationDTO[]>;
    getNotificationByID(id: number): Promise<NotificationDTO | null>;
    getNotificationsByAppointmentID(appointmentID: number): Promise<NotificationDTO[]>;
    getNotificationsByDateRange(startDate: string, endDate: string): Promise<NotificationDTO[]>;
    countNotifications(): Promise<number>;
    createNotification(data: CreateNotificationDTO): Promise<NotificationDTO>;
    updateNotificationByID(data: UpdateNotificationDTO): Promise<NotificationDTO>;
    updateNotificationsByAppointmentID(appointmentID: number, data: CreateNotificationDTO): Promise<boolean>;
    updateNotificationsByDateRange(startDate: string, endDate: string, data: CreateNotificationDTO): Promise<boolean>;
    deleteNotificationByID(id: number): Promise<boolean>;
    deleteNotificationsByAppointmentID(appointmentID: number): Promise<boolean>;
    deleteNotificationsByDateRange(startDate: string, endDate: string): Promise<boolean>;
}
