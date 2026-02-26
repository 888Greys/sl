'use client';

import { useRouter } from 'next/navigation';

const navItems = [
    { label: 'Home', icon: '🏠', href: '/dashboard' },
    { label: 'Loans', icon: '💰', href: '/dashboard/loans', active: true },
    { label: 'Status', icon: '📋', href: '/dashboard/loan-status' },
    { label: 'Profile', icon: '👤', href: '/dashboard/profile' },
];

const loans = [
    {
        id: '#MXL-2025-0847',
        type: 'Personal Loan',
        amount: 'SLe 5,000,000',
        status: 'Active',
        statusColor: '#16a34a',
        paid: '29.5%',
        date: 'Dec 2025',
    },
    {
        id: '#MXL-2024-0312',
        type: 'Business Loan',
        amount: 'SLe 2,500,000',
        status: 'Completed',
        statusColor: '#0284c7',
        paid: '100%',
        date: 'Jan 2024',
    },
];

export default function LoansPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#f4f5f7', fontFamily: 'var(--font-family)' }}>
            <div className="w-full max-w-[420px] min-h-screen flex flex-col pb-20">

                {/* Header */}
                <header className="px-5 pt-10 pb-6 text-white" style={{ backgroundColor: '#ff7900' }}>
                    <h1 className="text-lg font-extrabold mb-1">My Loans</h1>
                    <p className="text-xs opacity-80">All your loan history</p>
                </header>

                <main className="flex-grow px-5 py-6">
                    <div className="flex flex-col gap-4">
                        {loans.map((loan) => (
                            <button
                                key={loan.id}
                                onClick={() => router.push('/dashboard/loan-status')}
                                className="bg-white rounded-2xl p-5 text-left border-none cursor-pointer transition-all duration-200 w-full"
                                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-medium">{loan.id}</p>
                                        <p className="text-sm font-bold text-slate-800">{loan.type}</p>
                                    </div>
                                    <span
                                        className="text-[10px] font-bold px-3 py-1 rounded-full text-white"
                                        style={{ backgroundColor: loan.statusColor }}
                                    >
                                        {loan.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs text-slate-500 mb-2">
                                    <span className="font-semibold text-slate-700">{loan.amount}</span>
                                    <span>{loan.date}</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: loan.paid, backgroundColor: '#ff7900' }} />
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1.5">{loan.paid} repaid</p>
                            </button>
                        ))}
                    </div>

                    {/* Apply for new loan */}
                    <button
                        onClick={() => router.push('/apply')}
                        className="w-full mt-6 py-4 rounded-xl text-sm font-bold border-none cursor-pointer transition-all duration-200 text-white"
                        style={{ backgroundColor: '#ff7900', boxShadow: '0 4px 12px rgba(255,121,0,0.25)' }}
                    >
                        + Apply for New Loan
                    </button>
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
