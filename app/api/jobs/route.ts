import { connect } from "@/app/config/db.config";
import { authenticate } from "@/app/helper/authenticate";
import Blogs from "@/app/model/blogs.model";
import Jobs from "@/app/model/jobs.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:any){
    connect()
    const {searchParams} = new URL(request.url);
    const page = searchParams.get('page');
    if(!page){
        return NextResponse.json({message:'need page parameter'},{status:404})
    }
    const skipPage = parseInt(page);
    const skip = 10;
    const limit =10;
    try{
      
        let jobs = await Jobs.find().skip(skipPage*skip).limit(limit);
        return NextResponse.json({jobs},{status:200})
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
                blogs = await Blogs.findOneAndUpdate({_id:id},{isVerfied:approve},{new:true});
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