'use client'

import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

const ErrorPage = ({ error, reset }) => {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4D30]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full text-center bg-white border border-slate-200/60 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-slate-200/80 relative z-10">
                
                <div className="inline-flex items-center justify-center p-4 bg-[#FF4D30]/10 text-[#FF4D30] rounded-2xl mb-6 animate-pulse">
                    <AlertTriangle size={40} />
                </div>

                <h1 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-wider">
                    Something Went Wrong!
                </h1>
                
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                    An unexpected error occurred while processing your request. Our team has been notified.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => reset?.()}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#FF4D30] hover:bg-[#e03d21] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-[#FF4D30]/10 hover:shadow-[#FF4D30]/20 active:scale-[0.98] text-sm uppercase tracking-wider cursor-pointer"
                    >
                        <RefreshCw size={16} className="animate-spin-slow" />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] text-sm uppercase tracking-wider cursor-pointer"
                    >
                        <Home size={16} className="text-slate-500" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;