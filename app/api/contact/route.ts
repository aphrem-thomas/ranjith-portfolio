import transporter from '@/app/config/mailer';
import sendEmail from '@/app/helper/sendEmail';
import arrayBufferToBuffer from 'arraybuffer-to-buffer'
import { NextRequest } from "next/server";

export async function POST(request:NextRequest,response:Response){
    const dat = await request.formData()
    let files:any = await dat.get('resume');
    const EMAIL = process.env.EMAIL
    const TOEMAIL = process.env.TOEMAIL
    const info = await sendEmail(
        `"No-reply-resume review 👻" <${EMAIL}>`, // sender address
        TOEMAIL??'', // list of receivers
        `Resume review for ${dat.get('name')}`, // Subject line
        `contact email${dat.get('email')}`, // plain text body
        `
            <div>
                <h1>Resume review for ${dat.get('name')}</h1>
                <b>Contact email: </b><a href="mailto:${dat.get('email')}">${dat.get('email')}</a>
                <br>
                <b>Message: </b><p>${dat.get('description')}</p>
            </div>`,
        [
            { 
                content:arrayBufferToBuffer(await files.arrayBuffer()),
                contentType:'application/pdf'
            }
        ]);
    return new Response('done',{status:200})
}