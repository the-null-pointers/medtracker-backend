declare class ResponseHelper {
    success(message: string, data?: any): {
        success: boolean;
        status: string;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        data: any;
    };
    error(message: string, data?: any): {
        success: boolean;
        status: string;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        status: string;
        message: string;
        error: any;
    };
}
declare const _default: ResponseHelper;
export default _default;
