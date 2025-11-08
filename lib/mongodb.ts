import {MongoClient} from "mongodb";

const url=process.env.MONGODB_URI as string;

let client;
let clientPromise:Promise<MongoClient>;
if (!url){
    throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV==="development"){
    if (!(global as any)._mongoClientPromise){
        client=new MongoClient(url);
        (global as any)._mongoClientPromise=client.connect();
    }
    clientPromise=(global as any)._mongoClientPromise;

}else{
    client=new MongoClient(url);
    clientPromise=client.connect();
}

export default clientPromise;