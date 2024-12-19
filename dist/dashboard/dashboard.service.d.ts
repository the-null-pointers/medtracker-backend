import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDoctorStats(id: string): Promise<{
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
    getHospitalStats(id: string, hospital_id: number): Promise<{
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
    update(id: number, updateDashboardDto: UpdateDashboardDto): string;
    remove(id: number): string;
}
