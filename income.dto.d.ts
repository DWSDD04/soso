import { Income } from '../entities/income.entity';
export declare class IncomeDTO {
    IncomeID?: number;
    AppointmentID: number;
    Price: number;
    Date: string;
    constructor(partial: Partial<IncomeDTO>);
    static fromEntity(income: Income | null): IncomeDTO;
    static fromRow(row: any): IncomeDTO;
}
