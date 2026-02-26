'use client';

import { useRouter } from 'next/navigation';

interface NavbarApplyProps {
    step?: number;
    totalSteps?: number;
}

const NavbarApply = ({ step = 1, totalSteps = 3 }: NavbarApplyProps) => {
    const router = useRouter();

    return (
        <header
            style={{ backgroundColor: 'var(--primary)' }}
            className="h-[60px] flex items-center px-5 shadow-md"
        >
            {/* Left: Back button */}
            <div className="flex-1">
                <button
                    onClick={() => router.back()}
                    className="text-white bg-transparent border-none text-base font-medium cursor-pointer flex items-center gap-1"
                >
                    ← Back
                </button>
            </div>

            {/* Center: Logo */}
            <div className="flex-1 flex justify-center">
                <div className="text-white text-2xl font-bold tracking-tighter">
                    Max<span className="text-black">It</span>
                </div>
            </div>

            {/* Right: Hamburger */}
            <div className="flex-1 flex justify-end">
                <button
                    className="flex flex-col gap-[5px] p-[5px] cursor-pointer bg-transparent border-none"
                    aria-label="Menu"
                >
                    <span className="block w-[25px] h-[3px] bg-white rounded-full"></span>
                    <span className="block w-[25px] h-[3px] bg-white rounded-full"></span>
                    <span className="block w-[25px] h-[3px] bg-white rounded-full"></span>
                </button>
            </div>
        </header>
    );
};

export default NavbarApply;
