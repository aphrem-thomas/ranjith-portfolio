import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { connect } from './app/config/db.config'
import User from './app/model/user.model'
import * as jose from 'jose'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("path", request.nextUrl.pathname);
  let token=request.cookies.get('token')?.value;
  console.log("token", token);
  
    if(token){
      if (request.nextUrl.pathname.startsWith('/login')) {
        try {
          let udt = await jose.jwtVerify(token, new TextEncoder().encode(process.env.SIGN_HASH!))
          if (udt) {
            return NextResponse.redirect(new URL('/logout', request.url))
          }
        } catch (e) {
          return
        }
      } else if(request.nextUrl.pathname.startsWith('/blogs/') && !request.nextUrl.pathname.endsWith('admin')){
        try{
          let udt = await jose.jwtVerify(token, new TextEncoder().encode(process.env.SIGN_HASH!))
          if (udt) {
          return NextResponse.redirect(new URL(`${request.nextUrl.pathname}/admin`, request.url))
        }} catch (e) {
          return
        }
      } 
      else if(request.nextUrl.pathname ==='/jobs-admin'){
          let udt;
          console.log("in jobs admin",token)
          try {
            udt = await jose.jwtVerify(token, new TextEncoder().encode(process.env.SIGN_HASH!))
          }catch(e){
            return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_URL}/jobs/1`, request.url))
          }
      }
    } else if(request.nextUrl.pathname ==='/jobs-admin'){
        return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_URL}/jobs/1`, request.url))
    }
    
}
 
export const config = {
  matcher: ['/login/:path*','/blogs/:path*', '/jobs-admin/:path*'],
}