import { IncomeService } from './income.service';
import { IncomeDTO } from './dto/income.dto';
import { CreateIncomeDTO } from './dto//create-income.dto';
import { UpdateIncomeDTO } from './dto/update-income.dto';
export declare class IncomeResolver {
    private readonly incomeService;
    constructor(incomeService: IncomeService);
    listIncomes(): Promise<IncomeDTO[]>;
    getIncomeByID(id: number): Promise<IncomeDTO | null>;
    getIncomeByAppointmentID(appointmentID: number): Promise<IncomeDTO[]>;
    getIncomeByDate(date: string): Promise<IncomeDTO[]>;
    getIncomesByDateRange(startDate: string, endDate: string): Promise<IncomeDTO[]>;
    countIncomes(): Promise<number>;
    createIncome(data: CreateIncomeDTO): Promise<IncomeDTO>;
    createIncomeFromAppointment(appointmentID: number): Promise<IncomeDTO | null>;
    updateIncomeByID(data: UpdateIncomeDTO): Promise<IncomeDTO>;
    updateIncomeByAppointmentID(appointmentID: number, data: CreateIncomeDTO): Promise<boolean>;
    updateIncomeByDateRange(startDate: string, endDate: string, data: CreateIncomeDTO): Promise<boolean>;
    deleteIncomeByID(id: number): Promise<boolean>;
    deleteIncomeByAppointmentID(appointmentID: number): Promise<boolean>;
    deleteIncomeByDate(date: string): Promise<boolean>;
    deleteIncomesByDateRange(startDate: string, endDate: string): Promise<boolean>;
}
