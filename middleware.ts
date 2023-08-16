import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { connect } from './app/config/db.config'
import User from './app/model/user.model'
import jwt from 'jsonwebtoken'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log("in middleware--->")
    // let token=request.cookies.get('token')?.value;
    // if(token){
    //   let udt = jwt.verify(token,process.env.SIGN_HASH!)
    //   console.log("udt", udt)
    // }
    // connect()
    // let oup=User.findOne({username:'aphremthomas'})
    // console.log('out',oup)
  // return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: '/blogs/:path*',
}