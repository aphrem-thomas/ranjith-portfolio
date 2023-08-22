
import { connect } from "@/app/config/db.config";
import Blogs from "@/app/model/blogs.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    connect()
    try{
        let blogs = await Blogs.find({},'username email isVerfied tags');
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
    try{
        const blog = new Blogs({
            username:username,
            email:email,
            text:article,
            isVerfied:false,
            submittedDate: new Date().toString(),
            thumbnail:thumbnail,
            tags:tagArray
        });
        let resp = await blog.save()
        if(resp){
            return NextResponse.json({ message: 'success' }, { status: 200 });
        }
    }catch(e:any){
        return NextResponse.json({message:e.message},{status:500})
    }
}