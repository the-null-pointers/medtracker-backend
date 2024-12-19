import { PrismaService } from 'src/prisma/prisma.service';
export declare class HealthHistoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllHistory(params: any): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    getAllHistoryOfOneHospital(params: any, user: any): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    getAllHistoryOfOnePatientByDoctor(id: number, params: any, user: any): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    getAllOwnHistory(params: any, user: any): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    getOneVisit(id: number, user: any): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
    getOneHistory(id: number): Promise<{
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    }>;
}
