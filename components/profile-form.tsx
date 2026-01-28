"use client";

import { readStreamableValue } from "@ai-sdk/rsc";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BookText,
  Brain,
  Briefcase,
  Code,
  Loader2,
  User,
  Wrench,
  Zap,
} from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { enrichProfile } from "../app/actions";
import { BlockPreviewIntro } from "./block-intro";

const profileFormSchema = z.object({
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

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type EnrichedProfile = {
  suggestedTags: string[];
  categoryMatch: string;
  skillLevel: string;
  careerSuggestions: string[];
};

export function ProfileForm() {
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichedData, setEnrichedData] = useState<EnrichedProfile | null>(
    null
  );
  const [isFormTouched, setIsFormTouched] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      title: "",
      bio: "",
      skills: "",
    },
  });

  const onFieldChange = () => {
    if (!isFormTouched) setIsFormTouched(true);
  };

  async function onSubmit(data: ProfileFormValues) {
    setIsEnriching(true);
    try {
      const { object } = await enrichProfile(data);
      for await (const partialObject of readStreamableValue(object)) {
        if (partialObject) {
          setEnrichedData(partialObject);
        }
      }
    } catch (error) {
      console.error("Error enriching profile:", error);
    } finally {
      setIsEnriching(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <LayoutGroup>
        <motion.div
          className={cn(
            "grid gap-8 lg:grid-cols-2 lg:gap-12",
            enrichedData ? "items-start" : "items-center"
          )}
          layout
        >
          {/* Profile Form */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="lg:sticky lg:top-8"
            initial={{ opacity: 0, y: 20 }}
            layout
            transition={{
              layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
              duration: 0.5,
            }}
          >
            <Card className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="-top-px absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <CardHeader className="space-y-1.5 pb-6 lg:pb-8">
                <CardTitle className="font-semibold text-xl tracking-tight lg:text-2xl">
                  Professional Profile
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm lg:text-base">
                  Fill in your professional details for AI-powered career
                  insights.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6 lg:pb-8">
                <Form {...form}>
                  <form
                    className="space-y-5 lg:space-y-7"
                    onChange={onFieldChange}
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-medium text-sm">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className={cn(
                                "h-10 rounded-xl border-border/50 bg-background/50",
                                "focus:border-primary/50 focus:bg-background focus:ring-1 focus:ring-primary/20",
                                field.value &&
                                "border-primary/30 bg-primary/[0.03]"
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-medium text-sm">
                            <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                            Professional Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Senior Software Engineer"
                              {...field}
                              className={cn(
                                "h-10 rounded-xl border-border/50 bg-background/50",
                                "focus:border-primary/50 focus:bg-background focus:ring-1 focus:ring-primary/20",
                                field.value &&
                                "border-primary/30 bg-primary/[0.03]"
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-medium text-sm">
                            <BookText className="h-3.5 w-3.5 text-muted-foreground" />
                            Professional Bio
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className={cn(
                                "min-h-[140px] resize-none rounded-xl border-border/50 bg-background/50",
                                "focus:border-primary/50 focus:bg-background focus:ring-1 focus:ring-primary/20",
                                field.value &&
                                "border-primary/30 bg-primary/[0.03]"
                              )}
                              placeholder="Tell us about your professional experience, achievements, and interests..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground/80 text-xs">
                            Include key achievements, responsibilities, and
                            career goals for better insights.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-medium text-sm">
                            <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                            Skills (optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. React, TypeScript, Node.js"
                              {...field}
                              className={cn(
                                "h-10 rounded-xl border-border/50 bg-background/50",
                                "focus:border-primary/50 focus:bg-background focus:ring-1 focus:ring-primary/20",
                                field.value &&
                                "border-primary/30 bg-primary/[0.03]"
                              )}
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground/80 text-xs">
                            Separate skills with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <AnimatePresence>
                      {enrichedData ? null : (
                        <motion.div exit={{ opacity: 0, y: 10 }} layout>
                          <Button
                            className={cn(
                              "mt-2 h-10 w-full rounded-full font-medium text-sm transition-all lg:mt-4 lg:h-11 lg:text-base",
                              !isFormTouched && "opacity-50",
                              isEnriching && "bg-primary/90"
                            )}
                            disabled={isEnriching || !isFormTouched}
                            type="submit"
                          >
                            {isEnriching ? (
                              <>
                                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin lg:h-4 lg:w-4" />
                                Analyzing Profile...
                              </>
                            ) : (
                              <>
                                <Zap className="mr-2 h-3.5 w-3.5 lg:h-4 lg:w-4" />
                                Analyze Profile
                              </>
                            )}
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Insights */}
          <div className="space-y-8 lg:space-y-12">
            <div className="relative min-h-[200px]">
              <AnimatePresence initial={false} mode="wait">
                {enrichedData ? (
                  <motion.div
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.32, 0.72, 0, 1],
                        staggerChildren: 0.1,
                        delayChildren: 0.2,
                      },
                    }}
                    className="absolute inset-0"
                    exit={{
                      opacity: 0,
                      scale: 0.98,
                      y: 10,
                      transition: {
                        duration: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    }}
                    initial={{ opacity: 0, scale: 1.02, y: 20 }}
                    key="insights"
                    layout
                  >
                    <Card
                      className={cn(
                        "relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60",
                        isEnriching && "animate-pulse"
                      )}
                    >
                      <motion.div
                        className="-top-px absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                        layout
                      />
                      <CardHeader className="space-y-1.5 pb-6 lg:pb-8">
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          layout="position"
                          transition={{ duration: 0.4 }}
                        >
                          <Brain className="h-4 w-4 text-primary/80 lg:h-5 lg:w-5" />
                          <CardTitle className="font-semibold text-xl tracking-tight lg:text-2xl">
                            AI Insights
                          </CardTitle>
                        </motion.div>
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          initial={{ opacity: 0, y: 10 }}
                          layout="position"
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <CardDescription className="text-muted-foreground text-sm lg:text-base">
                            AI-generated insights based on your professional
                            profile
                          </CardDescription>
                        </motion.div>
                      </CardHeader>
                      <CardContent className="space-y-6 lg:space-y-8">
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2.5 lg:space-y-3"
                          initial={{ opacity: 0, y: 20 }}
                          layout
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <motion.h4
                            className="flex items-center gap-2 font-medium text-muted-foreground text-sm"
                            layout="position"
                          >
                            <ArrowRight className="h-3 w-3 text-primary/70 lg:h-3.5 lg:w-3.5" />
                            Suggested Tags
                          </motion.h4>
                          <motion.div className="flex flex-wrap gap-1.5" layout>
                            <AnimatePresence mode="popLayout">
                              {enrichedData?.suggestedTags?.map((tag, i) => (
                                <motion.div
                                  animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                      duration: 0.3,
                                      delay: 0.3 + i * 0.05,
                                      ease: [0.32, 0.72, 0, 1],
                                    },
                                  }}
                                  exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    transition: { duration: 0.2 },
                                  }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  key={tag}
                                  layout
                                >
                                  <Badge
                                    className="rounded-lg border-primary/20 bg-primary/[0.03] px-2.5 py-1 font-medium text-xs hover:bg-primary/[0.06]"
                                    variant="secondary"
                                  >
                                    {tag}
                                  </Badge>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </motion.div>
                        </motion.div>

                        {/* Career Category */}
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2.5 lg:space-y-3"
                          initial={{ opacity: 0, y: 20 }}
                          layout
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          <motion.h4
                            className="flex items-center gap-2 font-medium text-muted-foreground text-sm"
                            layout="position"
                          >
                            <ArrowRight className="h-3 w-3 text-primary/70 lg:h-3.5 lg:w-3.5" />
                            Career Category
                          </motion.h4>
                          <motion.div layout>
                            <Badge
                              className="rounded-lg border-primary/20 px-2.5 py-1 font-medium text-xs"
                              variant="outline"
                            >
                              {enrichedData?.categoryMatch || "Analyzing..."}
                            </Badge>
                          </motion.div>
                        </motion.div>

                        {/* Experience Level */}
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2.5 lg:space-y-3"
                          initial={{ opacity: 0, y: 20 }}
                          layout
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          <motion.h4
                            className="flex items-center gap-2 font-medium text-muted-foreground text-sm"
                            layout="position"
                          >
                            <ArrowRight className="h-3 w-3 text-primary/70 lg:h-3.5 lg:w-3.5" />
                            Experience Level
                          </motion.h4>
                          <motion.div layout>
                            <Badge
                              className="rounded-lg border-primary/20 px-2.5 py-1 font-medium text-xs"
                              variant="outline"
                            >
                              {enrichedData?.skillLevel || "Analyzing..."}
                            </Badge>
                          </motion.div>
                        </motion.div>

                        {/* Career Suggestions */}
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2.5 lg:space-y-3"
                          initial={{ opacity: 0, y: 20 }}
                          layout
                          transition={{ duration: 0.4, delay: 0.6 }}
                        >
                          <motion.h4
                            className="flex items-center gap-2 font-medium text-muted-foreground text-sm"
                            layout="position"
                          >
                            <ArrowRight className="h-3 w-3 text-primary/70 lg:h-3.5 lg:w-3.5" />
                            Career Path Suggestions
                          </motion.h4>
                          <motion.ul className="space-y-2" layout>
                            <AnimatePresence mode="popLayout">
                              {enrichedData?.careerSuggestions?.map(
                                (suggestion, i) => (
                                  <motion.li
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                      y: 0,
                                      transition: {
                                        duration: 0.4,
                                        delay: 0.7 + i * 0.1,
                                        ease: [0.32, 0.72, 0, 1],
                                      },
                                    }}
                                    className="rounded-xl border border-primary/10 bg-primary/[0.03] p-[10px] text-xs transition-colors hover:bg-primary/[0.06]"
                                    exit={{
                                      opacity: 0,
                                      x: -10,
                                      transition: { duration: 0.2 },
                                    }}
                                    initial={{ opacity: 0, x: -10, y: 10 }}
                                    key={suggestion}
                                    layout
                                  >
                                    {suggestion}
                                  </motion.li>
                                )
                              )}
                            </AnimatePresence>
                          </motion.ul>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    }}
                    className="absolute inset-0 origin-center"
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      y: -10,
                      transition: {
                        duration: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    }}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    key="intro"
                  >
                    <motion.div
                      className="h-full text-muted-foreground text-sm"
                      layout
                    >
                      <div className="hidden lg:block">
                        <BlockPreviewIntro
                          description="A smart profile form that uses AI to analyze and enrich user profiles with relevant tags, categories, and career suggestions."
                          title="AI-Enriched Profile Form"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
