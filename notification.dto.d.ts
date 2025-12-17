export declare class NotificationDTO {
    NotificationID?: number;
    AppointmentID: number;
    message: string;
    timestamp: string;
    read?: boolean;
    constructor(partial: Partial<NotificationDTO>);
    static fromEntity(notification: any): NotificationDTO;
}
