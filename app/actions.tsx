"use server";

import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "@ai-sdk/rsc";
import { streamObject } from "ai";
import type { z } from "zod";
import { enrichedProfileSchema, type profileFormSchema } from "../lib/schema";

export async function enrichProfile(data: z.infer<typeof profileFormSchema>) {
  const stream = createStreamableValue();
  const { fullName, title, bio, skills } = data;

  (async () => {
    const { partialObjectStream } = streamObject({
      schema: enrichedProfileSchema,
      model: openai("gpt-4.1-mini"),
      system:
        "You are a professional career advisor and skills analyst. Analyze the given profile and provide structured insights.",
      messages: [
        {
          role: "user",
          content: `Given the following professional profile, analyze it and provide insights:

  Profile:
  Name: ${fullName}
  Title: ${title}
  Bio: ${bio}
  ${skills ? `Skills: ${skills}` : ""}

  Provide:
  1. 5-7 relevant skill tags based on the profile
  2. A broad career category that best matches their background
  3. An estimated skill level (Junior, Mid-Level, Senior, or Expert)
  4. 2-3 career path suggestions based on their experience and interests`,
        },
      ],
    });

    for await (const element of partialObjectStream) {
      stream.update(element);
    }
    stream.done();
  })();

  return { object: stream.value };
}
