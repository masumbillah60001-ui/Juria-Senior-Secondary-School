import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db/mongodb';
import User from '@/lib/db/models/user.model';
import { RegisterFormSchema } from '@/lib/validators/auth';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input using Zod schema (excluding confirmPassword which is frontend only)
        const { name, email, password } = body;

        // Simple validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: 'student', // Default role
            profile: {
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' ') || '.', // Simple split
            },
            isActive: true,
            isVerified: false,
        });

        return NextResponse.json(
            {
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    role: newUser.role
                }
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
