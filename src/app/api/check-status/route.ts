import { NextRequest, NextResponse } from 'next/server';
import { getStatus } from '@/lib/approvalStore';

export async function GET(req: NextRequest) {
    const requestId = req.nextUrl.searchParams.get('requestId');

    if (!requestId) {
        return NextResponse.json({ error: 'Missing requestId' }, { status: 400 });
    }

    const status = await getStatus(requestId);
    return NextResponse.json({ status });
}
