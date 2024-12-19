import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TreatmentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addTreatment(createTreatmentDto: CreateTreatmentDto, user: any): Promise<{
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
    findAll(): Promise<{
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
    findOne(id: number): Promise<{
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
    update(updateTreatmentDto: UpdateTreatmentDto): Promise<{
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
    updateTreatment(id: number, updateTreatmentDto: UpdateTreatmentDto): Promise<void>;
}
