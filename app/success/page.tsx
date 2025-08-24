"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.payment_status) {
            setStatus(`Payment status: ${data.payment_status}`);
          } else {
            setStatus("⚠️ Could not fetch payment status.");
          }
        })
        .catch(() => setStatus("❌ Error loading payment status."));
    } else {
      setStatus("⚠️ No session ID found.");
    }
  }, [sessionId]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>✅ Payment Successful!</h1>
      <p>{status ?? "Loading..."}</p>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading checkout...</p>}
    >
      <SuccessPage />
    </Suspense>
  );
}
