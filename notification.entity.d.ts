export declare class Notification {
    NotificationID: number;
    AppointmentID: number;
    message: string;
    timestamp: string;
    constructor(NotificationID?: number, AppointmentID?: number, message?: string, timestamp?: string | Date);
    static fromRow(row: any): Notification | null;
}
