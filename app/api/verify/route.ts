import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { CLIENT_RENEG_WINDOW } from "tls";

export async function POST(request:Request){
    try{
        const {token}=await request.json();

        if(!token){
            return NextResponse.json({message:"Token is required"}, {status:400});
        }

        const client=await clientPromise;
        const db=client.db("nextblog");

        const record=await db.collection("tokens").findOne({token});

        if(!record){
                        return NextResponse.json({message:"token expired"}, {status:400});


        }

        await db.collection("users").updateOne({email:record.email},{$set:{verified:true}});
        await db.collection("tokens").deleteOne({token});

        return NextResponse.json({message:"User verified successfully"});




    }catch(error){
        console.error("Error during verification:", error);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }
}