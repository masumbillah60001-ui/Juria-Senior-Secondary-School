import { z } from 'zod';

const EmploymentDetailsSchema = z.object({
    department: z.string().min(1, 'Department ID is required'),
    designation: z.string().min(1, 'Designation is required'),
    joiningDate: z.string().datetime().optional(),
    salary: z.number().optional(),
    employmentType: z.enum(['Permanent', 'Contract', 'Guest']).optional(),
    qualifications: z.array(z.string()).optional(),
    experience: z.number().optional(), // In years
});

const AddressSchema = z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
    country: z.string().optional(),
});

// Main Create Faculty Schema
export const CreateFacultySchema = z.object({
    // User Account Info
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6).optional(),
    phone: z.string().optional(),
    dateOfBirth: z.string().datetime().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    address: AddressSchema.optional(),

    // Faculty Specific Info
    employeeId: z.string().min(1),
    employmentDetails: EmploymentDetailsSchema,
});

export const UpdateFacultySchema = CreateFacultySchema.partial();
