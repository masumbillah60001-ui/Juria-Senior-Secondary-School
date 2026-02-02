import { NextResponse } from 'next/server';
import { CreateDepartmentSchema } from '@/lib/validators/department';
import connectToDatabase from '@/lib/db/mongodb';
import Department from '@/lib/db/models/department.model';
import { auth } from '@/auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await req.json();
        const validatedData = CreateDepartmentSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
        }

        const data = validatedData.data;

        await connectToDatabase();

        // Check availability
        const existing = await Department.findOne({ $or: [{ code: data.code }, { name: data.name }] });
        if (existing) {
            return NextResponse.json({ error: 'Department with this code or name already exists' }, { status: 409 });
        }

        const department = await Department.create(data);

        return NextResponse.json({ success: true, message: 'Department created successfully', data: department }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const departments = await Department.find({}).populate('hod', 'profile.firstName profile.lastName');
        return NextResponse.json({ success: true, data: departments });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
