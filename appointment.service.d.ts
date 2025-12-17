import { AppointmentRepository } from './repositories/appointment.repository';
import { ServiceRepository } from '../service/repositories/service.repository';
import { IncomeRepository } from '../income/repositories/income.repository';
import { AppointmentDTO } from './dto/appointment.dto';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { UpdateAppointmentDTO } from './dto/update-appointment.dto';
export declare class AppointmentService {
    private readonly appointmentRepository;
    private readonly serviceRepository;
    private readonly incomeRepository;
    constructor(appointmentRepository: AppointmentRepository, serviceRepository: ServiceRepository, incomeRepository: IncomeRepository);
    getAppointmentByID(id: number): Promise<AppointmentDTO>;
    listAppointments(): Promise<AppointmentDTO[]>;
    getAppointmentsByService(serviceID: number): Promise<AppointmentDTO[]>;
    getAppointmentsByStatus(status: string): Promise<AppointmentDTO[]>;
    getUpcomingAppointments(): Promise<AppointmentDTO[]>;
    getAppointmentsByDateRange(start: string, end: string): Promise<AppointmentDTO[]>;
    createAppointment(data: CreateAppointmentDTO): Promise<AppointmentDTO>;
    updateAppointmentByID(id: number, data: UpdateAppointmentDTO): Promise<AppointmentDTO>;
    deleteAppointmentByID(id: number): Promise<boolean>;
}
