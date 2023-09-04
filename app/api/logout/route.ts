import User from "@/app/model/user.model";
import { connect } from "@/app/config/db.config";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { authenticate } from "@/app/helper/authenticate";

export async function POST(request: NextRequest) {
  try {
    const isAuth = await authenticate(request);
    if (isAuth) {
      let rsp = NextResponse.json({ message: "success" }, { status: 200 });
      rsp.cookies.delete("token");
      return rsp;
    } else {
      return NextResponse.json({ error: "no auth" }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, async function(err, hash) {
//         const newUser = new User(
//             {
//                 username:username,
//                 password:hash,
//                 isVerified:true,
//                 isAdmin:true,
//                 verifyToken:'',
//                 verifyTokenExpiry:'',
//                }
//         )
//       let resp = await newUser.save()
//     });
// });
