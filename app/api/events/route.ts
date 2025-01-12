import { connect } from "@/app/config/db.config";
import { authenticate } from "@/app/helper/authenticate";
import { NextRequest, NextResponse } from "next/server";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import Events from "@/app/model/events.modle";
import sendEmail from "@/app/helper/sendEmail";

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
    let events;
    let totalCount
    if(!isAdmin){
        events = await Events.find({approved:true})
        .select('_id name location url submittedDate thumbnailurl')
        .sort([['submittedDate', 'descending']])
        .skip((skipPage-1) * skip)
        .limit(limit);
      totalCount = await Events.countDocuments({approved:true});
    } else {
        events = await Events.find()
        .skip((skipPage-1) * skip)
        .limit(limit);
      totalCount = await Events.countDocuments();
    }
    console.log("total count", totalCount)
    return NextResponse.json({ events, totalCount }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  connect();
  const dat = await request.formData();
  let url: any = await dat.get("url");
  let name: any = await dat.get("name");
  let location: any = await dat.get("location");
  let thumbnailurl: any = await dat.get("thumbnailurl");
  let submitter: any = await dat.get("submitter");
  let submitter_email: any = await dat.get("submitter_email");
  if (!thumbnailurl){
      const linkData:any = await getLinkPreview(url);
      thumbnailurl = linkData.images[0];
  }
    
  try {
    const event = new Events({
        name,
      thumbnailurl,
      location,
      url,
      submittedDate: new Date().toString(),
      submitter,
      submitter_email,
      approved:false
    });
    let resp = await event.save();
    if (resp) {
        const info = await sendEmail(
            `Event alert<${process.env.EMAIL}>`, // sender address
            process.env.TOEMAIL??'', // list of receivers
            `New event added`, // Subject line
            `by${submitter}:${submitter_email}`, // plain text body
            "",
            null,
           );
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
        let resp = await Events.deleteOne({_id:id});
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
      let resp = await Events.findOneAndUpdate({_id:id},{approved:approve},{new:true});
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
