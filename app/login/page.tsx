"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    console.log("LOGIN RESULT:", result);

    if (result?.ok) {

      router.push("/admin");     // ✅ FIXED
    } else {
        if (result?.error) {
            alert(result.error);
            return;
        }
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
