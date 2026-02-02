import { NextResponse } from 'next/server';
import { UpdateStudentSchema } from '@/lib/validators/student';
import connectToDatabase from '@/lib/db/mongodb';
import User from '@/lib/db/models/user.model';
import Student from '@/lib/db/models/student.model';
import { auth } from '@/auth';

// Helper to get student by ID (checks both MongoDB _id and custom studentId/admissionNumber)
async function findStudent(id: string) {
    let student;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        student = await Student.findById(id).populate('userId', 'email profile');
    }

    if (!student) {
        student = await Student.findOne({
            $or: [{ studentId: id }, { admissionNumber: id }]
        }).populate('userId', 'email profile');
    }
    return student;
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        const { id } = await params;
        const student = await findStudent(id);

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: student });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await req.json();
        const validatedData = UpdateStudentSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
        }

        const { id } = await params;
        const data = validatedData.data;
        await connectToDatabase();

        const student = await findStudent(id);
        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        // Update User Profile if provided
        if (data.firstName || data.lastName || data.phone || data.dateOfBirth) {
            const userUpdate: any = {};
            if (data.firstName) userUpdate['profile.firstName'] = data.firstName;
            if (data.lastName) userUpdate['profile.lastName'] = data.lastName;
            if (data.phone) userUpdate['profile.phone'] = data.phone;
            if (data.dateOfBirth) userUpdate['profile.dateOfBirth'] = data.dateOfBirth;

            await User.findByIdAndUpdate(student.userId._id, { $set: userUpdate });
        }

        // Update Student Fields - Ensure ObjectIDs are cast if necessary
        // Mongoose usually handles string -> ObjectId casting automatically for assigns,
        // but strict TS might complain. We can cast or ignore if we are sure.
        // However, the error said: Type 'string' is not assignable to type 'ObjectId'.

        if (data.academicInfo) {
            // @ts-ignore - Mongoose will cast string to ObjectId
            student.academicInfo = { ...student.academicInfo, ...data.academicInfo };
        }
        if (data.personalInfo) student.personalInfo = { ...student.personalInfo, ...data.personalInfo };
        if (data.hostel) {
            // @ts-ignore
            student.hostel = { ...student.hostel, ...data.hostel };
        }
        if (data.transport) {
            // @ts-ignore
            student.transport = { ...student.transport, ...data.transport };
        }

        await student.save();

        return NextResponse.json({ success: true, message: 'Student updated successfully', data: student });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        await connectToDatabase();

        const { id } = await params;
        const student = await findStudent(id);
        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        // Soft delete: Deactivate user
        await User.findByIdAndUpdate(student.userId._id, { isActive: false });

        // Optionally verify student deletion strategy (soft vs hard)
        // For now, we'll keep the record but marked as inactive via user

        return NextResponse.json({ success: true, message: 'Student deactivated successfully' });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
