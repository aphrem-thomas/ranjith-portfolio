
import transporter from '@/app/config/mailer';
import arrayBufferToBuffer from 'arraybuffer-to-buffer'
import { NextRequest } from "next/server";

async function sendEmail(from:string, to:string, subject:string, text:string, html:string, attachments:any){
    return await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
        attachments,
      });
}

export default sendEmail
    