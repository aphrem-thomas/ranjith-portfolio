import { connect } from "@/app/config/db.config";
import { authenticate } from "@/app/helper/authenticate";
import Blogs from "@/app/model/blogs.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextApiRequest, {params}:{params:{id:string}}){
    // connect()
    const {id} = params
    return NextResponse.json({"id":id},{status:200})
    // try{
    //     console.log("id kitti", id)
    //     // const isAdmin = await authenticate(request)
    //     // let blogs;
    //     // if(isAdmin){
    //     //     blogs = await Blogs.find({},'_id username email isVerfied tags thumbnail submittedDate heading subheading');
    //     // }else{
    //     //     blogs = await Blogs.find({},'_id username email tags thumbnail submittedDate heading subheading');
    //     // }
    //     // return NextResponse.json({blogs},{status:200})
    // }catch(e:any){
    //     return NextResponse.json({message:e.message},{status:500})
    // }
}