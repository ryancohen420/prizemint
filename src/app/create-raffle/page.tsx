"use client";

import { useSession } from "next-auth/react";
import RaffleCreateForm from "@/components/RaffleCreateForm";

export default function CreateRafflePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to create a raffle</h1>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Raffle</h1>
      <RaffleCreateForm />
    </div>
  );
}
