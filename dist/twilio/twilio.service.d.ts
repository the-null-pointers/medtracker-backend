export declare class TwilioService {
    private twilio;
    constructor();
    sendSms(to: string, message: string): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
}
