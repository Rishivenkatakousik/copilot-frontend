// import { sql } from "drizzle-orm";
// import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// export const users = pgTable("users", {
//   id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
//   username: text("username").notNull().unique(),
//   password: text("password").notNull(),
// });

// export const insertUserSchema = createInsertSchema(users).pick({
//   username: true,
//   password: true,
// });

// export type InsertUser = z.infer<typeof insertUserSchema>;
// export type User = typeof users.$inferSelect;

export const codeLanguages = ["python", "javascript", "cpp"] as const;
export type CodeLanguage = typeof codeLanguages[number];

export interface PromptHistory {
  id: string;
  prompt: string;
  language: CodeLanguage;
  code: string;
  timestamp: number;
}

export const generateRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty"),
  language: z.enum(codeLanguages),
});

export type GenerateRequest = z.infer<typeof generateRequestSchema>;

export interface GenerateResponse {
  code: string;
}
