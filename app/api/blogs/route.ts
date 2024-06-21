
import { connect } from "@/app/config/db.config";
import { authenticate } from "@/app/helper/authenticate";
import sendEmail from "@/app/helper/sendEmail";
import Blogs from "@/app/model/blogs.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    connect()
    try{
        const isAdmin = await authenticate(request)
        let blogs;
        if(isAdmin){
            blogs = await Blogs.find({},'_id username email isVerfied tags thumbnail submittedDate heading subheading').sort({'isVerfied':1});
        }else{
            blogs = await Blogs.find({isVerfied:true},'_id username email tags thumbnail submittedDate heading subheading').sort([['submittedDate', 'descending']]);
        }
        return NextResponse.json({blogs},{status:200})
    }catch(e:any){
        return NextResponse.json({message:e.message},{status:500})
    }
}

export async function POST(request:NextRequest){
    connect()
    const dat = await request.formData()
    let username:any = await dat.get('name');
    let email:any = await dat.get('email');
    let article:any = await dat.get('article');
    let tags:any = await dat.get('tags');
    let tagArray = tags.split(',');
    let thumbnail:any = await dat.get('thumbnail');
    let heading:any = await dat.get('heading');
    let subheading:any = await dat.get('subheading');
    try{
        const blog = new Blogs({
            username:username,
            email:email,
            text:article,
            isVerfied:false,
            submittedDate: new Date().toString(),
            thumbnail:thumbnail,
            tags:tagArray,
            heading:heading,
            subheading:subheading
        });
        let resp = await blog.save()
        if(resp){
            const info = await sendEmail(
                `Blog alert<${process.env.EMAIL}>`, // sender address
                process.env.TOEMAIL??'', // list of receivers
                `New blog added`, // Subject line
                `by${username}:${email}`, // plain text body
                "",
                null,
               );
            return NextResponse.json({ message: 'success' }, { status: 200 });
        }
    }catch(e:any){
        return NextResponse.json({message:e.message},{status:500})
    }
}