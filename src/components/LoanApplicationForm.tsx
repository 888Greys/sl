'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from './StepProgress';

const selectArrowSvg = `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`;

const inputClass =
    'w-full px-3 py-3 border border-slate-300 rounded-md text-sm text-slate-800 bg-white font-[inherit] transition-all duration-200 outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_2px_rgba(239,125,0,0.1)]';

const labelClass = 'block text-[11px] font-semibold text-slate-700 mb-2';

const LoanApplicationForm = () => {
    const router = useRouter();
    const [loanType, setLoanType] = useState('personal');
    const [loanAmount, setLoanAmount] = useState('5000000');
    const [loanTerm, setLoanTerm] = useState('12');
    const [loanPurpose, setLoanPurpose] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!loanAmount || Number(loanAmount) <= 0) {
            setError('Please enter a valid loan amount.');
            return;
        }

        // Store form data in sessionStorage and navigate to next step
        sessionStorage.setItem(
            'loanData',
            JSON.stringify({ loanType, loanAmount, loanTerm, loanPurpose })
        );

        router.push('/apply/step2');
    };

    return (
        <div className="bg-white w-full max-w-[420px] rounded-xl shadow-lg px-5 py-8">
            {/* Form Header */}
            <div className="text-center mb-1">
                <h1 className="text-lg font-bold text-slate-900">Loan Application</h1>
                <p className="text-[11px] text-slate-500 mt-1">Step 1 of 3</p>
                <StepProgress currentStep={1} totalSteps={3} />
            </div>

            <form onSubmit={handleSubmit} noValidate>
                {/* Loan Type */}
                <div className="mb-5">
                    <label htmlFor="loan-type" className={labelClass}>Loan Type</label>
                    <select
                        id="loan-type"
                        value={loanType}
                        onChange={(e) => setLoanType(e.target.value)}
                        className={inputClass}
                        style={{
                            appearance: 'none',
                            backgroundImage: selectArrowSvg,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            backgroundSize: '14px',
                            paddingRight: '30px',
                        }}
                    >
                        <option value="personal">Personal Loan</option>
                        <option value="business">Business Loan</option>
                        <option value="auto">Auto Loan</option>
                    </select>
                </div>

                {/* Loan Amount */}
                <div className="mb-5">
                    <label htmlFor="loan-amount" className={labelClass}>Loan Amount (SLe)</label>
                    <input
                        type="number"
                        id="loan-amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        min="0"
                        className={inputClass}
                        placeholder="e.g. 5000000"
                    />
                </div>

                {/* Loan Term */}
                <div className="mb-5">
                    <label htmlFor="loan-term" className={labelClass}>Loan Term</label>
                    <select
                        id="loan-term"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className={inputClass}
                        style={{
                            appearance: 'none',
                            backgroundImage: selectArrowSvg,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            backgroundSize: '14px',
                            paddingRight: '30px',
                        }}
                    >
                        <option value="6">6 Months</option>
                        <option value="12">12 Months</option>
                        <option value="24">24 Months</option>
                        <option value="36">36 Months</option>
                        <option value="48">48 Months</option>
                        <option value="60">60 Months</option>
                    </select>
                </div>

                {/* Loan Purpose */}
                <div className="mb-5">
                    <label htmlFor="loan-purpose" className={labelClass}>Purpose of Loan</label>
                    <textarea
                        id="loan-purpose"
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                        placeholder="What will you use the loan for?"
                        rows={3}
                        className={`${inputClass} resize-y min-h-[80px]`}
                    />
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-xs mb-3 font-medium">{error}</p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="block w-full text-white font-bold text-sm py-4 rounded-lg mt-2 transition-colors duration-200 cursor-pointer border-none"
                    style={{ backgroundColor: 'var(--primary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                >
                    NEXT STEP
                </button>
            </form>
        </div>
    );
};

export default LoanApplicationForm;
