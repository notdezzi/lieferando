"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const User = () => {
  const { data: session } = useSession();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <p>Loading....</p>;
  }
  return (
    <>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
};