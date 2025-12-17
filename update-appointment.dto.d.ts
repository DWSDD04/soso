import { CreateAppointmentDTO } from './create-appointment.dto';
declare const UpdateAppointmentDTO_base: import("@nestjs/common").Type<Partial<CreateAppointmentDTO>>;
export declare class UpdateAppointmentDTO extends UpdateAppointmentDTO_base {
    AppointmentID: number;
    ScheduledTime?: Date;
}
export {};
