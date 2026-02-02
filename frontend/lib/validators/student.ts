import { z } from 'zod';

// Sub-schemas
const AcademicInfoSchema = z.object({
    course: z.string().min(1, 'Course ID is required'),
    department: z.string().min(1, 'Department ID is required'),
    semester: z.number().min(1),
    section: z.string().optional(),
    batch: z.string().optional(),
    academicYear: z.string().optional(),
    rollNumber: z.string().optional(),
});

const PersonalInfoSchema = z.object({
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    emergencyContact: z.string().optional(),
    nationality: z.string().optional(),
    religion: z.string().optional(),
    category: z.enum(['General', 'OBC', 'SC', 'ST', 'Other']).optional(),
    aadharNumber: z.string().optional(),
    previousSchool: z.string().optional(),
    previousPercentage: z.number().optional(),
});

const AddressSchema = z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
    country: z.string().optional(),
});

// Main Create Student Schema
export const CreateStudentSchema = z.object({
    // User Account Info
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6).optional(), // Optional, can be auto-generated
    phone: z.string().optional(),
    dateOfBirth: z.string().datetime().optional(), // Expecting ISO string
    gender: z.enum(['male', 'female', 'other']).optional(),
    address: AddressSchema.optional(),

    // Student Specific Info
    admissionNumber: z.string().min(1),
    admissionDate: z.string().datetime().optional(),
    academicInfo: AcademicInfoSchema,
    personalInfo: PersonalInfoSchema.optional(),

    // Accommodation & Transport
    hostel: z.object({
        isHostelite: z.boolean(),
        hostelId: z.string().optional(),
        roomNumber: z.string().optional(),
    }).optional(),

    transport: z.object({
        usesTransport: z.boolean(),
        routeId: z.string().optional(),
    }).optional(),
});

export const UpdateStudentSchema = CreateStudentSchema.partial();
