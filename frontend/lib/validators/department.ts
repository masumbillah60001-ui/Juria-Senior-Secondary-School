import { z } from 'zod';

export const CreateDepartmentSchema = z.object({
    name: z.string().min(2, 'Department name is required'),
    code: z.string().min(2, 'Department code is required').toUpperCase(), // Ensure uppercase code
    hod: z.string().optional(), // Faculty ID
    description: z.string().optional(),
    establishedYear: z.number().min(1900).max(new Date().getFullYear()).optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),
    isActive: z.boolean().default(true),
});

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial();
