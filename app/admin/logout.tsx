"use client"
import { url } from "inspector";
import { signOut } from "next-auth/react";
import { callbackify } from "util";
export default function LogoutPage() {
    return (
        <button onClick={() => signOut({ callbackUrl: "/login" })}
            style={{padding:"6px 12px",cursor:"pointer"}}
        >

            Logout
        </button>
    );
}