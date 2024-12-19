import { AuthService } from './auth.service';
import { EmailRegisterDto, RegisterDto, UpdateUserDto, VerfiyEmailRegisterDto, VerfiyRegisterDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    auth(registerDto: RegisterDto): Promise<{
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
    verify(verifyRegisterDto: VerfiyRegisterDto): Promise<{
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
    emailAuth(registerDto: EmailRegisterDto): Promise<{
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
    emailAuthVerify(verifyRegisterDto: VerfiyEmailRegisterDto): Promise<{
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
    updateUser(updateUserDto: UpdateUserDto, user: {
        id: string;
    }): Promise<{
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
