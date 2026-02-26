import Navbar from "@/components/Navbar";
import LoanCalculator from "@/components/LoanCalculator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-page)' }}>
      <Navbar />
      <main className="flex-grow flex justify-center items-start p-10">
        <LoanCalculator />
      </main>
      <footer className="text-center py-5 text-[11px]" style={{ color: '#94a3b8' }}>
        © 2025 Max It Sierra Leone
      </footer>
    </div>
  );
}
