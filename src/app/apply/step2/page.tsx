import type { Metadata } from "next";
import NavbarApply from "@/components/NavbarApply";
import PersonalDetailsForm from "@/components/PersonalDetailsForm";

export const metadata: Metadata = {
    title: "Personal Details – MaxIt Loan Application",
    description: "Step 2 of 3 – Enter your personal details to apply for a MaxIt loan.",
};

export default function ApplyStep2Page() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-page)' }}>
            <NavbarApply />
            <main className="flex-grow flex justify-center items-start p-10">
                <PersonalDetailsForm />
            </main>
            <footer className="text-center py-5 text-[11px]" style={{ color: '#94a3b8' }}>
                © 2025 Max It Sierra Leone
            </footer>
        </div>
    );
}
