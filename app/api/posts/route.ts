import clientPromise from "@/lib/mongodb";

export async function GET(){

    const client=await clientPromise;
    const db=client.db("nextblog");

    const posts=await db.collection("posts").find({}).toArray();

    return Response.json(posts);

}

export async function POST(request:Request){
    const body=await request.json();

    const client=await clientPromise;
    const db=client.db("nextblog");
    await db.collection("posts").insertOne(body);
    return Response.json({message:"Post created successfully",posts:body});
}

