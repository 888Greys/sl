'use client';

import { useRouter } from 'next/navigation';

const navItems = [
    { label: 'Home', icon: '🏠', href: '/dashboard' },
    { label: 'Loans', icon: '💰', href: '/dashboard/loans' },
    { label: 'Status', icon: '📋', href: '/dashboard/loan-status' },
    { label: 'Profile', icon: '👤', href: '/dashboard/profile', active: true },
];

const menuItems = [
    { icon: '🔔', label: 'Notifications', sub: 'Manage your alerts' },
    { icon: '🔒', label: 'Change PIN', sub: 'Update your security PIN' },
    { icon: '📞', label: 'Contact Support', sub: '+232 77 000 000' },
    { icon: '📄', label: 'Terms & Conditions', sub: 'Read our T&Cs' },
    { icon: '⭐', label: 'Rate the App', sub: 'Tell us how we did' },
];

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.clear();
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex justify-center" style={{ backgroundColor: '#f4f5f7', fontFamily: 'var(--font-family)' }}>
            <div className="w-full max-w-[420px] min-h-screen flex flex-col pb-20">

                {/* Header */}
                <header className="px-5 pt-10 pb-8 text-white flex flex-col items-center" style={{ backgroundColor: '#ff7900' }}>
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl mb-3 shadow-lg">
                        👤
                    </div>
                    <h1 className="text-lg font-extrabold">Mohamed Kamara</h1>
                    <p className="text-xs opacity-80 mt-1">+232 76 123 456</p>
                    <p className="text-[10px] opacity-70 mt-0.5">Member since Dec 2024</p>
                </header>

                <main className="flex-grow px-5 py-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                            { label: 'Total Loans', value: '2' },
                            { label: 'Active', value: '1' },
                            { label: 'Credit Score', value: 'A+' },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-white rounded-xl p-3 text-center" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                <p className="text-lg font-extrabold text-slate-800">{value}</p>
                                <p className="text-[9px] text-slate-400 font-medium mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Personal Info */}
                    <div className="bg-white rounded-2xl p-5 mb-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">Personal Info</h2>
                        {[
                            { label: 'Full Name', value: 'Mohamed Kamara' },
                            { label: 'Email', value: 'mk@example.com' },
                            { label: 'NIN', value: 'SL-****-8742' },
                            { label: 'Employment', value: 'Employed' },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                                <p className="text-[11px] text-slate-400 font-medium">{label}</p>
                                <p className="text-[11px] font-semibold text-slate-700">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Menu Items */}
                    <div className="bg-white rounded-2xl overflow-hidden mb-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        {menuItems.map(({ icon, label, sub }, i) => (
                            <button
                                key={label}
                                className="w-full flex items-center gap-4 px-5 py-4 text-left border-none bg-transparent cursor-pointer transition-colors hover:bg-slate-50"
                                style={{ borderBottom: i < menuItems.length - 1 ? '1px solid #f8fafc' : 'none' }}
                            >
                                <span className="text-xl w-7 flex-shrink-0">{icon}</span>
                                <div className="flex-grow">
                                    <p className="text-xs font-semibold text-slate-700">{label}</p>
                                    <p className="text-[10px] text-slate-400">{sub}</p>
                                </div>
                                <span className="text-slate-300 text-sm">›</span>
                            </button>
                        ))}
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full py-4 rounded-xl text-sm font-bold border-none cursor-pointer transition-all duration-200"
                        style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
                    >
                        🚪 Log Out
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
