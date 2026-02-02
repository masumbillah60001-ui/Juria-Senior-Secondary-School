import { NextResponse } from 'next/server';

export function successResponse(data: any, message = 'Success', status = 200) {
    return NextResponse.json(
        {
            success: true,
            message,
            data,
        },
        { status }
    );
}

export function errorResponse(message = 'Something went wrong', code = 'INTERNAL_ERROR', details: any = null, status = 500) {
    return NextResponse.json(
        {
            success: false,
            message,
            code,
            details,
        },
        { status }
    );
}

export function paginatedResponse(data: any[], page: number, limit: number, total: number) {
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
        success: true,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage,
            hasPrevPage,
        },
    });
}
