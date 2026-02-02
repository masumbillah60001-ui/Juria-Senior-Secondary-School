import { NextResponse } from 'next/server';
import { CreateSubjectSchema } from '@/lib/validators/course';
import connectToDatabase from '@/lib/db/mongodb';
import Subject from '@/lib/db/models/subject.model';
import { auth } from '@/auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await req.json();
        const validatedData = CreateSubjectSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
        }

        const data = validatedData.data;
        await connectToDatabase();

        const existing = await Subject.findOne({ code: data.code });
        if (existing) {
            return NextResponse.json({ error: 'Subject with this code already exists' }, { status: 409 });
        }

        const subject = await Subject.create(data);

        return NextResponse.json({ success: true, message: 'Subject created successfully', data: subject }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const departmentId = searchParams.get('departmentId');
        const query: any = {};
        if (departmentId) query['department'] = departmentId;

        await connectToDatabase();
        const subjects = await Subject.find(query).populate('department', 'name').sort({ name: 1 });
        return NextResponse.json({ success: true, data: subjects });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
