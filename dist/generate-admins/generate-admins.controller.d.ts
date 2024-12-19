import { GenerateAdminsService } from './generate-admins.service';
import { CreateGenerateAdminDto } from './dto/create-generate-admin.dto';
export declare class GenerateAdminsController {
    private readonly generateAdminsService;
    constructor(generateAdminsService: GenerateAdminsService);
    create(createGenerateAdminDto: CreateGenerateAdminDto): Promise<{
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
