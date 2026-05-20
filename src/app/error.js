'use client'
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
const error = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4D30]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full text-center bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl relative z-10">
                
                <div className="inline-flex items-center justify-center p-4 bg-[#FF4D30]/10 text-[#FF4D30] rounded-2xl mb-6 animate-pulse">
                    <AlertTriangle size={40} />
                </div>

                <h1 className="text-2xl font-black text-white mb-3 uppercase tracking-wider">
                    Something Went Wrong!
                </h1>
                
                <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8">
                    An unexpected error occurred while processing your request. Our team has been notified.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => reset()}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#FF4D30] hover:bg-[#e03d21] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-[#FF4D30]/10 active:scale-[0.98] text-sm uppercase tracking-wider"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] text-sm uppercase tracking-wider"
                    >
                        <Home size={16} />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default error;