export declare class CreateDoctorDto {
    firstName: string;
    lastName: string;
    specialization: string;
    contactInfo: string;
    email: string;
    phone: string;
    hospital_id: number;
}
export declare class CreateLabReportDto {
    title: string;
    description?: string;
    fileUrl?: string;
    visitId: number;
}
export declare class CreateTreatmentDto {
    treatment_name: string;
    prescription?: string;
    diagnosis?: string;
    treatment_date: Date;
    visit_id: number;
    doctor_id: number;
}
