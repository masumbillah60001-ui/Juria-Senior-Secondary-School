import { z } from 'zod';

export const CreateSubjectSchema = z.object({
    name: z.string().min(2, 'Subject name is required'),
    code: z.string().min(2, 'Subject code is required').toUpperCase(),
    department: z.string().min(1, 'Department ID is required'),
    credits: z.number().min(0),
    type: z.enum(['theory', 'practical', 'both']),
    semester: z.number().optional(),
    description: z.string().optional(),
    syllabus: z.string().optional(),
    isElective: z.boolean().default(false),
    prerequisites: z.array(z.string()).optional(),
});

export const UpdateSubjectSchema = CreateSubjectSchema.partial();

const FeesSchema = z.object({
    tuition: z.number().default(0),
    library: z.number().default(0),
    lab: z.number().default(0),
    sports: z.number().default(0),
    other: z.number().default(0),
    total: z.number().default(0),
});

const SyllabusSchema = z.object({
    semester: z.number(),
    subjects: z.array(z.string()), // Subject IDs
});

export const CreateCourseSchema = z.object({
    name: z.string().min(2, 'Course name is required'),
    code: z.string().min(1, 'Course code is required').toUpperCase(),
    department: z.string().min(1, 'Department ID is required'),
    degree: z.enum(['Diploma', 'UG', 'PG', 'PhD']),
    duration: z.number().min(0.5).max(10), // Years
    totalSemesters: z.number().min(1),
    eligibility: z.string().optional(),
    fees: FeesSchema,
    syllabus: z.array(SyllabusSchema).optional(),
    intake: z.number().optional(),
    isActive: z.boolean().default(true),
});

export const UpdateCourseSchema = CreateCourseSchema.partial();
