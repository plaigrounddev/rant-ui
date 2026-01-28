"use client";

import { ProfileForm } from "@/components/profile-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RantProfilerPage() {
    return (
        <div className="min-h-screen w-full flex flex-col bg-background">
            <header className="shrink-0 flex items-center gap-4 px-4 py-3 border-b bg-background z-10">
                <Link href="/components" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Components
                </Link>
                <span className="font-medium">Rant Profiler</span>
            </header>
            <main className="flex-1 py-8 md:py-12">
                <ProfileForm />
            </main>
        </div>
    );
}
