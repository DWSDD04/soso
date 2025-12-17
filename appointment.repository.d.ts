import { DataSource } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDTO } from '../dto/create-appointment.dto';
import { UpdateAppointmentDTO } from '../dto/update-appointment.dto';
export declare class AppointmentRepository {
    private dataSource;
    private readonly repo;
    constructor(dataSource: DataSource);
    createAppointment(dto: CreateAppointmentDTO): Promise<Appointment>;
    getAppointmentByID(AppointmentID: number): Promise<Appointment | null>;
    getAllAppointments(): Promise<Appointment[]>;
    getAppointmentsByService(ServiceID: number): Promise<Appointment[]>;
    getAppointmentsByStatus(Status: string): Promise<Appointment[]>;
    getUpcomingAppointments(): Promise<Appointment[]>;
    getAppointmentsByDateRange(startDate: string, endDate: string): Promise<Appointment[]>;
    updateAppointmentByID(AppointmentID: number, updateData: Partial<UpdateAppointmentDTO>): Promise<void>;
    deleteAppointmentByID(AppointmentID: number): Promise<void>;
    countAppointments(): Promise<number>;
}
