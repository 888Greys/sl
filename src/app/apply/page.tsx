import type { Metadata } from "next";
import NavbarApply from "@/components/NavbarApply";
import LoanApplicationForm from "@/components/LoanApplicationForm";

export const metadata: Metadata = {
    title: "Loan Application – MaxIt",
    description: "Apply for a MaxIt loan in just 3 easy steps.",
};

export default function ApplyPage() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-page)' }}>
            <NavbarApply />
            <main className="flex-grow flex justify-center items-start p-10">
                <LoanApplicationForm />
            </main>
            <footer className="text-center py-5 text-[11px]" style={{ color: '#94a3b8' }}>
                © 2025 Max It Sierra Leone
            </footer>
        </div>
    );
}
