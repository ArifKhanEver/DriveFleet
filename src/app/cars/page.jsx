'use client';

import { useState, useEffect } from 'react';
import CarCard from '@/components/CarCard';
import { Search, SlidersHorizontal, Car, Sparkles, ShieldCheck, Flame, RefreshCw } from 'lucide-react';

export default function ExploreCarsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeQuery, setTypeQuery] = useState('All');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async()=>{
            try {
                const res = await fetch(
                    `https://drive-fleet-sever.vercel.app/cars?search=${searchQuery}&type=${typeQuery}`
                );
                const data = await res.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        })();

    }, [searchQuery, typeQuery]);

    return (
        <main className="min-h-screen bg-[#F8FAFC] py-14 lg:py-20 mt-10 antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Responsive grid to eliminate empty space on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-200/60 pb-12 mb-12">
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-2 bg-[#FF4D30]/10 text-[#FF4D30] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full w-fit mb-4">
                            <Sparkles size={12} />
                            Only Premium Experience
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                            Explore Our <br />
                            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#FF4D30] bg-clip-text text-transparent">
                                Luxury Fleet
                            </span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm md:text-base mt-4 max-w-xl leading-relaxed">
                            Don't just drive. Elevate your journey with our meticulously curated collection of top-tier, performance-tested vehicles. Everything you need for a first-class trip.
                        </p>
                    </div>

                    <div className="lg:col-span-5 w-full">
                        <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-200/50">
                            <div className="border-r border-slate-100 pr-2 text-center sm:text-left">
                                <span className="text-2xl md:text-3xl font-black text-slate-900 block">100%</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1 mt-1">
                                    <ShieldCheck size={12} className="text-[#FF4D30]" /> Sanitized
                                </span>
                            </div>
                            <div className="border-r border-slate-100 pr-2 pl-2 text-center sm:text-left">
                                <span className="text-2xl md:text-3xl font-black text-slate-900 block">24/7</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1 mt-1">
                                    <Flame size={12} className="text-[#FF4D30]" /> Roadside
                                </span>
                            </div>
                            <div className="pl-2 text-center sm:text-left">
                                <span className="text-2xl md:text-3xl font-black text-[#FF4D30] block">
                                    {loading ? '...' : cars.length}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1 mt-1">
                                    <Car size={12} /> Fleet
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and filter action panel */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/20 mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative w-full md:flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Type brand or model name (e.g., Tesla)..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-5 py-3.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all"
                        />
                    </div>

                    <div className="relative w-full md:w-64 flex-shrink-0">
                        <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                        <select
                            value={typeQuery}
                            onChange={(e) => setTypeQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-3.5 text-sm font-black text-slate-700 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                            <option value="All">All Categories</option>
                            <option value="SUV">SUV Collection</option>
                            <option value="Sedan">Luxury Sedan</option>
                            <option value="Electric">Electric Vehicle</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-slate-500 w-0 h-0" />
                    </div>
                </div>

                {/* Quick category selection badges */}
                <div className="flex flex-wrap items-center gap-2 mb-12 px-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Quick Filter:</span>
                    {['All', 'SUV', 'Sedan', 'Electric'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setTypeQuery(type)}
                            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border ${
                                typeQuery === type
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#FF4D30] hover:text-[#FF4D30]'
                            }`}
                        >
                            {type === 'All' ? 'All Cars' : type}
                        </button>
                    ))}
                </div>

                {/* Grid map using the original modular card component */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
                        <RefreshCw className="h-7 w-7 animate-spin text-[#FF4D30]" />
                        <span className="text-xs font-bold uppercase tracking-wider">Syncing Fleet Data...</span>
                    </div>
                ) : cars.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl border border-slate-100 max-w-md mx-auto flex flex-col items-center justify-center p-6 shadow-sm">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">No Matches Found</h3>
                        <p className="text-slate-400 font-medium text-xs mt-1">
                            Try adjusting your keywords or category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}