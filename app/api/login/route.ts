import User from "@/app/model/user.model";
import {connect} from '@/app/config/db.config'
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try{
    connect()
    const saltRounds = 10;
    let respo;
    let myPlaintextPassword = 's0/\/\P4$$w0rD';
    const dat = await request.formData()
    let username:any = await dat.get('username');
    let pwd:any = await dat.get('password');
    const EMAIL = process.env.EMAIL
    const TOEMAIL = process.env.TOEMAIL
    myPlaintextPassword=pwd;
    console.log("username: ", username)
    console.log("password: ", pwd)
    let dbUserData = await User.findOne({username:username})
    console.log("dbuser", dbUserData)
    if(dbUserData){
        bcrypt.compare(pwd, dbUserData.password, function(err, result) {
            console.log("result=>",result, "err", err)
            if(result===true){
                console.log("trrr")
                return NextResponse.json({message:"success", status: 200 });
            }
            else{
                return NextResponse.json({ error: 'wrong password' }, { status: 500 });
            }
        });
    } else{
        return NextResponse.json({message:"user not found"}, {status: 500});
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
    }
    catch(error:any){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}