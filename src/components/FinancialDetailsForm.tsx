'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from './StepProgress';

const selectArrowSvg = `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`;

const inputClass =
    'w-full px-3 py-3 border border-slate-300 rounded-md text-sm text-slate-800 bg-white font-[inherit] transition-all duration-200 outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_2px_rgba(239,125,0,0.1)]';

const labelClass = 'block text-[11px] font-semibold text-slate-700 mb-2';

interface LoanData {
    loanType?: string;
    loanAmount?: string;
    loanTerm?: string;
    loanPurpose?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}

const formatCurrency = (val: string) => {
    const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? val : num.toLocaleString('en-US');
};

const loanTypeLabel: Record<string, string> = {
    personal: 'Personal Loan',
    business: 'Business Loan',
    auto: 'Auto Loan',
};

const FinancialDetailsForm = () => {
    const router = useRouter();
    const [employmentStatus, setEmploymentStatus] = useState('employed');
    const [annualIncome, setAnnualIncome] = useState('');
    const [annualIncomeDisplay, setAnnualIncomeDisplay] = useState('');
    const [loanData, setLoanData] = useState<LoanData>({});
    const [error, setError] = useState('');

    useEffect(() => {
        const stored = sessionStorage.getItem('loanData');
        if (stored) setLoanData(JSON.parse(stored));
    }, []);

    const handleIncomeBlur = () => {
        if (annualIncome) {
            setAnnualIncomeDisplay(formatCurrency(annualIncome));
        }
    };

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        setAnnualIncome(raw);
        setAnnualIncomeDisplay(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!annualIncome) {
            setError('Please enter your annual income.');
            return;
        }

        const finalData = {
            ...loanData,
            employmentStatus,
            annualIncome,
        };

        console.log('Final Application Data:', finalData);
        sessionStorage.setItem('loanData', JSON.stringify(finalData));
        router.push('/apply/submitted');
    };

    return (
        <div className="bg-white w-full max-w-[420px] rounded-xl shadow-lg px-5 py-8">
            {/* Header */}
            <div className="text-center mb-1">
                <h1 className="text-lg font-bold text-slate-900">Loan Application</h1>
                <p className="text-[11px] text-slate-500 mt-1">Step 3 of 3</p>
                <StepProgress currentStep={3} totalSteps={3} />
            </div>

            <form onSubmit={handleSubmit} noValidate>
                {/* Employment Status */}
                <div className="mb-5">
                    <label htmlFor="employment-status" className={labelClass}>Employment Status</label>
                    <select
                        id="employment-status"
                        value={employmentStatus}
                        onChange={(e) => setEmploymentStatus(e.target.value)}
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
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="student">Student</option>
                        <option value="retired">Retired</option>
                    </select>
                </div>

                {/* Annual Income */}
                <div className="mb-5">
                    <label htmlFor="annual-income" className={labelClass}>Annual Income (SLe)</label>
                    <input
                        type="text"
                        id="annual-income"
                        value={annualIncomeDisplay}
                        onChange={handleIncomeChange}
                        onBlur={handleIncomeBlur}
                        placeholder="100,000"
                        className={inputClass}
                    />
                </div>

                {/* Application Summary */}
                <div
                    className="rounded-lg p-5 mt-6 mb-6"
                    style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid var(--primary)' }}
                >
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Application Summary</h3>
                    <ul className="list-none p-0 m-0">
                        {[
                            {
                                label: 'Loan Type:',
                                value: loanTypeLabel[loanData.loanType ?? ''] || loanData.loanType || '—',
                            },
                            {
                                label: 'Loan Amount:',
                                value: loanData.loanAmount
                                    ? `SLe ${Number(loanData.loanAmount).toLocaleString('en-US')}`
                                    : '—',
                            },
                            {
                                label: 'Loan Term:',
                                value: loanData.loanTerm ? `${loanData.loanTerm} Months` : '—',
                            },
                            {
                                label: 'Purpose:',
                                value: loanData.loanPurpose || '—',
                            },
                            {
                                label: 'Applicant:',
                                value:
                                    loanData.firstName && loanData.lastName
                                        ? `${loanData.firstName} ${loanData.lastName}`
                                        : '—',
                            },
                            {
                                label: 'Phone:',
                                value: loanData.phone || '—',
                            },
                        ].map(({ label, value }, i, arr) => (
                            <li
                                key={label}
                                className="flex justify-between items-center py-3"
                                style={{ borderBottom: i < arr.length - 1 ? '1px solid #e2e8f0' : 'none' }}
                            >
                                <span className="text-[11px] text-slate-500 font-medium">{label}</span>
                                <span className="text-xs font-semibold text-slate-800 text-right max-w-[60%] break-words">
                                    {value}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-xs mb-3 font-medium">{error}</p>
                )}

                {/* Buttons */}
                <div className="flex flex-col gap-4">
                    <button
                        type="submit"
                        className="w-full text-white font-bold text-sm py-4 rounded-lg transition-colors duration-200 cursor-pointer border-none"
                        style={{ backgroundColor: 'var(--primary)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                    >
                        SUBMIT APPLICATION
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

export default FinancialDetailsForm;
