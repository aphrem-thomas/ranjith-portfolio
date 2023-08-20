import { NextRequest } from "next/server";
import { connect } from "../config/db.config";
import jwt from 'jsonwebtoken'
import User from "../model/user.model";

export async function authenticate(request:NextRequest){
    try{
    let token=request.cookies.get('token')?.value;
    if(token){
      let udt = await jwt.verify(token,process.env.SIGN_HASH!)
      console.log(typeof(udt))
      if(udt){
        return true
      }else{
        return false
      }
    }
    } catch(err) {
        return false
    }
}