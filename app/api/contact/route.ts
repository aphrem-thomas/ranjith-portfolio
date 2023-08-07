import transporter from "@/config/mailer"
import arrayBufferToBuffer from 'arraybuffer-to-buffer'

export async function POST(request:Request,response:Response){
    const dat = await request.formData()
    let files:any = await dat.get('resume');
    const EMAIL = process.env.EMAIL
    const info = await transporter.sendMail({
        from: `"No-reply-resume review 👻" <${EMAIL}>`, // sender address
        to: EMAIL, // list of receivers
        subject: `Resume review for ${dat.get('name')}`, // Subject line
        text: `contact email${dat.get('email')}`, // plain text body
        html: `
            <div>
                <h1>Resume review for ${dat.get('name')}</h1>
                <b>Contact email: </b><a href="mailto:${dat.get('email')}">${dat.get('email')}</a>
                <br>
                <b>Message: </b><p>${dat.get('description')}</p>
            </div>`,
        attachments:[
            { 
                content:arrayBufferToBuffer(await files.arrayBuffer()),
                contentType:'application/pdf'
            }
        ]
      });
    console.log("after sending email", info)
    return new Response('200')
}