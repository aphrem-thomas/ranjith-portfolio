
import { connect } from "@/app/config/db.config";
import Blogs from "@/app/model/blogs.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    connect()
    try{
        let blogs = await Blogs.find({});
        console.log("blll",blogs)
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
    try{
        const blog = new Blogs({
            username:username,
            email:email,
            text:article,
            isVerfied:false
        });
        let resp = await blog.save()
        if(resp){
            console.log("resp after saving blog", resp)
            return NextResponse.json({ message: 'success' }, { status: 200 });
        }
    }catch(e:any){
        return NextResponse.json({message:e.message},{status:500})
    }
}