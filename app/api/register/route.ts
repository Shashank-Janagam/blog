import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import {hash} from "@node-rs/argon2";
import { randomBytes  } from "crypto";
export async function POST(request:Request){

    try{

        const {email,password}=await request.json();

        const hashedPassword=await hash(password);
        const client=await clientPromise;
        const db=client.db("nextblog");

        const existingUser=await db.collection("users").findOne({email});

        if(existingUser){
            return NextResponse.json({message:"User already exists"}, {status:400});
        }

        const token=randomBytes(32).toString("hex");
        await db.collection("users").insertOne({email,password:hashedPassword,verified:false});
        await db.collection("tokens").insertOne({email,token,expiresAt:new Date(Date.now()+3600000)});
        //expires in 1 hour



        return NextResponse.json({message:"User registered successfully",token:token});


    }catch(error){
        console.error("Error during registration:", error);
        return NextResponse.json({message:"Internal Server Error"}, {status:500});
    }

}