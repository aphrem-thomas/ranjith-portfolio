import { connect } from "@/app/config/db.config";
import { authenticate } from "@/app/helper/authenticate";
import Jobs from "@/app/model/jobs.model";
import { NextRequest, NextResponse } from "next/server";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export async function GET(request: NextRequest, { params }: any) {
  connect();
  const isAdmin = await authenticate(request);
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  if (!page) {
    return NextResponse.json(
      { message: "need page parameter" },
      { status: 404 }
    );
  }
  const skipPage = parseInt(page);
  const skip = 10;
  const limit = 10;
  try {
    let jobs;
    let totalCount
    if(!isAdmin){
      jobs = await Jobs.find({approved:true})
        .skip((skipPage-1) * skip)
        .limit(limit);
      totalCount = await Jobs.countDocuments({approved:true});
    } else {
      jobs = await Jobs.find()
        .skip((skipPage-1) * skip)
        .limit(limit);
      totalCount = await Jobs.countDocuments();
    }
    console.log("total count", totalCount)
    return NextResponse.json({ jobs, totalCount }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  connect();
  const dat = await request.formData();
  let url: any = await dat.get("url");
  let company: any = await dat.get("company");
  let location: any = await dat.get("location");
  let role: any = await dat.get("role");
  let domain: any = await dat.get("domain");
  let thumbnailurl: any = await dat.get("thumbnailurl");
  let submitter: any = await dat.get("submitter");
  let submitter_email: any = await dat.get("submitter_email");
  if (!thumbnailurl){
      const linkData:any = await getLinkPreview(url);
      thumbnailurl = linkData.images[0];
  }
    
  try {
    const blog = new Jobs({
      thumbnailurl,
      role,
      company,
      location,
      department: domain,
      url,
      submittedDate: new Date().toString(),
      submitter,
      submitter_email,
      approved:false
    });
    let resp = await blog.save();
    if (resp) {
      return NextResponse.json({ message: "success" }, { status: 200 });
    }
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
    connect();
    const isAdmin = await authenticate(request);
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    if (isAdmin) {
      try {
        let resp = await Jobs.deleteOne({_id:id});
        if (resp) {
          return NextResponse.json({ message: "success" }, { status: 200 });
        }
      } catch (e: any) {
        return NextResponse.json({ message: e.message }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: "unauthorised" }, { status: 404 });
    }
}

export async function PUT(request: NextRequest) {
  connect();
  const isAdmin = await authenticate(request);
  const {searchParams} = new URL(request.url);
  const id = searchParams.get('id');
  const approve = searchParams.get('approve');
  console.log("approve?",approve)
  if (isAdmin) {
    try {
      let resp = await Jobs.findOneAndUpdate({_id:id},{approved:approve},{new:true});
      if (resp) {
        return NextResponse.json({ message: "success" }, { status: 200 });
      }
    } catch (e: any) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "unauthorised" }, { status: 404 });
  }
}
