import { z } from "zod";

// Define the schema for the array of strings
const CompaniesArraySchema = z.array(z.string());

// Define the schema for the object with a message property
const CompanyMessageSchema = z.object({
  message: z.string(),
});

export const CompaniesNameSchema = z.union([
  CompaniesArraySchema,
  CompanyMessageSchema,
]);

export type CompaniesName = z.infer<typeof CompaniesNameSchema>;
