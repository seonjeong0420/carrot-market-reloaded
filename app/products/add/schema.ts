import { z } from "zod";

export const productSchema = z.object({
  photo: z.string({
    required_error: "Photo is required",
  }),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3)
    .max(20),
  description: z.string({
    required_error: "Description is required",
  }),
  price: z.coerce.number({
    required_error: "Price is required",
  }),
});

/**
 * z.infer : schema로부터 typescript에서 쓸 수 있는 타입을 가져온다.
 */
export type ProductType = z.infer<typeof productSchema>;
