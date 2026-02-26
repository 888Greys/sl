'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SubmittedPage = () => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);
    const [showToast, setShowToast] = useState(true);
    const [redirectText, setRedirectText] = useState('Redirecting to Max It login in 5s...');

    useEffect(() => {
        // Hide toast after 4 seconds
        const toastTimer = setTimeout(() => setShowToast(false), 4000);

        // Countdown timer
        const interval = setInterval(() => {
            setCountdown((prev) => {
                const next = prev - 1;
                if (next <= 0) {
                    clearInterval(interval);
                    setRedirectText('Redirecting...');
                    router.push('/login');
                } else {
                    setRedirectText(`Redirecting to Max It login in ${next}s...`);
                }
                return next;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(toastTimer);
        };
    }, [router]);

    const handleGoNow = () => {
        router.push('/login');
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center pt-10 px-5 relative"
            style={{ backgroundColor: '#f4f5f7', fontFamily: 'var(--font-family)' }}
        >
            {/* Toast Notification */}
            <div
                className={`flex items-start gap-3 rounded-lg px-5 py-3 shadow-lg mb-10 transition-all duration-500 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                style={{
                    backgroundColor: '#1e2532',
                    color: 'white',
                    width: '280px',
                    maxWidth: '90%',
                    animation: 'slideDown 0.5s ease-out',
                }}
            >
                <div className="flex-shrink-0 mt-0.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#22c55e" />
                        <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="flex flex-col text-[13px] font-semibold leading-snug">
                    <span>🎉 Application</span>
                    <span>submitted</span>
                    <span>successfully!</span>
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-white w-full max-w-[400px] rounded-2xl shadow-xl px-8 py-10 text-center flex flex-col items-center">
                {/* Green Checkmark Icon */}
                <div
                    className="w-[70px] h-[70px] rounded-full flex justify-center items-center mb-6"
                    style={{
                        backgroundColor: '#16a34a',
                        boxShadow: '0 0 0 12px rgba(22, 163, 74, 0.15)',
                    }}
                >
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12.5L10 16.5L18 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="text-[22px] font-bold leading-snug mb-5" style={{ color: '#16a34a' }}>
                    Loan Application<br />Submitted
                </h1>

                {/* Body Text */}
                <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
                    Your loan application has been submitted.<br />Please wait for approval.
                </p>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-2">
                    You will receive a confirmation message.<br />For now, proceed to Max It.
                </p>

                {/* Redirect Box */}
                <div
                    className="w-full rounded-lg px-4 py-4 flex justify-center items-center gap-3 mt-4 mb-6"
                    style={{ backgroundColor: '#f1f5f9' }}
                >
                    {/* Spinner */}
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{
                            border: '2px solid rgba(2, 132, 199, 0.2)',
                            borderTopColor: '#0284c7',
                            animation: 'spin 1s linear infinite',
                        }}
                    />
                    <span className="text-[13px] font-medium" style={{ color: '#0284c7' }}>
                        {redirectText}
                    </span>
                </div>

                {/* Manual Button */}
                <button
                    onClick={handleGoNow}
                    className="text-[13px] font-medium px-5 py-2.5 rounded-md transition-all duration-200 cursor-pointer"
                    style={{
                        background: 'transparent',
                        color: '#64748b',
                        border: '1px solid #e2e8f0',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.color = '#1e293b';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.color = '#64748b';
                    }}
                >
                    Go to Login Now
                </button>
            </div>

            {/* Inline keyframes for spinner and toast slide */}
            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default SubmittedPage;
