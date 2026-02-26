import type { Metadata } from "next";
import NavbarApply from "@/components/NavbarApply";
import FinancialDetailsForm from "@/components/FinancialDetailsForm";

export const metadata: Metadata = {
    title: "Review & Submit – MaxIt Loan Application",
    description: "Step 3 of 3 – Review your application and submit.",
};

export default function ApplyStep3Page() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-page)' }}>
            <NavbarApply />
            <main className="flex-grow flex justify-center items-start p-10">
                <FinancialDetailsForm />
            </main>
            <footer className="text-center py-5 text-[11px]" style={{ color: '#94a3b8' }}>
                © 2025 Max It Sierra Leone
            </footer>
        </div>
    );
}
