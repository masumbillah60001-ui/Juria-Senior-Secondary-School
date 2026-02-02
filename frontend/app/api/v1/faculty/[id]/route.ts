import { NextResponse } from 'next/server';
import { UpdateFacultySchema } from '@/lib/validators/faculty';
import connectToDatabase from '@/lib/db/mongodb';
import User from '@/lib/db/models/user.model';
import Faculty from '@/lib/db/models/faculty.model';
import { auth } from '@/auth';

async function findFaculty(id: string) {
    let faculty;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        faculty = await Faculty.findById(id).populate('userId', 'email profile');
    }

    if (!faculty) {
        faculty = await Faculty.findOne({ employeeId: id }).populate('userId', 'email profile');
    }
    return faculty;
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        const { id } = await params;
        const faculty = await findFaculty(id);

        if (!faculty) {
            return NextResponse.json({ error: 'Faculty not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: faculty });
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
        const validatedData = UpdateFacultySchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
        }

        const { id } = await params;
        const data = validatedData.data;
        await connectToDatabase();

        const faculty = await findFaculty(id);
        if (!faculty) {
            return NextResponse.json({ error: 'Faculty not found' }, { status: 404 });
        }

        // Update User Profile
        if (data.firstName || data.lastName || data.phone || data.dateOfBirth) {
            const userUpdate: any = {};
            if (data.firstName) userUpdate['profile.firstName'] = data.firstName;
            if (data.lastName) userUpdate['profile.lastName'] = data.lastName;
            if (data.phone) userUpdate['profile.phone'] = data.phone;
            if (data.dateOfBirth) userUpdate['profile.dateOfBirth'] = data.dateOfBirth;

            await User.findByIdAndUpdate(faculty.userId._id, { $set: userUpdate });
        }

        // Update Faculty Fields
        if (data.employmentDetails) {
            // @ts-ignore
            if (data.employmentDetails.department) faculty.department = data.employmentDetails.department;
            // @ts-ignore
            if (data.employmentDetails.designation) faculty.designation = data.employmentDetails.designation;
            if (data.employmentDetails.joiningDate) faculty.joiningDate = new Date(data.employmentDetails.joiningDate);
        }

        await faculty.save();

        return NextResponse.json({ success: true, message: 'Faculty updated successfully', data: faculty });

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
        const faculty = await findFaculty(id);
        if (!faculty) {
            return NextResponse.json({ error: 'Faculty not found' }, { status: 404 });
        }

        await User.findByIdAndUpdate(faculty.userId._id, { isActive: false });

        return NextResponse.json({ success: true, message: 'Faculty deactivated successfully' });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
