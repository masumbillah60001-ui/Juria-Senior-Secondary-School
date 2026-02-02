import { NextResponse } from 'next/server';
import { CreateCourseSchema } from '@/lib/validators/course';
import connectToDatabase from '@/lib/db/mongodb';
import Course from '@/lib/db/models/course.model';
import { auth } from '@/auth';

export async function POST(req: Request) {
    try {
        const session = await auth();
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await req.json();
        const validatedData = CreateCourseSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.flatten().fieldErrors }, { status: 400 });
        }

        const data = validatedData.data;
        await connectToDatabase();

        const existing = await Course.findOne({ code: data.code });
        if (existing) {
            return NextResponse.json({ error: 'Course with this code already exists' }, { status: 409 });
        }

        const course = await Course.create(data);

        return NextResponse.json({ success: true, message: 'Course created successfully', data: course }, { status: 201 });
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
        const courses = await Course.find(query)
            .populate('department', 'name')
            .populate('syllabus.subjects', 'name code');

        return NextResponse.json({ success: true, data: courses });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
