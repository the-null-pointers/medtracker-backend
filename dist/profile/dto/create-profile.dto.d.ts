declare enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
export declare class CreateProfileDto {
    firstName: string;
    lastName: string;
    identifier: string;
    dob: string;
    gender: Gender;
    address: string;
    contactInfo: string;
    image: string;
    middleName: string;
    email: string;
    eContact: string;
    bloodGroup: string;
    eName: string;
    about: string;
    constructor(data: Partial<CreateProfileDto>);
}
declare class PatientDto {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    e_name: string;
}
export declare class UserResponseDto {
    id: number;
    email: string;
    roles: string[];
    phone: string;
    patients: PatientDto[];
}
export {};
