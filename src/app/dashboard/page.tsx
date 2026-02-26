'use client';

import { useRouter } from 'next/navigation';

const navItems = [
    { label: 'Home', icon: '🏠', href: '/dashboard', active: true },
    { label: 'Loans', icon: '💰', href: '/dashboard/loans' },
    { label: 'Status', icon: '📋', href: '/dashboard/loan-status' },
    { label: 'Profile', icon: '👤', href: '/dashboard/profile' },
];

export default function DashboardPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#f4f5f7', fontFamily: 'var(--font-family)' }}>
            <div className="w-full max-w-[420px] min-h-screen flex flex-col pb-20 relative">

                {/* Top Header */}
                <header className="px-5 pt-10 pb-6" style={{ backgroundColor: '#ff7900' }}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-white text-xs font-medium opacity-80">Welcome back,</p>
                            <h1 className="text-white text-xl font-extrabold">Mohamed Kamara</h1>
                        </div>
                        <button
                            onClick={() => router.push('/dashboard/profile')}
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg shadow border-none cursor-pointer"
                        >
                            👤
                        </button>
                    </div>

                    {/* Loan Summary Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-lg">
                        <p className="text-xs text-slate-400 font-medium mb-1">Active Loan Balance</p>
                        <p className="text-2xl font-extrabold text-slate-900 mb-3">SLe 5,000,000</p>
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                            <span>Paid: SLe 1,475,000</span>
                            <span>Remaining: SLe 3,525,000</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: '29.5%', backgroundColor: '#ff7900' }} />
                        </div>
                        <div className="flex justify-between mt-3 text-xs">
                            <span className="text-slate-400">Next payment: <span className="font-semibold text-slate-700">Mar 15, 2026</span></span>
                            <span className="font-bold" style={{ color: '#ff7900' }}>SLe 491,667</span>
                        </div>
                    </div>
                </header>

                {/* Body */}
                <main className="flex-grow px-5 py-6">

                    {/* Quick Actions */}
                    <h2 className="text-sm font-bold text-slate-700 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                            { icon: '💳', label: 'Make\nPayment', action: () => { } },
                            { icon: '📄', label: 'New\nLoan', action: () => router.push('/apply') },
                            { icon: '📋', label: 'View\nStatus', action: () => router.push('/dashboard/loan-status') },
                        ].map(({ icon, label, action }) => (
                            <button
                                key={label}
                                onClick={action}
                                className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm text-center transition-all duration-200 border-none cursor-pointer"
                                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                <span className="text-2xl">{icon}</span>
                                <span className="text-[10px] font-semibold text-slate-600 whitespace-pre-line leading-tight">{label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <h2 className="text-sm font-bold text-slate-700 mb-4">Recent Activity</h2>
                    <div className="flex flex-col gap-3">
                        {[
                            { date: 'Feb 15, 2026', desc: 'Monthly payment received', amount: '-SLe 491,667', color: '#16a34a' },
                            { date: 'Jan 15, 2026', desc: 'Monthly payment received', amount: '-SLe 491,667', color: '#16a34a' },
                            { date: 'Dec 20, 2025', desc: 'Loan disbursed', amount: '+SLe 5,000,000', color: '#ff7900' },
                        ].map(({ date, desc, amount, color }) => (
                            <div key={date + desc} className="bg-white rounded-xl px-4 py-3 flex justify-between items-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                <div>
                                    <p className="text-xs font-semibold text-slate-700">{desc}</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">{date}</p>
                                </div>
                                <span className="text-xs font-bold" style={{ color }}>{amount}</span>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Bottom Nav */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-slate-100 flex justify-around items-center py-3 z-50">
                    {navItems.map(({ label, icon, href, active }) => (
                        <button
                            key={label}
                            onClick={() => router.push(href)}
                            className="flex flex-col items-center gap-1 border-none bg-transparent cursor-pointer"
                        >
                            <span className="text-xl">{icon}</span>
                            <span className="text-[9px] font-semibold" style={{ color: active ? '#ff7900' : '#94a3b8' }}>{label}</span>
                        </button>
                    ))}
                </nav>

            </div>
        </div>
    );
}
