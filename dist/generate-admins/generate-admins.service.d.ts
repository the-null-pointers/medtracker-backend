import { CreateGenerateAdminDto } from './dto/create-generate-admin.dto';
import { UpdateGenerateAdminDto } from './dto/update-generate-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class GenerateAdminsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createRoles(createGenerateAdminDto: CreateGenerateAdminDto): Promise<{
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
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateGenerateAdminDto: UpdateGenerateAdminDto): string;
    remove(id: number): string;
}
