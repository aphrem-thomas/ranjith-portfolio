import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { connect } from './app/config/db.config'
import User from './app/model/user.model'
import * as jose from 'jose'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    let token=request.cookies.get('token')?.value;
    if(token){
      try {
        let udt = await jose.jwtVerify(token, new TextEncoder().encode(process.env.SIGN_HASH!))
        console.log("udt", udt)
        if (udt) {
          return NextResponse.redirect(new URL('/', request.url))
        }
      } catch (e) {
        return
      }
    }
    
}
 
export const config = {
  matcher: '/login/:path*',
}