import AIChatDemo from "@/components/rant-demos/ai-chat-demo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AIChatDemoPage() {
    return (
        <div className="h-screen w-full flex flex-col">
            <header className="shrink-0 flex items-center gap-4 px-4 py-3 border-b bg-background">
                <Link href="/components" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Components
                </Link>
                <span className="font-medium">AI Chat Demo</span>
            </header>
            <div className="flex-1 overflow-hidden">
                <AIChatDemo />
            </div>
        </div>
    );
}
