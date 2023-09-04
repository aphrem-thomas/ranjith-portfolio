import { connect } from "@/app/config/db.config";
import { authenticate } from "@/app/helper/authenticate";
import Blogs from "@/app/model/blogs.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:{id:string}}){
    connect()
    const {id} = params
    const {searchParams} = new URL(request.url);
    const approve = searchParams.get('approve');
    console.log('approve',approve)
    try{
        console.log("id kitti", id)
        const isAdmin = await authenticate(request)
        let blogs;
        if(isAdmin){
            blogs = await Blogs.findById(id,'_id username text email tags thumbnail submittedDate heading subheading isVerfied');
        }else{
            blogs = await Blogs.findById(id,'_id username text email tags thumbnail submittedDate heading subheading');
        }
        return NextResponse.json({blogs},{status:200})
    }catch(e:any){
        return NextResponse.json({message:e.message},{status:500})
    }
}

export async function POST(request:NextRequest, {params}:{params:{id:string}}){
    connect()
    const {id} = params
    const {searchParams} = new URL(request.url);
    const approve = searchParams.get('approve');
    try{
        const isAdmin = await authenticate(request)
        let blogs;
        if(isAdmin){
            try{
                blogs = await Blogs.findOneAndUpdate({_id:id},{isVerfied:true},{new:true});
            }catch(e:any){
                return NextResponse.json({message:e.message},{status:500})
            }
        }else{
            return NextResponse.json({message:'unauthoriesd'},{status:400})
        }
        return NextResponse.json({blogs},{status:200})
    }catch(e:any){
        return NextResponse.json({message:e.message},{status:500})
    }
}