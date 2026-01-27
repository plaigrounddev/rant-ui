import { type NextRequest, NextResponse } from "next/server";
import { v0 } from "v0-sdk";
import {
  createErrorResponse,
  createRateLimitResponse,
  handleRequestRateLimit,
} from "@/lib/rant-coder/request-utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 120;

// Type for the chat response we expect
interface ChatResponse {
  id: string;
  demo?: string;
  messages?: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    experimental_content?: unknown;
  }>;
}

export async function POST(request: NextRequest) {
  // Handle rate limiting with the utility
  try {
    const rateLimitResult = await handleRequestRateLimit(request);

    if (rateLimitResult.success === false) {
      return createRateLimitResponse(rateLimitResult.errorResponse);
    }
    const { message, chatId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    let chat: ChatResponse;

    if (chatId) {
      // continue existing chat
      chat = await v0.chats.sendMessage({
        chatId,
        message,
      }) as unknown as ChatResponse;
    } else {
      // create new chat
      chat = await v0.chats.create({
        message,
      }) as unknown as ChatResponse;
    }

    return NextResponse.json({
      id: chat.id,
      demo: chat.demo,
      messages: chat.messages?.map((msg) => ({
        ...msg,
        experimental_content: (msg as { experimental_content?: unknown }).experimental_content,
      })),
    });
  } catch (error) {
    console.error("V0 API Error:", error);
    return createErrorResponse(error);
  }
}

