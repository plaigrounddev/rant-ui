"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

// UI Components
import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
    BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";

// AI Elements
import { Message, MessageContent, MessageActions, MessageAction, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { CodeBlock } from "@/components/ai-elements/code-block";
import { Terminal } from "@/components/ai-elements/terminal";
import { FileTree, FileTreeFolder, FileTreeFile } from "@/components/ai-elements/file-tree";
import { Loader } from "@/components/ai-elements/loader";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion";
import { Task, TaskTrigger, TaskContent, TaskItem } from "@/components/ai-elements/task";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ai-elements/reasoning";
import { Confirmation, ConfirmationTitle, ConfirmationActions, ConfirmationAction } from "@/components/ai-elements/confirmation";
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@/components/ai-elements/checkpoint";
import { ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtStep, ChainOfThoughtContent } from "@/components/ai-elements/chain-of-thought";
import { Sources, SourcesTrigger, SourcesContent, Source } from "@/components/ai-elements/sources";
import { Snippet, SnippetInput, SnippetCopyButton } from "@/components/ai-elements/snippet";
import { Plan, PlanHeader, PlanTitle, PlanDescription, PlanContent, PlanTrigger, PlanAction } from "@/components/ai-elements/plan";
import { PackageInfo } from "@/components/ai-elements/package-info";
import {
    ModelSelector, ModelSelectorTrigger, ModelSelectorContent, ModelSelectorInput,
    ModelSelectorList, ModelSelectorEmpty, ModelSelectorGroup, ModelSelectorItem,
    ModelSelectorLogo, ModelSelectorLogoGroup, ModelSelectorName
} from "@/components/ai-elements/model-selector";
import { InlineCitation, InlineCitationText, InlineCitationCard, InlineCitationCardTrigger, InlineCitationCardBody, InlineCitationSource } from "@/components/ai-elements/inline-citation";
import { Commit, CommitHeader, CommitHash, CommitMessage, CommitMetadata, CommitAuthor, CommitTimestamp, CommitContent, CommitFiles, CommitFile, CommitFileInfo, CommitFileStatus, CommitFileIcon } from "@/components/ai-elements/commit";
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@/components/ai-elements/tool";
import { Artifact, ArtifactHeader, ArtifactTitle, ArtifactDescription, ArtifactActions, ArtifactAction, ArtifactContent, ArtifactClose } from "@/components/ai-elements/artifact";
import { TestResults, TestResultsHeader, TestResultsSummary as TestResultsSummaryComponent, TestResultsProgress, TestResultsContent, TestSuite, TestSuiteName, TestSuiteStats, TestSuiteContent, Test, TestName, TestDuration } from "@/components/ai-elements/test-results";
import { EnvironmentVariables, EnvironmentVariablesHeader, EnvironmentVariablesTitle, EnvironmentVariablesToggle, EnvironmentVariablesContent, EnvironmentVariable, EnvironmentVariableName, EnvironmentVariableValue } from "@/components/ai-elements/environment-variables";
import { WebPreview, WebPreviewNavigation, WebPreviewNavigationButton, WebPreviewUrl, WebPreviewBody, WebPreviewConsole } from "@/components/ai-elements/web-preview";
import { Sandbox, SandboxHeader, SandboxContent, SandboxTabs, SandboxTabsBar, SandboxTabsList, SandboxTabsTrigger, SandboxTabContent } from "@/components/ai-elements/sandbox";
import { StackTrace, StackTraceHeader, StackTraceError, StackTraceErrorType, StackTraceErrorMessage, StackTraceFrames } from "@/components/ai-elements/stack-trace";
import { ImageZoom } from "@/components/kibo-ui/image-zoom";
import { EditorProvider, EditorBubbleMenu, EditorFormatBold, EditorFormatItalic, EditorFormatStrike, EditorFormatUnderline } from "@/components/kibo-ui/editor";
import { ColorPicker, ColorPickerSelection, ColorPickerHue, ColorPickerAlpha, ColorPickerFormat, ColorPickerOutput, ColorPickerEyeDropper } from "@/components/kibo-ui/color-picker";
import { ImageCrop, ImageCropContent, ImageCropApply, ImageCropReset } from "@/components/kibo-ui/image-crop";
import { KanbanProvider, KanbanBoard, KanbanHeader, KanbanCards, KanbanCard } from "@/components/kibo-ui/kanban";
import { GanttProvider, GanttSidebar, GanttSidebarGroup, GanttSidebarItem, GanttFeatureList, GanttFeatureListGroup, GanttFeatureItem, GanttTimeline, GanttHeader, GanttToday, type GanttFeature } from "@/components/kibo-ui/gantt";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/kibo-ui/marquee";
import { QRCode } from "@/components/kibo-ui/qr-code";
import { Source as PromptKitSource, SourceTrigger as PromptKitSourceTrigger, SourceContent as PromptKitSourceContent } from "@/components/ui/source";
// ElevenLabs Voice Components (rant-voice)
import { LiveWaveform } from "@/components/ui/live-waveform";
import { VoiceButton } from "@/components/ui/voice-button";
import { MicSelector } from "@/components/ui/mic-selector";
import { Orb } from "@/components/ui/orb";
import { CopyIcon, ThumbsUpIcon, ThumbsDownIcon, RefreshCwIcon, SearchIcon, GlobeIcon, CheckIcon, DownloadIcon, ExternalLinkIcon, ArrowLeftIcon, ArrowRightIcon, RotateCwIcon, MicIcon } from "lucide-react";

// Categories
const categories = [
    { id: "all", name: "All Components" },
    { id: "ai-elements", name: "AI Elements" },
    { id: "inputs", name: "Inputs" },
    { id: "buttons", name: "Buttons" },
    { id: "display", name: "Data Display" },
    { id: "feedback", name: "Feedback" },
    { id: "overlay", name: "Overlay" },
    { id: "navigation", name: "Navigation" },
    { id: "layout", name: "Layout" },
    { id: "rant-voice", name: "Rant Voice" },
];

// Component sections
const componentSections = [
    // AI Elements
    { id: "ai-message", name: "Message", category: "ai-elements" },
    { id: "ai-prompt-input", name: "Prompt Input", category: "ai-elements" },
    { id: "ai-code-block", name: "Code Block", category: "ai-elements" },
    { id: "ai-terminal", name: "Terminal", category: "ai-elements" },
    { id: "ai-file-tree", name: "File Tree", category: "ai-elements" },
    { id: "ai-loader", name: "Loader", category: "ai-elements" },
    { id: "ai-shimmer", name: "Shimmer", category: "ai-elements" },
    { id: "ai-suggestion", name: "Suggestion", category: "ai-elements" },
    { id: "ai-task", name: "Task", category: "ai-elements" },
    { id: "ai-reasoning", name: "Reasoning", category: "ai-elements" },
    { id: "ai-confirmation", name: "Confirmation", category: "ai-elements" },
    { id: "ai-checkpoint", name: "Checkpoint", category: "ai-elements" },
    { id: "ai-chain-of-thought", name: "Chain of Thought", category: "ai-elements" },
    { id: "ai-sources", name: "Sources", category: "ai-elements" },
    { id: "ai-snippet", name: "Snippet", category: "ai-elements" },
    { id: "ai-plan", name: "Plan", category: "ai-elements" },
    { id: "ai-package-info", name: "Package Info", category: "ai-elements" },
    { id: "ai-model-selector", name: "Model Selector", category: "ai-elements" },
    { id: "ai-inline-citation", name: "Inline Citation", category: "ai-elements" },
    { id: "ai-commit", name: "Commit", category: "ai-elements" },
    { id: "ai-tool", name: "Tool", category: "ai-elements" },
    { id: "ai-artifact", name: "Artifact", category: "ai-elements" },
    { id: "ai-test-results", name: "Test Results", category: "ai-elements" },
    { id: "ai-environment-variables", name: "Environment Variables", category: "ai-elements" },
    { id: "ai-web-preview", name: "Web Preview", category: "ai-elements" },
    { id: "ai-sandbox", name: "Sandbox", category: "ai-elements" },
    { id: "ai-stack-trace", name: "Stack Trace", category: "ai-elements" },
    { id: "ai-image-zoom", name: "Image Zoom", category: "ai-elements" },
    { id: "ai-editor", name: "Editor", category: "ai-elements" },
    { id: "ai-color-picker", name: "Color Picker", category: "ai-elements" },
    { id: "ai-image-crop", name: "Image Crop", category: "ai-elements" },
    { id: "ai-kanban", name: "Kanban", category: "ai-elements" },
    { id: "ai-gantt", name: "Gantt", category: "ai-elements" },
    { id: "ai-marquee", name: "Marquee", category: "ai-elements" },
    { id: "ai-qr-code", name: "QR Code", category: "ai-elements" },
    { id: "ai-source", name: "Source", category: "ai-elements" },
    // Rant Voice Components
    { id: "voice-live-waveform", name: "Live Waveform", category: "rant-voice" },
    { id: "voice-voice-button", name: "Voice Button", category: "rant-voice" },
    { id: "voice-mic-selector", name: "Mic Selector", category: "rant-voice" },
    { id: "voice-orb", name: "Orb", category: "rant-voice" },
    // UI Components
    { id: "accordion", name: "Accordion", category: "layout" },
    { id: "alert", name: "Alert", category: "feedback" },
    { id: "alert-dialog", name: "Alert Dialog", category: "overlay" },
    { id: "avatar", name: "Avatar", category: "display" },
    { id: "badge", name: "Badge", category: "display" },
    { id: "breadcrumb", name: "Breadcrumb", category: "navigation" },
    { id: "button", name: "Button", category: "buttons" },
    { id: "button-group", name: "Button Group", category: "buttons" },
    { id: "calendar", name: "Calendar", category: "inputs" },
    { id: "card", name: "Card", category: "layout" },
    { id: "checkbox", name: "Checkbox", category: "inputs" },
    { id: "collapsible", name: "Collapsible", category: "layout" },
    { id: "dialog", name: "Dialog", category: "overlay" },
    { id: "dropdown-menu", name: "Dropdown Menu", category: "overlay" },
    { id: "input", name: "Input", category: "inputs" },
    { id: "kbd", name: "Kbd", category: "display" },
    { id: "label", name: "Label", category: "inputs" },
    { id: "popover", name: "Popover", category: "overlay" },
    { id: "progress", name: "Progress", category: "feedback" },
    { id: "radio-group", name: "Radio Group", category: "inputs" },
    { id: "scroll-area", name: "Scroll Area", category: "layout" },
    { id: "select", name: "Select", category: "inputs" },
    { id: "separator", name: "Separator", category: "layout" },
    { id: "skeleton", name: "Skeleton", category: "feedback" },
    { id: "slider", name: "Slider", category: "inputs" },
    { id: "spinner", name: "Spinner", category: "feedback" },
    { id: "switch", name: "Switch", category: "inputs" },
    { id: "table", name: "Table", category: "display" },
    { id: "tabs", name: "Tabs", category: "navigation" },
    { id: "textarea", name: "Textarea", category: "inputs" },
    { id: "toggle", name: "Toggle", category: "buttons" },
    { id: "tooltip", name: "Tooltip", category: "overlay" },
];

function ComponentCard({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
    return (
        <Card id={id} className="scroll-mt-20">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}

// Helper component for ImageCrop demo
function ImageCropDemo() {
    const [file, setFile] = React.useState<File | null>(null);
    const [croppedImage, setCroppedImage] = React.useState<string | null>(null);

    return (
        <div className="space-y-4">
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                        setFile(f);
                        setCroppedImage(null);
                    }
                }}
            />
            {file && (
                <div className="space-y-2">
                    <ImageCrop file={file} onCrop={setCroppedImage} aspect={16 / 9}>
                        <ImageCropContent className="max-h-[300px]" />
                        <div className="flex gap-2 mt-2">
                            <ImageCropApply />
                            <ImageCropReset />
                        </div>
                    </ImageCrop>
                </div>
            )}
            {croppedImage && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">Cropped Result:</p>
                    <img src={croppedImage} alt="Cropped" className="max-w-xs rounded-lg border" />
                </div>
            )}
        </div>
    );
}

// Helper component for Kanban demo
const kanbanColumns = [
    { id: "todo", name: "To Do" },
    { id: "in-progress", name: "In Progress" },
    { id: "done", name: "Done" },
];

const initialKanbanData = [
    { id: "1", name: "Research competitors", column: "todo" },
    { id: "2", name: "Design mockups", column: "todo" },
    { id: "3", name: "Implement UI", column: "in-progress" },
    { id: "4", name: "Write tests", column: "done" },
];

function KanbanDemo() {
    const [data, setData] = React.useState(initialKanbanData);

    return (
        <KanbanProvider
            columns={kanbanColumns}
            data={data}
            onDataChange={setData}
            className="min-h-[250px]"
        >
            {(column) => (
                <KanbanBoard key={column.id} id={column.id}>
                    <KanbanHeader>{column.name}</KanbanHeader>
                    <KanbanCards id={column.id}>
                        {(item) => (
                            <KanbanCard key={item.id} id={item.id} name={item.name} column={item.column} />
                        )}
                    </KanbanCards>
                </KanbanBoard>
            )}
        </KanbanProvider>
    );
}

// Helper data and component for Gantt demo
const ganttStatuses = [
    { id: "planned", name: "Planned", color: "#6366f1" },
    { id: "in-progress", name: "In Progress", color: "#f59e0b" },
    { id: "completed", name: "Completed", color: "#10b981" },
];

const today = new Date();
const initialGanttFeatures: GanttFeature[] = [
    { id: "1", name: "Research Phase", startAt: new Date(today.getFullYear(), today.getMonth(), 1), endAt: new Date(today.getFullYear(), today.getMonth(), 10), status: ganttStatuses[2] },
    { id: "2", name: "Design Phase", startAt: new Date(today.getFullYear(), today.getMonth(), 8), endAt: new Date(today.getFullYear(), today.getMonth(), 20), status: ganttStatuses[1] },
    { id: "3", name: "Development", startAt: new Date(today.getFullYear(), today.getMonth(), 15), endAt: new Date(today.getFullYear(), today.getMonth() + 1, 5), status: ganttStatuses[0] },
];

function GanttDemo() {
    const [features, setFeatures] = React.useState(initialGanttFeatures);

    return (
        <div className="h-[350px] w-full overflow-hidden rounded-lg border">
            <GanttProvider range="monthly" zoom={100}>
                <GanttSidebar>
                    <GanttSidebarGroup name="Project Tasks">
                        {features.map((feature) => (
                            <GanttSidebarItem key={feature.id} feature={feature} />
                        ))}
                    </GanttSidebarGroup>
                </GanttSidebar>
                <GanttTimeline>
                    <GanttHeader />
                    <GanttFeatureList>
                        <GanttFeatureListGroup>
                            {features.map((feature) => (
                                <GanttFeatureItem key={feature.id} {...feature} />
                            ))}
                        </GanttFeatureListGroup>
                    </GanttFeatureList>
                    <GanttToday />
                </GanttTimeline>
            </GanttProvider>
        </div>
    );
}

export default function ComponentsPage() {
    const [selectedCategory, setSelectedCategory] = React.useState("all");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
    const [progress, setProgress] = React.useState(33);
    const [modelSelectorOpen, setModelSelectorOpen] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredSections = componentSections.filter((section) => {
        const matchesCategory = selectedCategory === "all" || section.category === selectedCategory;
        const matchesSearch = section.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-16 items-center justify-between px-4 mx-auto">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-semibold">Component Library</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Input placeholder="Search components..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-64" />
                            <ThemeToggle />
                        </div>
                    </div>
                </header>

                <div className="container mx-auto flex">
                    {/* Sidebar */}
                    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0 border-r p-4 overflow-y-auto">
                        <nav className="space-y-1">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </nav>
                        <Separator className="my-4" />
                        <div className="space-y-1">
                            <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Jump to</p>
                            <ScrollArea className="h-[300px]">
                                {filteredSections.map((section) => (
                                    <a key={section.id} href={`#${section.id}`} className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                        {section.name}
                                    </a>
                                ))}
                            </ScrollArea>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-8">
                        <div className="max-w-4xl space-y-8">
                            {/* AI ELEMENTS */}

                            {/* Message */}
                            {filteredSections.find((s) => s.id === "ai-message") && (
                                <ComponentCard title="Message" id="ai-message">
                                    <div className="space-y-4">
                                        <Message from="user">
                                            <MessageContent>How do I create a React component?</MessageContent>
                                        </Message>
                                        <Message from="assistant">
                                            <MessageContent>
                                                <MessageResponse>{`Here's a simple React component:\n\n\`\`\`tsx\nfunction MyComponent() {\n  return <div>Hello World</div>;\n}\n\`\`\`\n\nThis creates a functional component that renders "Hello World".`}</MessageResponse>
                                            </MessageContent>
                                            <MessageActions>
                                                <MessageAction tooltip="Copy"><CopyIcon className="size-4" /></MessageAction>
                                                <MessageAction tooltip="Like"><ThumbsUpIcon className="size-4" /></MessageAction>
                                                <MessageAction tooltip="Dislike"><ThumbsDownIcon className="size-4" /></MessageAction>
                                                <MessageAction tooltip="Regenerate"><RefreshCwIcon className="size-4" /></MessageAction>
                                            </MessageActions>
                                        </Message>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Prompt Input */}
                            {filteredSections.find((s) => s.id === "ai-prompt-input") && (
                                <ComponentCard title="Prompt Input" id="ai-prompt-input">
                                    <PromptInput onSubmit={(msg) => console.log(msg)}>
                                        <PromptInputTextarea placeholder="Ask me anything..." />
                                        <PromptInputSubmit />
                                    </PromptInput>
                                </ComponentCard>
                            )}

                            {/* Code Block */}
                            {filteredSections.find((s) => s.id === "ai-code-block") && (
                                <ComponentCard title="Code Block" id="ai-code-block">
                                    <CodeBlock code={`function greet(name: string) {\n  console.log(\`Hello, \${name}!\`);\n}\n\ngreet("World");`} language="typescript" showLineNumbers />
                                </ComponentCard>
                            )}

                            {/* Terminal */}
                            {filteredSections.find((s) => s.id === "ai-terminal") && (
                                <ComponentCard title="Terminal" id="ai-terminal">
                                    <Terminal output={`$ npm install\nadded 150 packages in 3.2s\n\n$ npm run build\n> Building...\n✓ Compiled successfully in 2.1s`} isStreaming={false} />
                                </ComponentCard>
                            )}

                            {/* File Tree */}
                            {filteredSections.find((s) => s.id === "ai-file-tree") && (
                                <ComponentCard title="File Tree" id="ai-file-tree">
                                    <FileTree defaultExpanded={new Set(["src", "src/components"])}>
                                        <FileTreeFolder path="src" name="src">
                                            <FileTreeFolder path="src/components" name="components">
                                                <FileTreeFile path="src/components/Button.tsx" name="Button.tsx" />
                                                <FileTreeFile path="src/components/Card.tsx" name="Card.tsx" />
                                            </FileTreeFolder>
                                            <FileTreeFile path="src/index.tsx" name="index.tsx" />
                                        </FileTreeFolder>
                                        <FileTreeFile path="package.json" name="package.json" />
                                    </FileTree>
                                </ComponentCard>
                            )}

                            {/* Loader */}
                            {filteredSections.find((s) => s.id === "ai-loader") && (
                                <ComponentCard title="Loader" id="ai-loader">
                                    <div className="flex gap-8 items-center">
                                        <Loader size={16} />
                                        <Loader size={24} />
                                        <Loader size={32} />
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Shimmer */}
                            {filteredSections.find((s) => s.id === "ai-shimmer") && (
                                <ComponentCard title="Shimmer" id="ai-shimmer">
                                    <div className="space-y-2">
                                        <Shimmer className="w-full">Loading content...</Shimmer>
                                        <Shimmer className="w-3/4">Fetching data...</Shimmer>
                                        <Shimmer className="w-1/2">Processing...</Shimmer>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Suggestion */}
                            {filteredSections.find((s) => s.id === "ai-suggestion") && (
                                <ComponentCard title="Suggestion" id="ai-suggestion">
                                    <Suggestions>
                                        <Suggestion suggestion="Tell me about React hooks" />
                                        <Suggestion suggestion="How do I use TypeScript?" />
                                        <Suggestion suggestion="Explain async/await" />
                                    </Suggestions>
                                </ComponentCard>
                            )}

                            {/* Task */}
                            {filteredSections.find((s) => s.id === "ai-task") && (
                                <ComponentCard title="Task" id="ai-task">
                                    <Task defaultOpen={true}>
                                        <TaskTrigger title="Searching codebase for related files..." />
                                        <TaskContent>
                                            <TaskItem>Found 3 related files</TaskItem>
                                            <TaskItem>Analyzing dependencies...</TaskItem>
                                            <TaskItem>Completed analysis</TaskItem>
                                        </TaskContent>
                                    </Task>
                                </ComponentCard>
                            )}

                            {/* Reasoning */}
                            {filteredSections.find((s) => s.id === "ai-reasoning") && (
                                <ComponentCard title="Reasoning" id="ai-reasoning">
                                    <Reasoning defaultOpen={true} duration={5}>
                                        <ReasoningTrigger />
                                        <ReasoningContent>{`First, I need to understand the problem...

Breaking this down into smaller steps:
1. Analyze the requirements
2. Design the solution  
3. Implement the code

The solution involves using React hooks for state management.`}</ReasoningContent>
                                    </Reasoning>
                                </ComponentCard>
                            )}

                            {/* Confirmation */}
                            {filteredSections.find((s) => s.id === "ai-confirmation") && (
                                <ComponentCard title="Confirmation" id="ai-confirmation">
                                    <Confirmation state="approval-requested">
                                        <ConfirmationTitle>Run npm install?</ConfirmationTitle>
                                        <ConfirmationActions>
                                            <ConfirmationAction variant="outline">Deny</ConfirmationAction>
                                            <ConfirmationAction>Accept</ConfirmationAction>
                                        </ConfirmationActions>
                                    </Confirmation>
                                </ComponentCard>
                            )}

                            {/* Checkpoint */}
                            {filteredSections.find((s) => s.id === "ai-checkpoint") && (
                                <ComponentCard title="Checkpoint" id="ai-checkpoint">
                                    <Checkpoint>
                                        <CheckpointIcon />
                                        <CheckpointTrigger tooltip="Restore to this checkpoint">
                                            Checkpoint saved at 2:34 PM
                                        </CheckpointTrigger>
                                    </Checkpoint>
                                </ComponentCard>
                            )}

                            {/* Chain of Thought */}
                            {filteredSections.find((s) => s.id === "ai-chain-of-thought") && (
                                <ComponentCard title="Chain of Thought" id="ai-chain-of-thought">
                                    <ChainOfThought defaultOpen={true}>
                                        <ChainOfThoughtHeader>Chain of Thought</ChainOfThoughtHeader>
                                        <ChainOfThoughtContent>
                                            <ChainOfThoughtStep label="Analyzing the problem" icon={SearchIcon} status="complete" />
                                            <ChainOfThoughtStep label="Gathering relevant context" icon={GlobeIcon} status="complete" />
                                            <ChainOfThoughtStep label="Generating solution" icon={CheckIcon} status="active" />
                                        </ChainOfThoughtContent>
                                    </ChainOfThought>
                                </ComponentCard>
                            )}

                            {/* Sources */}
                            {filteredSections.find((s) => s.id === "ai-sources") && (
                                <ComponentCard title="Sources" id="ai-sources">
                                    <Sources>
                                        <SourcesTrigger count={3} />
                                        <SourcesContent>
                                            <Source href="https://react.dev" title="React Documentation" />
                                            <Source href="https://nextjs.org" title="Next.js Documentation" />
                                            <Source href="https://tailwindcss.com" title="Tailwind CSS" />
                                        </SourcesContent>
                                    </Sources>
                                </ComponentCard>
                            )}

                            {/* Snippet */}
                            {filteredSections.find((s) => s.id === "ai-snippet") && (
                                <ComponentCard title="Snippet" id="ai-snippet">
                                    <Snippet code="npm install @radix-ui/react-dialog">
                                        <SnippetInput />
                                        <SnippetCopyButton />
                                    </Snippet>
                                </ComponentCard>
                            )}

                            {/* Plan */}
                            {filteredSections.find((s) => s.id === "ai-plan") && (
                                <ComponentCard title="Plan" id="ai-plan">
                                    <Plan defaultOpen={true}>
                                        <PlanHeader>
                                            <div>
                                                <PlanTitle>Refactor Authentication Module</PlanTitle>
                                                <PlanDescription>Update the auth system to use JWT tokens</PlanDescription>
                                            </div>
                                            <PlanAction>
                                                <PlanTrigger />
                                            </PlanAction>
                                        </PlanHeader>
                                        <PlanContent>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                <li>Update login endpoint</li>
                                                <li>Add token refresh mechanism</li>
                                                <li>Update middleware</li>
                                            </ul>
                                        </PlanContent>
                                    </Plan>
                                </ComponentCard>
                            )}

                            {/* Package Info */}
                            {filteredSections.find((s) => s.id === "ai-package-info") && (
                                <ComponentCard title="Package Info" id="ai-package-info">
                                    <div className="space-y-4">
                                        <PackageInfo name="react" currentVersion="18.2.0" newVersion="19.0.0" changeType="major" />
                                        <PackageInfo name="typescript" currentVersion="5.3.0" newVersion="5.4.0" changeType="minor" />
                                        <PackageInfo name="lodash" changeType="added" newVersion="4.17.21" />
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Model Selector */}
                            {filteredSections.find((s) => s.id === "ai-model-selector") && (
                                <ComponentCard title="Model Selector" id="ai-model-selector">
                                    <ModelSelector open={modelSelectorOpen} onOpenChange={setModelSelectorOpen}>
                                        <ModelSelectorTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start gap-2">
                                                <ModelSelectorLogoGroup>
                                                    <ModelSelectorLogo provider="openai" />
                                                </ModelSelectorLogoGroup>
                                                <span>GPT-4o</span>
                                            </Button>
                                        </ModelSelectorTrigger>
                                        <ModelSelectorContent>
                                            <ModelSelectorInput placeholder="Search models..." />
                                            <ModelSelectorList>
                                                <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
                                                <ModelSelectorGroup heading="OpenAI">
                                                    <ModelSelectorItem value="gpt-4o">
                                                        <ModelSelectorLogoGroup>
                                                            <ModelSelectorLogo provider="openai" />
                                                        </ModelSelectorLogoGroup>
                                                        <ModelSelectorName>GPT-4o</ModelSelectorName>
                                                    </ModelSelectorItem>
                                                    <ModelSelectorItem value="gpt-4-turbo">
                                                        <ModelSelectorLogoGroup>
                                                            <ModelSelectorLogo provider="openai" />
                                                        </ModelSelectorLogoGroup>
                                                        <ModelSelectorName>GPT-4 Turbo</ModelSelectorName>
                                                    </ModelSelectorItem>
                                                </ModelSelectorGroup>
                                                <ModelSelectorGroup heading="Anthropic">
                                                    <ModelSelectorItem value="claude-3-opus">
                                                        <ModelSelectorLogoGroup>
                                                            <ModelSelectorLogo provider="anthropic" />
                                                        </ModelSelectorLogoGroup>
                                                        <ModelSelectorName>Claude 3 Opus</ModelSelectorName>
                                                    </ModelSelectorItem>
                                                    <ModelSelectorItem value="claude-3-sonnet">
                                                        <ModelSelectorLogoGroup>
                                                            <ModelSelectorLogo provider="anthropic" />
                                                        </ModelSelectorLogoGroup>
                                                        <ModelSelectorName>Claude 3 Sonnet</ModelSelectorName>
                                                    </ModelSelectorItem>
                                                </ModelSelectorGroup>
                                            </ModelSelectorList>
                                        </ModelSelectorContent>
                                    </ModelSelector>
                                </ComponentCard>
                            )}

                            {/* Inline Citation */}
                            {filteredSections.find((s) => s.id === "ai-inline-citation") && (
                                <ComponentCard title="Inline Citation" id="ai-inline-citation">
                                    <p className="text-sm text-muted-foreground">
                                        According to recent studies,
                                        <InlineCitation>
                                            <InlineCitationText> React is one of the most popular frameworks</InlineCitationText>
                                            <InlineCitationCard>
                                                <InlineCitationCardTrigger sources={["https://react.dev"]} />
                                                <InlineCitationCardBody>
                                                    <InlineCitationSource
                                                        title="React Documentation"
                                                        url="https://react.dev"
                                                        description="The official React documentation and learning resources."
                                                    />
                                                </InlineCitationCardBody>
                                            </InlineCitationCard>
                                        </InlineCitation>
                                        .
                                    </p>
                                </ComponentCard>
                            )}

                            {/* Commit */}
                            {filteredSections.find((s) => s.id === "ai-commit") && (
                                <ComponentCard title="Commit" id="ai-commit">
                                    <Commit>
                                        <CommitHeader>
                                            <CommitMessage>feat: add new authentication system</CommitMessage>
                                            <CommitHash>abc1234</CommitHash>
                                        </CommitHeader>
                                        <CommitMetadata>
                                            <CommitAuthor>John Doe</CommitAuthor>
                                            <CommitTimestamp date={new Date()} />
                                        </CommitMetadata>
                                        <CommitContent>
                                            <CommitFiles>
                                                <CommitFile>
                                                    <CommitFileInfo>
                                                        <CommitFileStatus status="added" />
                                                        <CommitFileIcon />
                                                        <span className="font-mono text-sm">src/auth/login.tsx</span>
                                                    </CommitFileInfo>
                                                </CommitFile>
                                                <CommitFile>
                                                    <CommitFileInfo>
                                                        <CommitFileStatus status="modified" />
                                                        <CommitFileIcon />
                                                        <span className="font-mono text-sm">src/utils/api.ts</span>
                                                    </CommitFileInfo>
                                                </CommitFile>
                                            </CommitFiles>
                                        </CommitContent>
                                    </Commit>
                                </ComponentCard>
                            )}

                            {/* Tool */}
                            {filteredSections.find((s) => s.id === "ai-tool") && (
                                <ComponentCard title="Tool" id="ai-tool">
                                    <Tool defaultOpen>
                                        <ToolHeader
                                            title="search_files"
                                            type="tool-call"
                                            state="output-available"
                                        />
                                        <ToolContent>
                                            <ToolInput input={{ query: "authentication", path: "./src" }} />
                                            <ToolOutput
                                                output={{ files: ["auth.ts", "login.tsx", "middleware.ts"], count: 3 }}
                                                errorText={undefined}
                                            />
                                        </ToolContent>
                                    </Tool>
                                </ComponentCard>
                            )}

                            {/* Artifact */}
                            {filteredSections.find((s) => s.id === "ai-artifact") && (
                                <ComponentCard title="Artifact" id="ai-artifact">
                                    <Artifact className="max-w-md">
                                        <ArtifactHeader>
                                            <div>
                                                <ArtifactTitle>Generated Component</ArtifactTitle>
                                                <ArtifactDescription>A React button component</ArtifactDescription>
                                            </div>
                                            <ArtifactActions>
                                                <ArtifactAction tooltip="Download" icon={DownloadIcon} />
                                                <ArtifactAction tooltip="Open in new tab" icon={ExternalLinkIcon} />
                                                <ArtifactClose />
                                            </ArtifactActions>
                                        </ArtifactHeader>
                                        <ArtifactContent>
                                            <CodeBlock code={`export function Button({ children }) {\n  return <button className="btn">{children}</button>\n}`} language="tsx" />
                                        </ArtifactContent>
                                    </Artifact>
                                </ComponentCard>
                            )}

                            {/* Test Results */}
                            {filteredSections.find((s) => s.id === "ai-test-results") && (
                                <ComponentCard title="Test Results" id="ai-test-results">
                                    <TestResults summary={{ passed: 8, failed: 1, skipped: 2, total: 11, duration: 1234 }}>
                                        <TestResultsHeader>
                                            <TestResultsSummaryComponent />
                                            <TestResultsProgress />
                                        </TestResultsHeader>
                                        <TestResultsContent>
                                            <TestSuite name="Authentication" status="failed">
                                                <TestSuiteName />
                                                <TestSuiteStats passed={2} failed={1} />
                                                <TestSuiteContent>
                                                    <Test name="should login successfully" status="passed" duration={45}>
                                                        <TestName />
                                                        <TestDuration />
                                                    </Test>
                                                    <Test name="should handle invalid credentials" status="failed" duration={120}>
                                                        <TestName />
                                                        <TestDuration />
                                                    </Test>
                                                </TestSuiteContent>
                                            </TestSuite>
                                        </TestResultsContent>
                                    </TestResults>
                                </ComponentCard>
                            )}

                            {/* Environment Variables */}
                            {filteredSections.find((s) => s.id === "ai-environment-variables") && (
                                <ComponentCard title="Environment Variables" id="ai-environment-variables">
                                    <EnvironmentVariables>
                                        <EnvironmentVariablesHeader>
                                            <EnvironmentVariablesTitle />
                                            <EnvironmentVariablesToggle />
                                        </EnvironmentVariablesHeader>
                                        <EnvironmentVariablesContent>
                                            <EnvironmentVariable name="DATABASE_URL" value="postgresql://localhost:5432/mydb">
                                                <EnvironmentVariableName />
                                                <EnvironmentVariableValue />
                                            </EnvironmentVariable>
                                            <EnvironmentVariable name="API_KEY" value="sk-1234567890abcdef">
                                                <EnvironmentVariableName />
                                                <EnvironmentVariableValue />
                                            </EnvironmentVariable>
                                        </EnvironmentVariablesContent>
                                    </EnvironmentVariables>
                                </ComponentCard>
                            )}

                            {/* Web Preview */}
                            {filteredSections.find((s) => s.id === "ai-web-preview") && (
                                <ComponentCard title="Web Preview" id="ai-web-preview">
                                    <WebPreview defaultUrl="https://example.com" className="h-64">
                                        <WebPreviewNavigation>
                                            <WebPreviewNavigationButton tooltip="Back"><ArrowLeftIcon className="size-4" /></WebPreviewNavigationButton>
                                            <WebPreviewNavigationButton tooltip="Forward"><ArrowRightIcon className="size-4" /></WebPreviewNavigationButton>
                                            <WebPreviewNavigationButton tooltip="Refresh"><RotateCwIcon className="size-4" /></WebPreviewNavigationButton>
                                            <WebPreviewUrl />
                                        </WebPreviewNavigation>
                                        <WebPreviewBody />
                                        <WebPreviewConsole logs={[
                                            { level: "log", message: "Page loaded", timestamp: new Date() },
                                            { level: "warn", message: "Deprecated API usage", timestamp: new Date() }
                                        ]} />
                                    </WebPreview>
                                </ComponentCard>
                            )}

                            {/* Sandbox */}
                            {filteredSections.find((s) => s.id === "ai-sandbox") && (
                                <ComponentCard title="Sandbox" id="ai-sandbox">
                                    <Sandbox>
                                        <SandboxHeader title="Code Sandbox" state="output-available" />
                                        <SandboxContent>
                                            <SandboxTabs defaultValue="code">
                                                <SandboxTabsBar>
                                                    <SandboxTabsList>
                                                        <SandboxTabsTrigger value="code">Code</SandboxTabsTrigger>
                                                        <SandboxTabsTrigger value="output">Output</SandboxTabsTrigger>
                                                    </SandboxTabsList>
                                                </SandboxTabsBar>
                                                <SandboxTabContent value="code" className="p-4">
                                                    <CodeBlock code={`console.log("Hello, World!");`} language="javascript" />
                                                </SandboxTabContent>
                                                <SandboxTabContent value="output" className="p-4">
                                                    <pre className="text-sm">Hello, World!</pre>
                                                </SandboxTabContent>
                                            </SandboxTabs>
                                        </SandboxContent>
                                    </Sandbox>
                                </ComponentCard>
                            )}

                            {/* Stack Trace */}
                            {filteredSections.find((s) => s.id === "ai-stack-trace") && (
                                <ComponentCard title="Stack Trace" id="ai-stack-trace">
                                    <StackTrace trace={`TypeError: Cannot read property 'map' of undefined
at UserList (src/components/UserList.tsx:15:23)
at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:14985:18)
at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:17811:13)`}>
                                        <StackTraceHeader>
                                            <StackTraceError>
                                                <StackTraceErrorType />
                                                <StackTraceErrorMessage />
                                            </StackTraceError>
                                        </StackTraceHeader>
                                        <StackTraceFrames />
                                    </StackTrace>
                                </ComponentCard>
                            )}

                            {/* Image Zoom */}
                            {filteredSections.find((s) => s.id === "ai-image-zoom") && (
                                <ComponentCard title="Image Zoom" id="ai-image-zoom">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">Click the image to zoom in. Click again or press Escape to close.</p>
                                        <ImageZoom>
                                            <img
                                                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=900&fit=crop"
                                                alt="Code on a laptop screen"
                                                className="rounded-lg w-full max-w-md"
                                            />
                                        </ImageZoom>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Editor */}
                            {filteredSections.find((s) => s.id === "ai-editor") && (
                                <ComponentCard title="Editor" id="ai-editor">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">A rich text editor with slash commands. Type / to open the command menu. Select text to see formatting options.</p>
                                        <EditorProvider
                                            className="min-h-[200px] rounded-lg border p-4"
                                            placeholder="Start typing... Use / for commands"
                                        >
                                            <EditorBubbleMenu>
                                                <EditorFormatBold />
                                                <EditorFormatItalic />
                                                <EditorFormatStrike />
                                                <EditorFormatUnderline />
                                            </EditorBubbleMenu>
                                        </EditorProvider>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Color Picker */}
                            {filteredSections.find((s) => s.id === "ai-color-picker") && (
                                <ComponentCard title="Color Picker" id="ai-color-picker">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">A full-featured color picker with hue, saturation, alpha controls and multiple output formats.</p>
                                        <ColorPicker defaultValue="#6366f1" className="w-full max-w-xs">
                                            <ColorPickerSelection className="h-40 rounded-lg" />
                                            <ColorPickerHue />
                                            <ColorPickerAlpha />
                                            <div className="flex items-center gap-2">
                                                <ColorPickerEyeDropper />
                                                <ColorPickerOutput />
                                                <ColorPickerFormat />
                                            </div>
                                        </ColorPicker>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Image Crop */}
                            {filteredSections.find((s) => s.id === "ai-image-crop") && (
                                <ComponentCard title="Image Crop" id="ai-image-crop">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">Upload an image to crop it. Drag the crop area to adjust, then use the buttons to apply or reset.</p>
                                        <ImageCropDemo />
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Kanban */}
                            {filteredSections.find((s) => s.id === "ai-kanban") && (
                                <ComponentCard title="Kanban" id="ai-kanban">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">A drag-and-drop Kanban board. Drag cards between columns to reorganize.</p>
                                        <KanbanDemo />
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Gantt */}
                            {filteredSections.find((s) => s.id === "ai-gantt") && (
                                <ComponentCard title="Gantt" id="ai-gantt">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">A project timeline Gantt chart with draggable feature bars and today marker.</p>
                                        <GanttDemo />
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Marquee */}
                            {filteredSections.find((s) => s.id === "ai-marquee") && (
                                <ComponentCard title="Marquee" id="ai-marquee">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">An auto-scrolling marquee that pauses on hover. Perfect for logos, testimonials, or announcements.</p>
                                        <Marquee>
                                            <MarqueeFade side="left" />
                                            <MarqueeContent speed={30}>
                                                {["React", "Next.js", "TypeScript", "Tailwind", "Shadcn", "Kibo UI"].map((tech) => (
                                                    <MarqueeItem key={tech}>
                                                        <div className="flex items-center justify-center rounded-lg border bg-muted px-4 py-2">
                                                            <span className="font-medium">{tech}</span>
                                                        </div>
                                                    </MarqueeItem>
                                                ))}
                                            </MarqueeContent>
                                            <MarqueeFade side="right" />
                                        </Marquee>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* QR Code */}
                            {filteredSections.find((s) => s.id === "ai-qr-code") && (
                                <ComponentCard title="QR Code" id="ai-qr-code">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">A dynamically generated QR code that respects your theme colors.</p>
                                        <div className="flex items-center gap-6">
                                            <div className="w-32 h-32">
                                                <QRCode data="https://theplaiground.co" />
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-medium">Scan to visit</p>
                                                <p className="text-muted-foreground">theplaiground.co</p>
                                            </div>
                                        </div>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Source (from Prompt Kit) */}
                            {filteredSections.find((s) => s.id === "ai-source") && (
                                <ComponentCard title="Source" id="ai-source">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">A hoverable link component that shows a preview card with the source's title and description.</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">Check out</span>
                                            <PromptKitSource href="https://theplaiground.co">
                                                <PromptKitSourceTrigger showFavicon />
                                                <PromptKitSourceContent
                                                    title="The Plaiground"
                                                    description="A creative playground for building and exploring AI-powered experiences."
                                                />
                                            </PromptKitSource>
                                            <span className="text-sm">for more!</span>
                                        </div>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* RANT VOICE COMPONENTS */}

                            {/* Live Waveform */}
                            {filteredSections.find((s) => s.id === "voice-live-waveform") && (
                                <ComponentCard title="Live Waveform" id="voice-live-waveform">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">A real-time audio waveform visualizer that responds to microphone input.</p>
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-48 rounded-lg border bg-muted/50 p-2">
                                                <LiveWaveform active={false} height={48} barWidth={3} barGap={1} mode="static" />
                                            </div>
                                            <p className="text-xs text-muted-foreground">Click to activate microphone</p>
                                        </div>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Voice Button */}
                            {filteredSections.find((s) => s.id === "voice-voice-button") && (
                                <ComponentCard title="Voice Button" id="voice-voice-button">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">A button with built-in waveform visualization for voice input states.</p>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <VoiceButton state="idle" label="Idle" trailing="⌥Space" />
                                            <VoiceButton state="recording" label="Recording" />
                                            <VoiceButton state="processing" label="Processing" />
                                            <VoiceButton state="success" label="Success" />
                                        </div>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Mic Selector */}
                            {filteredSections.find((s) => s.id === "voice-mic-selector") && (
                                <ComponentCard title="Mic Selector" id="voice-mic-selector">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">A dropdown for selecting and testing microphone devices with live preview.</p>
                                        <div className="flex items-center gap-4">
                                            <MicSelector />
                                        </div>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Orb */}
                            {filteredSections.find((s) => s.id === "voice-orb") && (
                                <ComponentCard title="Orb" id="voice-orb">
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">An animated orb visualization for AI voice interactions.</p>
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="flex flex-col items-center gap-2">
                                                <Orb size={80} state="idle" />
                                                <span className="text-xs text-muted-foreground">Idle</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <Orb size={80} state="listening" />
                                                <span className="text-xs text-muted-foreground">Listening</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <Orb size={80} state="thinking" />
                                                <span className="text-xs text-muted-foreground">Thinking</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <Orb size={80} state="speaking" />
                                                <span className="text-xs text-muted-foreground">Speaking</span>
                                            </div>
                                        </div>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* UI COMPONENTS */}

                            {/* Accordion */}
                            {filteredSections.find((s) => s.id === "accordion") && (
                                <ComponentCard title="Accordion" id="accordion">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1"><AccordionTrigger>Is it accessible?</AccordionTrigger><AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent></AccordionItem>
                                        <AccordionItem value="item-2"><AccordionTrigger>Is it styled?</AccordionTrigger><AccordionContent>Yes. It comes with default styles that match your theme.</AccordionContent></AccordionItem>
                                    </Accordion>
                                </ComponentCard>
                            )}

                            {/* Alert */}
                            {filteredSections.find((s) => s.id === "alert") && (
                                <ComponentCard title="Alert" id="alert">
                                    <div className="space-y-4">
                                        <Alert><AlertTitle>Heads up!</AlertTitle><AlertDescription>You can add components using the CLI.</AlertDescription></Alert>
                                        <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Your session has expired.</AlertDescription></Alert>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Alert Dialog */}
                            {filteredSections.find((s) => s.id === "alert-dialog") && (
                                <ComponentCard title="Alert Dialog" id="alert-dialog">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild><Button variant="outline">Show Dialog</Button></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                                            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Continue</AlertDialogAction></AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </ComponentCard>
                            )}

                            {/* Avatar */}
                            {filteredSections.find((s) => s.id === "avatar") && (
                                <ComponentCard title="Avatar" id="avatar">
                                    <div className="flex gap-4">
                                        <Avatar><AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /><AvatarFallback>CN</AvatarFallback></Avatar>
                                        <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Badge */}
                            {filteredSections.find((s) => s.id === "badge") && (
                                <ComponentCard title="Badge" id="badge">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Default</Badge>
                                        <Badge variant="secondary">Secondary</Badge>
                                        <Badge variant="outline">Outline</Badge>
                                        <Badge variant="destructive">Destructive</Badge>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Breadcrumb */}
                            {filteredSections.find((s) => s.id === "breadcrumb") && (
                                <ComponentCard title="Breadcrumb" id="breadcrumb">
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </ComponentCard>
                            )}

                            {/* Button */}
                            {filteredSections.find((s) => s.id === "button") && (
                                <ComponentCard title="Button" id="button">
                                    <div className="flex flex-wrap gap-4">
                                        <Button>Default</Button>
                                        <Button variant="secondary">Secondary</Button>
                                        <Button variant="destructive">Destructive</Button>
                                        <Button variant="outline">Outline</Button>
                                        <Button variant="ghost">Ghost</Button>
                                        <Button variant="link">Link</Button>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Button Group */}
                            {filteredSections.find((s) => s.id === "button-group") && (
                                <ComponentCard title="Button Group" id="button-group">
                                    <ButtonGroup>
                                        <Button variant="outline">Left</Button>
                                        <Button variant="outline">Center</Button>
                                        <Button variant="outline">Right</Button>
                                    </ButtonGroup>
                                </ComponentCard>
                            )}

                            {/* Calendar */}
                            {filteredSections.find((s) => s.id === "calendar") && (
                                <ComponentCard title="Calendar" id="calendar">
                                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                                </ComponentCard>
                            )}

                            {/* Card */}
                            {filteredSections.find((s) => s.id === "card") && (
                                <ComponentCard title="Card" id="card">
                                    <Card className="max-w-sm">
                                        <CardHeader><CardTitle>Card Title</CardTitle><CardDescription>Card Description</CardDescription></CardHeader>
                                        <CardContent><p>Card content goes here.</p></CardContent>
                                        <CardFooter><Button className="w-full">Action</Button></CardFooter>
                                    </Card>
                                </ComponentCard>
                            )}

                            {/* Checkbox */}
                            {filteredSections.find((s) => s.id === "checkbox") && (
                                <ComponentCard title="Checkbox" id="checkbox">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <Label htmlFor="terms">Accept terms and conditions</Label>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Collapsible */}
                            {filteredSections.find((s) => s.id === "collapsible") && (
                                <ComponentCard title="Collapsible" id="collapsible">
                                    <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen} className="w-[350px] space-y-2">
                                        <div className="flex items-center justify-between space-x-4 px-4">
                                            <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
                                            <CollapsibleTrigger asChild><Button variant="ghost" size="sm">Toggle</Button></CollapsibleTrigger>
                                        </div>
                                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@radix-ui/primitives</div>
                                        <CollapsibleContent className="space-y-2">
                                            <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">@radix-ui/colors</div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </ComponentCard>
                            )}

                            {/* Dialog */}
                            {filteredSections.find((s) => s.id === "dialog") && (
                                <ComponentCard title="Dialog" id="dialog">
                                    <Dialog>
                                        <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Make changes to your profile here.</DialogDescription></DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">Name</Label>
                                                    <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                                                </div>
                                            </div>
                                            <DialogFooter><Button type="submit">Save changes</Button></DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </ComponentCard>
                            )}

                            {/* Dropdown Menu */}
                            {filteredSections.find((s) => s.id === "dropdown-menu") && (
                                <ComponentCard title="Dropdown Menu" id="dropdown-menu">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button variant="outline">Open Menu</Button></DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Settings</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Log out</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </ComponentCard>
                            )}

                            {/* Input */}
                            {filteredSections.find((s) => s.id === "input") && (
                                <ComponentCard title="Input" id="input">
                                    <div className="grid w-full max-w-sm items-center gap-4">
                                        <Input type="email" placeholder="Email" />
                                        <Input type="password" placeholder="Password" />
                                        <Input disabled type="text" placeholder="Disabled" />
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Kbd */}
                            {filteredSections.find((s) => s.id === "kbd") && (
                                <ComponentCard title="Kbd" id="kbd">
                                    <div className="flex gap-2 items-center">
                                        <span>Press</span><Kbd>⌘</Kbd><Kbd>K</Kbd><span>to open command palette</span>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Label */}
                            {filteredSections.find((s) => s.id === "label") && (
                                <ComponentCard title="Label" id="label">
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input type="email" id="email" placeholder="Email" />
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Popover */}
                            {filteredSections.find((s) => s.id === "popover") && (
                                <ComponentCard title="Popover" id="popover">
                                    <Popover>
                                        <PopoverTrigger asChild><Button variant="outline">Open Popover</Button></PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Dimensions</h4>
                                                    <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </ComponentCard>
                            )}

                            {/* Progress */}
                            {filteredSections.find((s) => s.id === "progress") && (
                                <ComponentCard title="Progress" id="progress">
                                    <Progress value={progress} className="w-[60%]" />
                                </ComponentCard>
                            )}

                            {/* Radio Group */}
                            {filteredSections.find((s) => s.id === "radio-group") && (
                                <ComponentCard title="Radio Group" id="radio-group">
                                    <RadioGroup defaultValue="comfortable">
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="default" id="r1" /><Label htmlFor="r1">Default</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2">Comfortable</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="compact" id="r3" /><Label htmlFor="r3">Compact</Label></div>
                                    </RadioGroup>
                                </ComponentCard>
                            )}

                            {/* Scroll Area */}
                            {filteredSections.find((s) => s.id === "scroll-area") && (
                                <ComponentCard title="Scroll Area" id="scroll-area">
                                    <ScrollArea className="h-72 w-48 rounded-md border">
                                        <div className="p-4">
                                            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                                            {Array.from({ length: 20 }).map((_, i) => (
                                                <React.Fragment key={i}>
                                                    <div className="text-sm">Tag {i + 1}</div>
                                                    <Separator className="my-2" />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </ComponentCard>
                            )}

                            {/* Select */}
                            {filteredSections.find((s) => s.id === "select") && (
                                <ComponentCard title="Select" id="select">
                                    <Select>
                                        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select a fruit" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </ComponentCard>
                            )}

                            {/* Separator */}
                            {filteredSections.find((s) => s.id === "separator") && (
                                <ComponentCard title="Separator" id="separator">
                                    <div>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                                            <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="flex h-5 items-center space-x-4 text-sm">
                                            <div>Blog</div><Separator orientation="vertical" /><div>Docs</div><Separator orientation="vertical" /><div>Source</div>
                                        </div>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Skeleton */}
                            {filteredSections.find((s) => s.id === "skeleton") && (
                                <ComponentCard title="Skeleton" id="skeleton">
                                    <div className="flex items-center space-x-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[250px]" />
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Slider */}
                            {filteredSections.find((s) => s.id === "slider") && (
                                <ComponentCard title="Slider" id="slider">
                                    <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
                                </ComponentCard>
                            )}

                            {/* Spinner */}
                            {filteredSections.find((s) => s.id === "spinner") && (
                                <ComponentCard title="Spinner" id="spinner">
                                    <div className="flex gap-4">
                                        <Spinner size="sm" />
                                        <Spinner size="default" />
                                        <Spinner size="lg" />
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Switch */}
                            {filteredSections.find((s) => s.id === "switch") && (
                                <ComponentCard title="Switch" id="switch">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="airplane-mode" />
                                        <Label htmlFor="airplane-mode">Airplane Mode</Label>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Table */}
                            {filteredSections.find((s) => s.id === "table") && (
                                <ComponentCard title="Table" id="table">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Invoice</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow><TableCell className="font-medium">INV001</TableCell><TableCell>Paid</TableCell><TableCell className="text-right">$250.00</TableCell></TableRow>
                                            <TableRow><TableCell className="font-medium">INV002</TableCell><TableCell>Pending</TableCell><TableCell className="text-right">$150.00</TableCell></TableRow>
                                        </TableBody>
                                    </Table>
                                </ComponentCard>
                            )}

                            {/* Tabs */}
                            {filteredSections.find((s) => s.id === "tabs") && (
                                <ComponentCard title="Tabs" id="tabs">
                                    <Tabs defaultValue="account" className="w-[400px]">
                                        <TabsList><TabsTrigger value="account">Account</TabsTrigger><TabsTrigger value="password">Password</TabsTrigger></TabsList>
                                        <TabsContent value="account"><p className="text-sm text-muted-foreground">Make changes to your account here.</p></TabsContent>
                                        <TabsContent value="password"><p className="text-sm text-muted-foreground">Change your password here.</p></TabsContent>
                                    </Tabs>
                                </ComponentCard>
                            )}

                            {/* Textarea */}
                            {filteredSections.find((s) => s.id === "textarea") && (
                                <ComponentCard title="Textarea" id="textarea">
                                    <Textarea placeholder="Type your message here." />
                                </ComponentCard>
                            )}

                            {/* Toggle */}
                            {filteredSections.find((s) => s.id === "toggle") && (
                                <ComponentCard title="Toggle" id="toggle">
                                    <div className="flex gap-2">
                                        <Toggle aria-label="Toggle bold"><span className="font-bold">B</span></Toggle>
                                        <Toggle aria-label="Toggle italic"><span className="italic">I</span></Toggle>
                                        <Toggle aria-label="Toggle underline"><span className="underline">U</span></Toggle>
                                    </div>
                                </ComponentCard>
                            )}

                            {/* Tooltip */}
                            {filteredSections.find((s) => s.id === "tooltip") && (
                                <ComponentCard title="Tooltip" id="tooltip">
                                    <Tooltip>
                                        <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
                                        <TooltipContent><p>Add to library</p></TooltipContent>
                                    </Tooltip>
                                </ComponentCard>
                            )}

                            {filteredSections.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <p className="text-muted-foreground">No components found.</p>
                                    <Button variant="link" onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}>Clear filters</Button>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </TooltipProvider>
    );
}
