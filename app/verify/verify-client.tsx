"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    async function verify() {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Email verified! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(`❌ Verification failed: ${data.error}`);
      }
    }

    verify();
  }, [token]);

  return (
    <div style={{ padding: 20 }}>
      <h1>{message}</h1>
    </div>
  );
}
