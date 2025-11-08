"use client";

import { Suspense } from "react";
import VerifyClient from "./verify-client";

export default function VerifyPage() {
  return (
    <Suspense fallback={<p style={{ padding: 20 }}>Verifying...</p>}>
      <VerifyClient />
    </Suspense>
  );
}
