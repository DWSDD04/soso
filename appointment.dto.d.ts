import { Appointment } from '../entities/appointment.entity';
export declare class AppointmentDTO {
    AppointmentID?: number;
    Name?: string;
    ServiceID?: number;
    Status?: string;
    ScheduledTime?: Date | null;
    constructor(partial: Partial<AppointmentDTO>);
    private static safeToDate;
    static fromEntity(appointment: Appointment | null): AppointmentDTO;
}
