// app/success/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setStatus(`Payment status: ${data.payment_status}`));
    }
  }, [sessionId]);

  return (
    <div>
      <h1>✅ Payment Successful!</h1>
      <p>{status}</p>
    </div>
  );
}
