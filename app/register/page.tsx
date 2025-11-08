"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import emailjs from "emailjs-com";
export default function RegisterPage(){
    const router =useRouter();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function handleRegister(e:any){
        e.preventDefault();

        const res=await fetch("/api/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password}),
        });

        const data=await res.json();
        console.log("REGISTER RESPONSE:",data);

        if(res.ok){
            alert("Registration successful! Please log in.");
            await emailjs.send(
                "service_x561nxp",        // your EmailJS service ID
                "template_o8fknnz",       // your template ID
                {
                    name: email.split("@")[0],
                    user_email: email,
                    verification_link: `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${data.token}`
                },
                "HCjaEIZOneTx9xkek"     // your public key
                );

            router.push("/login");
        }else{
            alert("Registration failed: " + data.message);
        }
    }

    return (
        <div>

            <form onSubmit={handleRegister}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <br />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

                <br />
                <input type="submit" placeholder="submit" />
            </form>
        </div>
    );
}