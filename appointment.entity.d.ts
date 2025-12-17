export declare class Appointment {
    AppointmentID: number;
    Name: string;
    ServiceID: number;
    Status: string;
    ScheduledTime: Date | null;
    constructor(AppointmentID?: number, Name?: string, ServiceID?: number, Status?: string, ScheduledTime?: Date);
    static fromRow(row: any): Appointment | null;
}
