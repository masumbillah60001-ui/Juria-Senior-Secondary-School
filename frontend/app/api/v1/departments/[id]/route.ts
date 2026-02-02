import { NextResponse } from 'next/server';
import { UpdateDepartmentSchema } from '@/lib/validators/department';
import connectToDatabase from '@/lib/db/mongodb';
import Department from '@/lib/db/models/department.model';
import { auth } from '@/auth';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        // Validate ObjectId format to avoid CastError
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const department = await Department.findById(id).populate('hod', 'profile.firstName profile.lastName');

        if (!department) {
            return NextResponse.json({ error: 'Department not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: department });
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
        const validatedData = UpdateDepartmentSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
        }

        const { id } = await params;
        await connectToDatabase();

        const department = await Department.findByIdAndUpdate(id, validatedData.data, { new: true });

        if (!department) {
            return NextResponse.json({ error: 'Department not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Department updated successfully', data: department });

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

        const { id } = await params;
        await connectToDatabase();

        // Soft delete if preferred, but usually Depts are hard deleted if empty
        // For now, let's use hard delete but we should check for dependencies (students/faculty) later
        const department = await Department.findByIdAndDelete(id);

        if (!department) {
            return NextResponse.json({ error: 'Department not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Department deleted successfully' });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
