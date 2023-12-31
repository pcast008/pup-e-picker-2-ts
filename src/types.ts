import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export type CreateDog = {
  name: string;
  image: string;
  description: string;
};

export type ActivePage = "all" | "favorites" | "unfavorites" | "form";
