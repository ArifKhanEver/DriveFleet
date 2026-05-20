import React from 'react';
import Link from 'next/link';
import { Car, ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="relative min-h-screen lg:py-28 bg-white flex items-center justify-center font-sans overflow-hidden">
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

            <div className="relative max-w-xl w-full px-6 text-center z-10">
                
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 border border-slate-200/60 rounded-full shadow-xs mb-6 select-none animate-fade-in">
                    <Car className="h-4 w-4 text-[#FF4D30]" />
                    <span className="text-[11px] font-bold text-slate-600 tracking-widest uppercase">DriveFleet Portal</span>
                </div>

                <h1 className="text-[9rem] sm:text-[13rem] font-black tracking-tighter text-slate-900 leading-none mb-4 select-none bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    404
                </h1>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Oops! You've drifted off course.
                </h2>

                <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10">
                    The premium vehicle listing, dashboard route, or rental configuration you are trying to reach has either taken a detour or been permanently relocated.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="group inline-flex items-center justify-center gap-2 bg-[#FF4D30] hover:bg-[#e03d21] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF4D30]/20 hover:shadow-[#FF4D30]/30 active:scale-[0.98] text-xs uppercase tracking-widest w-full sm:w-auto cursor-pointer"
                    >
                        Back to Home Base
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </main>
    );
}