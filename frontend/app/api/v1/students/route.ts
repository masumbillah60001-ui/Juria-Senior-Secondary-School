import { NextResponse } from 'next/server';
import { CreateStudentSchema } from '@/lib/validators/student';
import connectToDatabase from '@/lib/db/mongodb';
import User from '@/lib/db/models/user.model';
import Student from '@/lib/db/models/student.model';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { auth } from '@/auth';

export async function POST(req: Request) {
    try {
        // 1. Auth check (Admin/SuperAdmin only) - Simplified for now
        const session = await auth();
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await req.json();

        // 2. Validate input
        const validatedData = CreateStudentSchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
        }

        const data = validatedData.data;

        await connectToDatabase();

        // 3. Check for existing user or student
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
        }

        const existingStudent = await Student.findOne({
            $or: [{ admissionNumber: data.admissionNumber }, { studentId: data.admissionNumber }]
        });
        if (existingStudent) {
            return NextResponse.json({ error: 'Student with this Admission Number already exists' }, { status: 409 });
        }

        // 4. Create User and Student (Simulated Transaction)
        // MongoDB Atlas required for actual transactions, standard mock implementation here

        // Create User
        const hashedPassword = await bcrypt.hash(data.password || 'student123', 10); // Default password
        const user = await User.create({
            email: data.email,
            password: hashedPassword,
            role: 'student',
            profile: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender,
                address: data.address,
            },
            isActive: true,
            isVerified: true, // Admin created, so verified
        });

        // Create Student Linked to User
        const student = await Student.create({
            userId: user._id,
            studentId: data.admissionNumber, // Using admission number as ID for now
            admissionNumber: data.admissionNumber,
            admissionDate: data.admissionDate || new Date(),
            course: data.academicInfo.course,
            department: data.academicInfo.department,
            semester: data.academicInfo.semester,
            section: data.academicInfo.section || 'A',
            batch: data.academicInfo.batch || new Date().getFullYear().toString(),
            rollNumber: data.academicInfo.rollNumber || data.admissionNumber,

            academicInfo: {
                previousSchool: data.personalInfo?.previousSchool,
                marksObtained: data.personalInfo?.previousPercentage,
                // previousGrade/Board not in validator yet, leave undefined
            },
            personalInfo: {
                fatherName: data.personalInfo?.fatherName || '', // Required in model
                motherName: data.personalInfo?.motherName || '', // Required in model
                guardianPhone: data.personalInfo?.guardianPhone || '', // Required in model
                address: data.address?.city || '', // Fallback using address schema
                bloodGroup: undefined // Not in validator
            },
            hostel: data.hostel ? {
                roomNumber: data.hostel.roomNumber,
                block: '' // Not in validator
            } : undefined,
            transport: data.transport ? {
                route: data.transport.routeId,
                stop: '' // Not in validator
            } : undefined,
        });

        return NextResponse.json({
            success: true,
            message: 'Student created successfully',
            data: { studentId: student._id, userId: user._id }
        }, { status: 201 });

    } catch (error: any) {
        console.error('Create Student Error:', error);
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const courseId = searchParams.get('courseId');
        const departmentId = searchParams.get('departmentId');

        const query: any = {};
        if (courseId) query['course'] = courseId;
        if (departmentId) query['department'] = departmentId;

        await connectToDatabase();

        const skip = (page - 1) * limit;

        const students = await Student.find(query)
            .populate('userId', 'profile email') // Populate user details
            .populate('course', 'name')
            .populate('department', 'name')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Student.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: students,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
