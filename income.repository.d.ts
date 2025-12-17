import { DataSource } from 'typeorm';
import { Income } from '../entities/income.entity';
import { IncomeDTO } from '../dto/income.dto';
export declare class IncomeRepository {
    private dataSource;
    private readonly repo;
    constructor(dataSource: DataSource);
    createIncome(incomeDto: IncomeDTO): Promise<Income>;
    getIncomeByID(IncomeID: number): Promise<Income | null>;
    getIncomes(): Promise<Income[]>;
    getIncomeByAppointmentID(AppointmentID: number): Promise<Income[]>;
    getIncomeByPrice(Price: number): Promise<Income[]>;
    getIncomeByDate(Date: string): Promise<Income[]>;
    getIncomesByDateRange(startDate: string, endDate: string): Promise<Income[]>;
    updateIncomeByID(IncomeID: number, updateData: Partial<IncomeDTO>): Promise<void>;
    updateIncomeByAppointmentID(AppointmentID: number, updateData: Partial<IncomeDTO>): Promise<void>;
    updateIncomeByDateRange(startDate: string, endDate: string, updateData: Partial<IncomeDTO>): Promise<void>;
    deleteIncomeByID(IncomeID: number): Promise<void>;
    deleteIncomeByAppointmentID(AppointmentID: number): Promise<void>;
    deleteIncomeByDate(Date: string): Promise<void>;
    deleteIncomesByDateRange(startDate: string, endDate: string): Promise<void>;
    countIncomes(): Promise<number>;
}
