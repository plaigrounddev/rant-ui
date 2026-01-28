import { z } from "zod";

export const profileFormSchema = z.object({
    fullName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    bio: z.string().min(10, {
        message: "Bio must be at least 10 characters.",
    }),
    skills: z.string().optional(),
});

export const enrichedProfileSchema = z.object({
    suggestedTags: z.array(z.string()).describe("5-7 relevant skill tags based on the profile"),
    categoryMatch: z.string().describe("A broad career category that best matches their background"),
    skillLevel: z.enum(["Junior", "Mid-Level", "Senior", "Expert"]).describe("Estimated skill level"),
    careerSuggestions: z.array(z.string()).describe("2-3 career path suggestions"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type EnrichedProfile = z.infer<typeof enrichedProfileSchema>;
