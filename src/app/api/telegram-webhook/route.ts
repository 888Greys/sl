import { NextRequest, NextResponse } from 'next/server';
import { setStatus } from '@/lib/approvalStore';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

async function answerCallbackQuery(callbackQueryId: string, text: string) {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
    });
}

async function editMessageText(chatId: number, messageId: number, text: string) {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text,
            parse_mode: 'HTML',
        }),
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const callbackQuery = body?.callback_query;

        if (!callbackQuery) {
            return NextResponse.json({ ok: true });
        }

        const { id: callbackQueryId, data, message } = callbackQuery;
        const [action, requestId] = (data as string).split(':');

        if (!requestId) return NextResponse.json({ ok: true });

        if (action === 'approve') {
            await setStatus(requestId, 'approved');
            await answerCallbackQuery(callbackQueryId, '✅ Approved!');
            await editMessageText(
                message.chat.id,
                message.message_id,
                `${message.text}\n\n✅ <b>APPROVED</b> by admin.`
            );
        } else if (action === 'reject') {
            await setStatus(requestId, 'rejected');
            await answerCallbackQuery(callbackQueryId, '❌ Rejected!');
            await editMessageText(
                message.chat.id,
                message.message_id,
                `${message.text}\n\n❌ <b>REJECTED</b> by admin.`
            );
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('telegram-webhook error:', err);
        return NextResponse.json({ ok: true }); // Always 200 to Telegram
    }
}
