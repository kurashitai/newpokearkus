"use client";

import { MainContent } from "@/components/main-content";
import { Sidebar } from "@/components/sidebar";

export default function WikiPage() {
  return (
    <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <MainContent />
        <Sidebar />
      </div>
    </div>
  );
}
