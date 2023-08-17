import User from "@/app/model/user.model";
import {connect} from '@/app/config/db.config'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { authenticate } from "@/app/helper/authenticate";

export async function POST(request:NextRequest){
    try{
    connect()
    const saltRounds = 10;
    const dat = await request.formData()
    let username:any = await dat.get('username');
    let pwd:any = await dat.get('password');
    const KEY = process.env.SIGN_HASH
    let dbUserData = await User.findOne({username:username})
    if(dbUserData){
        let comp = await bcrypt.compare(pwd, dbUserData.password); 
        if (comp){
            var token = jwt.sign({ user:username }, KEY!,{ expiresIn: '1h' });
            dbUserData.verifyToken = token;
            dbUserData.save()
            let rsp =NextResponse.json({ error: 'success' }, { status: 200 });
            rsp.cookies.set("token",token,{ httpOnly: true })
            return rsp;
        }
        else {
            return NextResponse.json({ error: 'wrong password' }, { status: 500 });
        }
    } else{
        return NextResponse.json({message:"user not found"}, {status: 500});
    }
    
    }
    catch(error:any){
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