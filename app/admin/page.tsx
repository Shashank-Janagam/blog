"use client";
import LogoutPage from "./logout"
export default function AdminPage(){
    return (
        <div style={{padding:20}}>
            <h1>Admin dashboard</h1>
            <a href="/admin/new-post">create a new post</a>
            <br />
            <LogoutPage />

        </div>
    )
}