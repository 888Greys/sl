'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoanData {
    loanAmount?: string;
    loanTerm?: string;
    loanType?: string;
}

const loanTypeLabel: Record<string, string> = {
    personal: 'Personal Loan',
    business: 'Business Loan',
    auto: 'Auto Loan',
};

const MONTHLY_RATE = 0.18 / 12;

function calcMonthly(amount: number, months: number) {
    if (!amount || !months) return 0;
    const r = MONTHLY_RATE;
    return Math.round((amount * r) / (1 - Math.pow(1 + r, -months)));
}

export default function LoanApprovedPage() {
    const router = useRouter();
    const [loanData, setLoanData] = useState<LoanData>({});

    useEffect(() => {
        const stored = sessionStorage.getItem('loanData');
        if (stored) setLoanData(JSON.parse(stored));
    }, []);

    const amount = Number(loanData.loanAmount ?? 5000000);
    const term = Number(loanData.loanTerm ?? 12);
    const monthly = calcMonthly(amount, term);
    const deposit = Math.round(amount * 0.1);

    const fmt = (n: number) => `SLe ${n.toLocaleString('en-US')}`;

    return (
        <div
            className="min-h-screen flex justify-center items-start py-5 px-4"
            style={{ backgroundColor: '#e66c00', fontFamily: 'var(--font-family)' }}
        >
            <div className="w-full max-w-[420px] flex flex-col gap-5 pb-8">

                {/* ── Card 1: Congratulations ── */}
                <div className="bg-white rounded-[20px] p-6 flex flex-col items-center text-center" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>

                    {/* Checkmark Icon */}
                    <div
                        className="w-[70px] h-[70px] rounded-full flex justify-center items-center mb-5"
                        style={{ backgroundColor: '#e66c00', boxShadow: '0 10px 20px rgba(230,108,0,0.4)' }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>

                    <h1 className="text-xl font-extrabold text-slate-900 mb-3">🎉 Congratulations!</h1>

                    <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                        Your loan has been <strong className="text-slate-800 font-bold">approved</strong>! The funds will be disbursed shortly.
                    </p>

                    {/* Approved Amount Box */}
                    <div
                        className="w-full rounded-2xl px-5 py-6 text-white mb-6"
                        style={{ backgroundColor: '#e66c00', boxShadow: '0 8px 16px rgba(230,108,0,0.25)' }}
                    >
                        <span className="block text-[10px] font-bold uppercase tracking-widest mb-2 opacity-90">Approved Amount</span>
                        <span className="text-[28px] font-extrabold">{fmt(amount)}</span>
                    </div>

                    {/* Compliance Notice */}
                    <div
                        className="w-full rounded-xl p-5 text-left"
                        style={{ backgroundColor: '#fffbf0', border: '1px solid #fde08b' }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#ea580c">
                                <path d="M12 2L1 21H23L12 2ZM12 6L19.53 19H4.47L12 6ZM11 10V14H13V10H11ZM11 16V18H13V16H11Z" />
                            </svg>
                            <span className="text-[12px] font-bold uppercase tracking-wide" style={{ color: '#ea580c' }}>
                                Compliance Notice
                            </span>
                        </div>
                        <p className="text-[11px] leading-relaxed" style={{ color: '#475569' }}>
                            Your Max It account must maintain a security deposit of at least{' '}
                            <strong className="text-slate-800 font-bold">10% of your requested loan amount</strong>{' '}
                            (<strong>{fmt(deposit)}</strong>). This deposit is fully refundable upon successful loan repayment.
                        </p>
                    </div>
                </div>

                {/* ── Card 2: Loan Details ── */}
                <div className="bg-white rounded-[20px] px-5 py-6" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
                    {/* Header */}
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-800 mb-5">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="5" width="20" height="14" rx="2" fill="#38bdf8" />
                            <path d="M2 10H22" stroke="white" strokeWidth="2" />
                            <rect x="5" y="14" width="4" height="2" rx="0.5" fill="white" />
                        </svg>
                        Loan Details
                    </div>

                    <div className="flex flex-col">
                        {[
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect x="2" y="6" width="20" height="12" rx="2" fill="#22c55e" />
                                        <circle cx="12" cy="12" r="3" fill="#16a34a" />
                                        <path d="M6 10V14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M18 10V14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                ),
                                label: 'Monthly Payment',
                                value: fmt(monthly),
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect x="4" y="5" width="16" height="16" rx="2" fill="#e2e8f0" />
                                        <path d="M4 9H20" stroke="#94a3b8" strokeWidth="2" />
                                        <rect x="8" y="12" width="3" height="3" rx="0.5" fill="#64748b" />
                                        <rect x="13" y="12" width="3" height="3" rx="0.5" fill="#64748b" />
                                        <rect x="8" y="16" width="3" height="3" rx="0.5" fill="#64748b" />
                                        <path d="M8 3V6" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M16 3V6" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                ),
                                label: 'Loan Term',
                                value: `${term} Months`,
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="3" width="18" height="18" rx="2" fill="#cbd5e1" />
                                        <path d="M7 16L11 11L14 14L18 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18 8V12M18 8H14" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ),
                                label: 'Interest Rate',
                                value: '18% p.a.',
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="3" width="18" height="18" rx="2" fill="#fef3c7" />
                                        <path d="M8 12h8M12 8v8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                ),
                                label: 'Loan Type',
                                value: loanTypeLabel[loanData.loanType ?? ''] || 'Personal Loan',
                            },
                        ].map(({ icon, label, value }, i, arr) => (
                            <div
                                key={label}
                                className="flex items-center gap-4 py-4"
                                style={{ borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none' }}
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex justify-center items-center flex-shrink-0"
                                    style={{ backgroundColor: '#e66c00', boxShadow: '0 4px 10px rgba(230,108,0,0.3)' }}
                                >
                                    {icon}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</span>
                                    <span className="text-sm font-bold text-slate-800">{value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Quick Actions title + partial card ── */}
                <h3 className="text-center text-white text-[15px] font-bold -mb-3">Quick Actions</h3>
                <div
                    className="bg-white rounded-t-[20px] px-6 py-5 flex justify-around"
                    style={{ boxShadow: '0 -4px 15px rgba(0,0,0,0.1)' }}
                >
                    {[
                        { icon: '💳', label: 'Pay Now' },
                        { icon: '📄', label: 'Statement' },
                        { icon: '🏠', label: 'Home', action: () => router.push('/dashboard') },
                    ].map(({ icon, label, action }) => (
                        <button
                            key={label}
                            onClick={action}
                            className="flex flex-col items-center gap-1.5 bg-transparent border-none cursor-pointer"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                                style={{ backgroundColor: '#fff4e8' }}
                            >
                                {icon}
                            </div>
                            <span className="text-[10px] font-semibold text-slate-600">{label}</span>
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}
