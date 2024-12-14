import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // Replace with your SMTP host
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process?.env.MAIL_USER, // Your email address
      pass: process.env.MAIL_PASSWORD, // Your email password
    },
  });

  constructor(private configService: ConfigService) {}

  async sendMail(to: string, subject: string, text: string) {
    try {
      let mail = await this.transporter.sendMail({
        from: "'Med Tracker' <" + process.env.MAIL_FROM + '>',
        to,
        subject: subject,
        text,
        html: ` 
       <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
       <div style="margin:50px auto;width:70%;padding:20px 0">
         <div style="border-bottom:1px solid #eee">
           <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Med Tracker</a>
         </div>
         <p style="font-size:1.1em">Hi,</p>
         <p>${text}</p>
         <p style="font-size:0.9em;">Regards,<br />Med Tracker</p>
         <hr style="border:none;border-top:2px solid #eee" />
         <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
           <p>Med Tracker</p>
           <p>Nepal</p>
         </div>
       </div>
     </div>`,
      });
    } catch (error) {
      console.error(`Error sending email: ${error}`);
      throw error;
    }
  }
}
