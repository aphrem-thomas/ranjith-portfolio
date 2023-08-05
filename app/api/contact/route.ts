import { NextResponse } from "next/server"
import transporter from "@/config/mailer"

export async function POST(request:Request,response:Response){
    const dat = await request.formData()
    console.log(dat)
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <hirokawasaki2506813@gmail.com>', // sender address
        to: "hirokawasaki2506813@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "howdi partner...", // plain text body
        html: "<b>howdi partner...</b>", // html body
      });
    console.log("after sending email",info)
    return new Response('200')
}