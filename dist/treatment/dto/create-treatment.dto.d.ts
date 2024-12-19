export declare class PrescriptionDto {
    medication_name: string;
    dosage: string;
    frequency: string;
    start_date: Date;
    end_date: Date;
}
export declare class CreateTreatmentDto {
    treatment_name: string;
    prescription: string;
    diagnosis: string;
    treatment_date: Date;
    visit_id: number;
    symptoms: string;
    prescriptions: PrescriptionDto[];
}
