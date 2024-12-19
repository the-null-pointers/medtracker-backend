export declare class CreateHospitalDto {
    hospital_name: string;
    location: string;
    contact_info: string;
    infoMail?: string;
    about?: string;
    image?: string;
    province?: string;
    district?: string;
    ward?: string;
    street?: string;
    established?: Date;
    isVerified?: boolean;
    adminPhone?: string;
    licenseNumber?: string;
    licenseExpiry?: Date;
    latitude?: number;
    longitude?: number;
    emergencyPhone?: string;
    rating?: number;
}
export declare class CreatePatientFromHospitalDto {
    phone: string;
    firstName: string;
    middleName: string;
    lastName: string;
    doctorId: number;
    reason: string;
    gender: string;
    hospital_id: number;
}
