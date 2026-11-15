"use client";

import Dashboard from "@/components/Dashboard";
import { withAuth } from "@/lib/withAuth";

function Home() {
  return (
    <main className="min-h-screen bg-primary flex flex-col">
      <Dashboard />
    </main>
  );
}

export default withAuth(Home);

