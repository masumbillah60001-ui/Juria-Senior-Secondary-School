import { NextResponse } from 'next/server';
import { CreateFacultySchema } from '@/lib/validators/faculty';
import connectToDatabase from '@/lib/db/mongodb';
import User from '@/lib/db/models/user.model';
import Faculty from '@/lib/db/models/faculty.model';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await req.json();

        const validatedData = CreateFacultySchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
        }

        const data = validatedData.data;

        await connectToDatabase();

        // Check for existing user or faculty
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
        }

        const existingFaculty = await Faculty.findOne({ employeeId: data.employeeId });
        if (existingFaculty) {
            return NextResponse.json({ error: 'Faculty with this Employee ID already exists' }, { status: 409 });
        }

        // Create User
        const hashedPassword = await bcrypt.hash(data.password || 'faculty123', 10);
        const user = await User.create({
            email: data.email,
            password: hashedPassword,
            role: 'faculty',
            profile: {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender,
                address: data.address,
            },
            isActive: true,
            isVerified: true,
        });

        // Create Faculty Linked to User
        // @ts-ignore - Mongoose casting
        const faculty = await Faculty.create({
            userId: user._id,
            employeeId: data.employeeId,
            department: data.employmentDetails.department,
            designation: data.employmentDetails.designation,
            joiningDate: data.employmentDetails.joiningDate,
            salary: {
                basic: data.employmentDetails.salary, // Assuming basic for now, or need to adjust schema
                allowances: 0,
                total: data.employmentDetails.salary
            },
            qualifications: [], // Initialize empty
            experience: [], // Initialize empty
            publications: [] // Initialize empty
        });

        return NextResponse.json({
            success: true,
            message: 'Faculty created successfully',
            data: { facultyId: faculty._id, userId: user._id }
        }, { status: 201 });

    } catch (error: any) {
        console.error('Create Faculty Error:', error);
        return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const departmentId = searchParams.get('departmentId');

        const query: any = {};
        if (departmentId) query['department'] = departmentId;

        await connectToDatabase();

        const skip = (page - 1) * limit;

        const faculty = await Faculty.find(query)
            .populate('userId', 'profile email')
            .populate('employmentDetails.department', 'name')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Faculty.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: faculty,
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
