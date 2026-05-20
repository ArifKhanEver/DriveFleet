"use client";

import React from 'react';
import { IoSpeedometerOutline } from 'react-icons/io5';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Animated Speedometer / Wheel Icon */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing Outer Glow */}
          <div className="absolute w-20 h-20 bg-[#FF4D30]/10 rounded-full animate-ping duration-1000"></div>
          
          <div className="relative p-5 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm text-[#FF4D30] animate-bounce duration-700">
            <IoSpeedometerOutline size={44} className="animate-pulse" />
          </div>
        </div>

        {/* Brand & Progress Bar */}
        <div className="text-center space-y-3 w-64">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Drive<span className="text-[#FF4D30]">Fleet</span>
          </h2>
          
          {/* Custom Car Rental Loading Bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
            <div className="h-full bg-[#FF4D30] rounded-full w-full absolute top-0 -left-full animate-shimmer"></div>
          </div>
          
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Fueling up your fleet...
          </p>
        </div>

      </div>

      {/* Custom Keyframe Animation for the Loading Bar */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { left: -100%; }
          50% { left: 0%; }
          100% { left: 100%; }
        }
        .animate-shimmer {
          animation: shimmer 1.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Loading;