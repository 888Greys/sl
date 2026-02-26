'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const formatCurrency = (num: number) => num.toLocaleString('en-US');

const SliderTrack = ({ value, min, max, id, onChange }: {
    value: number; min: number; max: number; id: string; onChange: (v: number) => void;
}) => {
    const progress = ((value - min) / (max - min)) * 100;
    return (
        <div className="relative w-full">
            <div className="relative h-[6px] rounded-full bg-gray-200 w-full">
                <div
                    className="absolute h-full rounded-full transition-all"
                    style={{ width: `${progress}%`, backgroundColor: 'var(--primary)' }}
                />
            </div>
            <input
                type="range"
                id={id}
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-[6px]"
                style={{ margin: 0 }}
            />
            {/* Custom thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md pointer-events-none transition-transform"
                style={{
                    left: `calc(${progress}% - 10px)`,
                    backgroundColor: 'var(--primary)',
                }}
            />
        </div>
    );
};

const LoanCalculator = () => {
    const router = useRouter();
    const [amount, setAmount] = useState(5000000);
    const [term, setTerm] = useState(12);

    const calculatePayment = useCallback(() => {
        const annualRate = 0.18;
        const years = term / 12;
        const totalInterest = amount * annualRate * years;
        const totalRepayment = amount + totalInterest;
        return Math.round(totalRepayment / term);
    }, [amount, term]);

    const monthlyPayment = calculatePayment();

    return (
        <div className="bg-white w-full max-w-[420px] rounded-2xl shadow-xl px-6 py-8">
            {/* Card Header */}
            <div className="text-center mb-6">
                <h1 className="text-xl font-extrabold text-black mb-2">Get Your Loan Approved Fast</h1>
                <p className="text-[11px] text-slate-500 font-medium">Quick approval • Competitive rates • Flexible terms</p>
            </div>

            {/* Calculator Box */}
            <div className="bg-slate-50 rounded-xl p-5 mb-6">
                <h2 className="text-sm font-bold text-black mb-5">Loan Calculator</h2>

                {/* Amount Slider */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-semibold text-slate-500">Loan Amount</span>
                        <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                            SLe {formatCurrency(amount)}
                        </span>
                    </div>
                    <SliderTrack value={amount} min={2500} max={6000000} id="amount" onChange={setAmount} />
                    <div className="flex justify-between text-[9px] text-slate-400 mt-2">
                        <span>SLe 2,500</span>
                        <span>SLe 6,000,000</span>
                    </div>
                </div>

                {/* Term Slider */}
                <div className="mb-2">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-semibold text-slate-500">Loan Term</span>
                        <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                            {term} months
                        </span>
                    </div>
                    <SliderTrack value={term} min={6} max={60} id="term" onChange={setTerm} />
                    <div className="flex justify-between text-[9px] text-slate-400 mt-2">
                        <span>6 months</span>
                        <span>60 months</span>
                    </div>
                </div>

                {/* Result */}
                <div className="mt-6 bg-white border border-slate-200 rounded-lg px-5 py-4 flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">Monthly Payment</span>
                    <span className="text-lg font-extrabold" style={{ color: 'var(--primary)' }}>
                        SLe {formatCurrency(monthlyPayment)}
                    </span>
                </div>
            </div>

            {/* Apply Button */}
            <button
                onClick={() => router.push('/apply')}
                className="block w-full text-white font-bold text-sm py-4 rounded-lg mb-8 transition-colors duration-200 cursor-pointer border-none"
                style={{ backgroundColor: 'var(--primary)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
            >
                APPLY NOW
            </button>

            {/* Features */}
            <div className="flex flex-col gap-5 px-2">
                {/* Fast Approval */}
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H10L8 22L19 10H12L13 2Z" fill="#e86c47" stroke="#e86c47" strokeWidth="1" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-black mr-2">Fast Approval</span>
                        <span className="text-[10px] text-slate-400">Within 24 hours</span>
                    </div>
                </div>

                {/* Low Rates */}
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4C9 4 8 7 8 7H16C16 7 15 4 12 4Z" fill="#c48a48" />
                            <path d="M16 7H8C6.89543 7 6 7.89543 6 9V17C6 19.7614 8.23858 22 11 22H13C15.7614 22 18 19.7614 18 17V9C18 7.89543 17.1046 7 16 7Z" fill="#d8964d" />
                            <circle cx="12" cy="15" r="5" fill="#facc15" />
                            <text x="12" y="19" fontFamily="Arial" fontSize="11" fontWeight="bold" fill="#b45309" textAnchor="middle">$</text>
                            <path d="M10 7H14V5H10V7Z" fill="#8c5828" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-black mr-2">Low Rates</span>
                        <span className="text-[10px] text-slate-400">From 18%</span>
                    </div>
                </div>

                {/* Secure */}
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
                            <rect x="5" y="10" width="14" height="12" rx="3" fill="#f59e0b" />
                            <path d="M12 14V17" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="12" cy="14" r="1.5" fill="#b45309" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-black mr-2">Secure</span>
                        <span className="text-[10px] text-slate-400">Bank level</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanCalculator;
