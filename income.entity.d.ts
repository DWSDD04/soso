export declare class Income {
    IncomeID: number;
    AppointmentID: number;
    Price: number;
    Date: string;
    constructor(IncomeID?: number, AppointmentID?: number, Price?: number, Date?: string);
    static fromRow(row: any): Income | null;
}
