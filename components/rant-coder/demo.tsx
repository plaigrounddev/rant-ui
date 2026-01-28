"use client";

import { Eye, MonitorIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  Conversation,
  ConversationContent,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { PromptBox } from "@/components/ui/chatgpt-prompt-input";

import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewNavigation,
  WebPreviewUrl,
} from "@/components/ai-elements/web-preview";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Countdown } from "./countdown";
import { MessageRenderer } from "./message-renderer";

interface Chat {
  id: string;
  demo: string;
  messages?: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    experimental_content?: any; // The structured content from v0 API
  }>;
}

export function Demo() {
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    Array<{
      type: "user" | "assistant";
      content: string | any; // Can be string or MessageBinaryFormat
    }>
  >([]);

  const handleSendMessage = async (
    text: string,
    image: string | null
  ) => {
    if (!text?.trim() || isLoading) return;

    const userMessage = text.trim();
    setMessage("");
    setIsLoading(true);

    setChatHistory((prev) => [...prev, { type: "user", content: userMessage }]);

    try {
      const response = await fetch(
        "/api/rant-coder", // Rant Coder API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            chatId: currentChat?.id,
          }),
        }
      );

      if (!response.ok) {
        let errorText = "Failed to create chat";
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorText = errorData.error;
          }
        } catch {
          // If we can't parse the error, use the status text or default message
          errorText = response.statusText || "Failed to create chat";
        }
        throw new Error(errorText);
      }

      const chat: Chat = await response.json();
      setCurrentChat(chat);
      setShowPreview(true); // Show preview after generating content

      // Update chat history with structured content from v0 API
      if (chat.messages) {
        setChatHistory(
          chat.messages.map((msg) => ({
            type: msg.role,
            // Use experimental_content if available, otherwise fall back to plain content
            content: msg.experimental_content || msg.content,
          }))
        );
      } else {
        // Final fallback
        setChatHistory((prev) => [
          ...prev,
          {
            type: "assistant",
            content: "Generated new app preview. Check the preview panel!",
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        "Sorry, there was an error creating your app. Please try again.";

      // Use the actual error message if it's available and user-friendly
      if (error instanceof Error) {
        if (error.message.includes("Rate limit exceeded")) {
          errorMessage =
            "Too many requests. Please wait a moment before trying again.";
        } else if (error.message.includes("fetch")) {
          errorMessage =
            "Unable to connect to the service. Please check your connection and try again.";
        } else if (error.message !== "Failed to create chat") {
          // Use the server's error message if it's not the generic one
          errorMessage = `Error: ${error.message}`;
        }
      }

      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background lg:flex-row">
      {/* Mobile/Tablet Tab Navigation */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div className="relative flex">
          <Button
            className={`relative flex-1 px-6 py-4 font-medium text-sm transition-all duration-200 ease-out ${showPreview
              ? "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              : "bg-muted/80 text-foreground shadow-sm"
              }`}
            onClick={() => setShowPreview(false)}
            variant="ghost"
          >
            <span className="relative z-10">Chat</span>
            {!showPreview && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
            )}
          </Button>
          <Button
            className={`relative flex-1 px-6 py-4 font-medium text-sm transition-all duration-200 ease-out ${showPreview
              ? "bg-muted/80 text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            onClick={() => setShowPreview(true)}
            variant="ghost"
          >
            <span className="relative z-10">Preview</span>
            {showPreview && (
              <div className="absolute inset-0 rounded-t-lg bg-gradient-to-r from-primary/10 to-primary/5" />
            )}

            {/* Status indicators */}
            <div className="absolute top-3 right-3 flex items-center gap-1">
              {currentChat && !showPreview && (
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              )}
              {isLoading && (
                <span className="h-2 w-2 animate-ping rounded-full bg-amber-500" />
              )}
            </div>
          </Button>

          {/* Active tab indicator */}
          <div
            className={`absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out ${showPreview ? "left-1/2 w-1/2" : "left-0 w-1/2"
              }`}
          />
        </div>
      </div>

      {/* Chat Panel */}
      <div
        className={`flex w-full flex-col border-b lg:w-1/2 lg:border-b-0 ${showPreview ? "hidden lg:flex" : "flex"}`}
      >
        {/* Desktop Header */}
        <div className="hidden items-center px-5 py-3.5 lg:flex">
          <div className="flex items-center gap-2">
            <svg
              className="size-6"
              height="16"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M9.50321 5.5H13.2532C13.3123 5.5 13.3704 5.5041 13.4273 5.51203L9.51242 9.42692C9.50424 9.36912 9.5 9.31006 9.5 9.25L9.5 5.5L8 5.5L8 9.25C8 10.7688 9.23122 12 10.75 12H14.5V10.5L10.75 10.5C10.6899 10.5 10.6309 10.4958 10.5731 10.4876L14.4904 6.57028C14.4988 6.62897 14.5032 6.68897 14.5032 6.75V10.5H16.0032V6.75C16.0032 5.23122 14.772 4 13.2532 4H9.50321V5.5ZM0 5V5.00405L5.12525 11.5307C5.74119 12.3151 7.00106 11.8795 7.00106 10.8822V5H5.50106V9.58056L1.90404 5H0Z"
                fill="black"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-8 lg:px-5">
          {chatHistory.length === 0 ? (
            <div className="mt-16 text-center lg:mt-24">
              <h2 className="mb-3 font-semibold text-xl tracking-tight lg:text-4xl 2xl:text-5xl">
                What can I help you build?
              </h2>
            </div>
          ) : (
            <>
              <Conversation>
                <ConversationContent>
                  {chatHistory.map((msg, index) => (
                    <Message from={msg.type} key={index}>
                      <MessageRenderer
                        content={msg.content}
                        messageId={`msg-${index}`}
                        role={msg.type}
                      />
                    </Message>
                  ))}
                </ConversationContent>
              </Conversation>
              {isLoading && (
                <Message from="assistant">
                  <MessageContent>
                    <div className="flex items-center gap-3">
                      <Loader />
                      <div>
                        <div className="text-foreground text-sm">
                          Creating your app...
                        </div>
                        <div className="mt-0.5 text-muted-foreground text-xs">
                          Check the Preview tab once ready
                        </div>
                      </div>
                    </div>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-4 lg:px-5">
          {!currentChat && (
            <div className="mb-3">
              <Suggestions>
                <Suggestion
                  className="border-border bg-muted/50 px-3 py-1.5 text-xs hover:bg-muted/80"
                  onClick={() =>
                    setMessage(
                      "Act as an expert vercel design engineer. You use minimalistic design principles and leverage excellent typography + spacing. Create a minimal, well thought out, hero section."
                    )
                  }
                  suggestion="Hero section"
                />
                <Suggestion
                  className="border-border bg-muted/50 px-3 py-1.5 text-xs hover:bg-muted/80"
                  onClick={() =>
                    setMessage(
                      "Act as an expert vercel design engineer. You use minimalistic design principles and leverage excellent typography + spacing. Build a minimal, well thought out, todo app with React."
                    )
                  }
                  suggestion="Todo app"
                />
                <Suggestion
                  className="border-border bg-muted/50s px-3 py-1.5 text-xs hover:bg-muted/80"
                  onClick={() =>
                    setMessage(
                      "Act as an expert vercel design engineer. You use minimalistic design principles and leverage excellent typography + spacing. Craft a polished landing page for the y combinator rebrand."
                    )
                  }
                  suggestion="YC landing page rebrand"
                />
              </Suggestions>
            </div>
          )}
          <PromptBox
            className="w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onSubmit={handleSendMessage}
            loading={isLoading}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div
        className={cn(
          "flex h-[98vh] w-full flex-col bg-card lg:w-1/2",
          showPreview ? "flex" : "hidden lg:flex",
          "m-1 rounded-lg"
        )}
      >
        <WebPreview className="bg-card">
          <WebPreviewNavigation className=" ">
            <div className="flex items-center gap-2 px-3">
              <Eye className="size-4 text-muted-foreground" />

              <WebPreviewUrl
                placeholder={
                  currentChat?.demo
                    ? "Live preview"
                    : "Preview will appear here"
                }
                readOnly
                value={currentChat?.demo}
              />
            </div>
          </WebPreviewNavigation>
          {currentChat?.demo ? (
            <WebPreviewBody src={currentChat.demo} />
          ) : isLoading ? (
            <div className="flex flex-1 items-start justify-center bg-card">
              <div className="p-8 pt-16 text-center lg:pt-36">
                <h3 className="pb-2.5 font-semibold text-lg text-muted-foreground lg:text-xl">
                  Generating preview...
                </h3>
                <p className="mb-6 text-muted-foreground leading-0.5">
                  Please be patient, this may take a while.
                </p>
                <Countdown
                  className="mx-auto max-w-10"
                  loading={isLoading}
                  onTick={(seconds, ms) => {
                    // Optional callback to track timing
                    console.log(`Timer: ${seconds}s ${ms}ms`);
                  }}
                />
                <p className="pt-2 font-light text-[10px] text-muted-foreground/80">
                  Average time{" "}
                  <span className="rounded-sm border border-border/50 bg-muted/50 px-1 py-0.5 font-mono font-semibold text-primary">
                    110s
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center bg-card">
              <div className="p-8 text-center">
                <MonitorIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="mb-1 font-light text-base text-foreground">
                  Preview
                </h3>
                <p className="font-light text-muted-foreground text-sm">
                  Your app will appear here
                </p>
              </div>
            </div>
          )}
        </WebPreview>
      </div>
    </div>
  );
}

