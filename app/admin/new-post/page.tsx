"use client";

import {use, useState} from "react";

export default function NewPostPage(){
    const [slug,setSlug]=useState("");
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");



    async function handelSubmit(e:React.FormEvent){
        e.preventDefault();
        const res=await fetch("/api/posts",{

            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({slug,title,content}),

        });

        const data=await res.json();
        alert(data.message);
        console.log(data.body);
    }

    return (
        <div style={{padding:20}}>
            <h1>Create a new post</h1>

            <form onSubmit={handelSubmit}>
                <input type="text" placeholder="slug" value={slug} onChange={(e)=>setSlug(e.target.value)} />
                <br />
                <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                <br />
                <textarea placeholder="content" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                <br />
                <button type="submit">Create Post</button>
            </form>
        </div>

    );
}