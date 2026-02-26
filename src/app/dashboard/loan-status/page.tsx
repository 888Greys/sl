'use client';

import { useRouter } from 'next/navigation';

const navItems = [
    { label: 'Home', icon: '🏠', href: '/dashboard' },
    { label: 'Loans', icon: '💰', href: '/dashboard/loans' },
    { label: 'Status', icon: '📋', href: '/dashboard/loan-status', active: true },
    { label: 'Profile', icon: '👤', href: '/dashboard/profile' },
];

const steps = [
    { label: 'Application Submitted', done: true, date: 'Dec 20, 2025' },
    { label: 'Under Review', done: true, date: 'Dec 21, 2025' },
    { label: 'Approved', done: true, date: 'Dec 22, 2025' },
    { label: 'Loan Disbursed', done: true, date: 'Dec 23, 2025' },
    { label: 'Repayment Active', done: true, date: 'Dec 24, 2025' },
    { label: 'Loan Completed', done: false, date: 'Dec 2026 (est.)' },
];

export default function LoanStatusPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#f4f5f7', fontFamily: 'var(--font-family)' }}>
            <div className="w-full max-w-[420px] min-h-screen flex flex-col pb-20">

                {/* Header */}
                <header className="px-5 pt-10 pb-6 text-white" style={{ backgroundColor: '#ff7900' }}>
                    <div className="flex items-center gap-3 mb-2">
                        <button onClick={() => router.back()} className="text-white bg-transparent border-none text-xl cursor-pointer">←</button>
                        <h1 className="text-lg font-extrabold">Loan Status</h1>
                    </div>
                    <p className="text-xs opacity-80 pl-8">Track your loan progress</p>
                </header>

                <main className="flex-grow px-5 py-6">
                    {/* Current Loan Card */}
                    <div className="bg-white rounded-2xl p-5 mb-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[10px] text-slate-400 font-medium">LOAN ID</p>
                                <p className="text-sm font-bold text-slate-700">#MXL-2025-0847</p>
                            </div>
                            <span className="text-[10px] font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#16a34a' }}>
                                ACTIVE
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            {[
                                { l: 'Loan Type', v: 'Personal Loan' },
                                { l: 'Amount', v: 'SLe 5,000,000' },
                                { l: 'Term', v: '12 Months' },
                                { l: 'Monthly Payment', v: 'SLe 491,667' },
                                { l: 'Interest Rate', v: '18% p.a.' },
                                { l: 'Disbursed', v: 'Dec 23, 2025' },
                            ].map(({ l, v }) => (
                                <div key={l}>
                                    <p className="text-slate-400 font-medium text-[10px]">{l}</p>
                                    <p className="text-slate-800 font-semibold mt-0.5">{v}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Timeline */}
                    <h2 className="text-sm font-bold text-slate-700 mb-4">Application Timeline</h2>
                    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                        {steps.map((step, i) => (
                            <div key={step.label} className="flex gap-4">
                                {/* Dot & Line */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white"
                                        style={{ backgroundColor: step.done ? '#ff7900' : '#e2e8f0' }}
                                    >
                                        {step.done ? '✓' : ''}
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div
                                            className="w-0.5 flex-grow my-1"
                                            style={{ backgroundColor: step.done ? '#ff7900' : '#e2e8f0', minHeight: '24px' }}
                                        />
                                    )}
                                </div>
                                {/* Content */}
                                <div className="pb-5">
                                    <p className={`text-xs font-semibold ${step.done ? 'text-slate-800' : 'text-slate-400'}`}>{step.label}</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">{step.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Bottom Nav */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-slate-100 flex justify-around items-center py-3 z-50">
                    {navItems.map(({ label, icon, href, active }) => (
                        <button key={label} onClick={() => router.push(href)} className="flex flex-col items-center gap-1 border-none bg-transparent cursor-pointer">
                            <span className="text-xl">{icon}</span>
                            <span className="text-[9px] font-semibold" style={{ color: active ? '#ff7900' : '#94a3b8' }}>{label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
