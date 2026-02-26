import { Redis } from '@upstash/redis';

export const redis = Redis.fromEnv();

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

const TTL = 3600; // 1 hour

export async function setStatus(requestId: string, status: ApprovalStatus) {
    await redis.set(`approval:${requestId}`, status, { ex: TTL });
}

export async function getStatus(requestId: string): Promise<ApprovalStatus> {
    const val = await redis.get<string>(`approval:${requestId}`);
    return (val as ApprovalStatus) ?? 'pending';
}
