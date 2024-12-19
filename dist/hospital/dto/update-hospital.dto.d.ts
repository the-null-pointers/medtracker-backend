import { CreateHospitalDto } from './create-hospital.dto';
declare const UpdateHospitalDto_base: import("@nestjs/common").Type<Partial<CreateHospitalDto>>;
export declare class UpdateHospitalDto extends UpdateHospitalDto_base {
    doctor_id: string;
}
export {};
