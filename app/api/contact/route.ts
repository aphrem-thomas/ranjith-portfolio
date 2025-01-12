import { connect } from '@/app/config/db.config';
import transporter from '@/app/config/mailer';
import sendEmail from '@/app/helper/sendEmail';
import Contacts from '@/app/model/contact.model';
import arrayBufferToBuffer from 'arraybuffer-to-buffer'
import { NextRequest } from "next/server";

export async function POST(request:NextRequest,response:Response){
    connect();
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
                filename:files.name,
                content:arrayBufferToBuffer(await files.arrayBuffer()),
            }
        ]);
        try{
            const event = new Contacts({
                name:dat.get('name'),
                email:dat.get('email')
            });
            let resp = await event.save();
        }catch(e){
            console.log(e)
        }
    if(info.messageId){
        return new Response('done',{status:200})
    }
    else{
        return new Response('error',{status:500})
    }
}