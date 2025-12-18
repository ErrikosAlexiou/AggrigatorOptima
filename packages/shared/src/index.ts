import { z } from "zod";

export const UserRoleEnum = z.enum(["ADMIN", "USER"]);
export type UserRole = z.infer<typeof UserRoleEnum>;

export const ObservationSchema = z.object({
  observation_id: z.number(),
  cell_id: z.string(),
  lat: z.number(),
  lon: z.number(),
  acquisition_date: z.string(),
  year: z.number().int(),
  month: z.number().int(),
  sensor: z.string(),
  ndvi: z.number(),
  evi: z.number(),
  cloud_cover_pct: z.number(),
  land_cover_type: z.string(),
  baseline_tree_cover_pct: z.number(),
  tree_cover_pct: z.number(),
  deforestation_flag: z.number().int(),
  deforestation_amount_pct: z.number(),
  disturbance_type: z.string(),
  country_part: z.string(),
  priority_conservation_area: z.number()
});

export const ObservationFiltersSchema = z.object({
  page: z.coerce.number().int().optional(),
  pageSize: z.coerce.number().int().optional(),
  year: z.coerce.number().int().optional(),
  month: z.coerce.number().int().optional(),
  country_part: z.string().optional(),
  land_cover_type: z.string().optional(),
  deforestation_flag: z.coerce.number().int().optional(),
  sensor: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  minTreeCover: z.coerce.number().optional(),
  maxCloudCover: z.coerce.number().optional()
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: UserRoleEnum.optional()
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  message: z.string().min(5)
});

export type Observation = z.infer<typeof ObservationSchema>;
export type ObservationFilters = z.infer<typeof ObservationFiltersSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ContactInput = z.infer<typeof ContactSchema>;
