import { connect } from "@/app/config/db.config";
import { authenticate } from "@/app/helper/authenticate";
import Jobs from "@/app/model/jobs.model";
import { NextRequest, NextResponse } from "next/server";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export async function GET(request: NextRequest, { params }: any) {
  connect();
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
    let jobs = await Jobs.find()
      .skip((skipPage-1) * skip)
      .limit(limit);
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  connect();
  const isAdmin = await authenticate(request);
  if (isAdmin) {
    const dat = await request.formData();
    let url: any = await dat.get("url");
    let company: any = await dat.get("company");
    let location: any = await dat.get("location");
    let role: any = await dat.get("role");
    let domain: any = await dat.get("domain");
    let thumbnailurl: any = await dat.get("thumbnailurl");
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
      });
      let resp = await blog.save();
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
