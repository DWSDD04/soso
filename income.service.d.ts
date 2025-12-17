import { IncomeRepository } from './repositories/income.repository';
import { AppointmentRepository } from '../appointment/repositories/appointment.repository';
import { ServiceRepository } from '../service/repositories/service.repository';
import { IncomeDTO } from './dto/income.dto';
import { CreateIncomeDTO } from './dto/create-income.dto';
import { UpdateIncomeDTO } from './dto/update-income.dto';
export declare class IncomeService {
    private readonly incomeRepository;
    private readonly appointmentRepository;
    private readonly serviceRepository;
    constructor(incomeRepository: IncomeRepository, appointmentRepository: AppointmentRepository, serviceRepository: ServiceRepository);
    listIncomes(): Promise<IncomeDTO[]>;
    getIncomeByID(id: number): Promise<IncomeDTO>;
    getIncomeByAppointmentID(AppointmentID: number): Promise<IncomeDTO[]>;
    getIncomeByPrice(price: number): Promise<IncomeDTO[]>;
    getIncomeByDate(date: string): Promise<IncomeDTO[]>;
    getIncomesByDateRange(start: string, end: string): Promise<IncomeDTO[]>;
    createIncome(data: CreateIncomeDTO): Promise<IncomeDTO>;
    updateIncomeByID(data: UpdateIncomeDTO): Promise<IncomeDTO>;
    updateIncomeByAppointmentID(AppointmentID: number, update: Partial<IncomeDTO>): Promise<boolean>;
    updateIncomeByDateRange(start: string, end: string, update: Partial<IncomeDTO>): Promise<boolean>;
    deleteIncomeByID(id: number): Promise<boolean>;
    deleteIncomeByAppointmentID(AppointmentID: number): Promise<boolean>;
    deleteIncomeByDate(date: string): Promise<boolean>;
    deleteIncomesByDateRange(start: string, end: string): Promise<boolean>;
    countIncomes(): Promise<number>;
    createIncomeFromAppointment(AppointmentID: number): Promise<IncomeDTO>;
}
