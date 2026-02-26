'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from './StepProgress';

const inputClass =
    'w-full px-3 py-3 border border-slate-300 rounded-md text-sm text-slate-800 bg-white font-[inherit] transition-all duration-200 outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_2px_rgba(239,125,0,0.1)]';

const labelClass = 'block text-[11px] font-semibold text-slate-700 mb-2';

const PersonalDetailsForm = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!firstName.trim()) { setError('Please enter your first name.'); return; }
        if (!lastName.trim()) { setError('Please enter your last name.'); return; }
        if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email address.'); return; }
        if (phone && phone.length !== 8) { setError('Please enter exactly 8 digits for the phone number.'); return; }

        // Save to sessionStorage
        const existing = JSON.parse(sessionStorage.getItem('loanData') || '{}');
        sessionStorage.setItem('loanData', JSON.stringify({
            ...existing,
            firstName,
            lastName,
            email,
            phone: '+232' + phone,
        }));

        // Navigate to step 3
        router.push('/apply/step3');
    };

    return (
        <div className="bg-white w-full max-w-[420px] rounded-xl shadow-lg px-5 py-8">
            {/* Header */}
            <div className="text-center mb-1">
                <h1 className="text-lg font-bold text-slate-900">Loan Application</h1>
                <p className="text-[11px] text-slate-500 mt-1">Step 2 of 3</p>
                <StepProgress currentStep={2} totalSteps={3} />
            </div>

            <form onSubmit={handleSubmit} noValidate>
                {/* First Name */}
                <div className="mb-5">
                    <label htmlFor="first-name" className={labelClass}>First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Mohamed"
                        className={inputClass}
                    />
                </div>

                {/* Last Name */}
                <div className="mb-5">
                    <label htmlFor="last-name" className={labelClass}>Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Kamara"
                        className={inputClass}
                    />
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mohamed.kamara@example.com"
                        className={inputClass}
                    />
                </div>

                {/* Phone */}
                <div className="mb-5">
                    <label htmlFor="phone" className={labelClass}>Phone Number</label>
                    <div className="flex items-stretch">
                        <div className="bg-slate-100 border border-slate-300 border-r-0 rounded-l-md px-4 flex items-center text-sm font-semibold text-slate-700 flex-shrink-0">
                            +232
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 8))}
                            placeholder="76123456"
                            maxLength={8}
                            className={`${inputClass} rounded-l-none`}
                        />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                        Enter 8 digits (e.g., 76123456 or 88123456)
                    </span>
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-xs mb-3 font-medium">{error}</p>
                )}

                {/* Buttons */}
                <div className="flex flex-col gap-4 mt-8">
                    <button
                        type="submit"
                        className="w-full text-white font-bold text-sm py-4 rounded-lg transition-colors duration-200 cursor-pointer border-none"
                        style={{ backgroundColor: 'var(--primary)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                    >
                        NEXT STEP
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full font-bold text-sm py-4 rounded-lg transition-colors duration-200 cursor-pointer border-none bg-slate-200 text-slate-600 hover:bg-slate-300"
                    >
                        PREVIOUS
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalDetailsForm;
