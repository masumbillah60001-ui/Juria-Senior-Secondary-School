import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';

export async function GET() {
    try {
        const db = await connectToDatabase();
        const state = db.connection.readyState;
        // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
        const status = state === 1 ? 'connected' : 'disconnected';

        return NextResponse.json(
            {
                status: 'ok',
                database: status,
                timestamp: new Date().toISOString()
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                status: 'error',
                message: 'Database connection failed',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
