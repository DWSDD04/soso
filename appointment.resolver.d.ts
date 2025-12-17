import { AppointmentService } from './appointment.service';
import { AppointmentDTO } from './dto/appointment.dto';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { UpdateAppointmentDTO } from './dto/update-appointment.dto';
export declare class AppointmentResolver {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    listAppointments(): Promise<AppointmentDTO[]>;
    getAppointmentByID(id: number): Promise<AppointmentDTO | null>;
    getAppointmentsByService(serviceID: number): Promise<AppointmentDTO[]>;
    getAppointmentsByStatus(status: string): Promise<AppointmentDTO[]>;
    getUpcomingAppointments(): Promise<AppointmentDTO[]>;
    getAppointmentsByDateRange(startDate: string, endDate: string): Promise<AppointmentDTO[]>;
    createAppointment(data: CreateAppointmentDTO): Promise<AppointmentDTO>;
    updateAppointmentByID(id: number, data: UpdateAppointmentDTO): Promise<AppointmentDTO>;
    deleteAppointmentByID(id: number): Promise<boolean>;
}
