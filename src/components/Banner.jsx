"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import Link from "next/link";

const Banner = () => {
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/cars?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <section className="relative w-full bg-white overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-14">

            <div className="absolute top-0 right-0 w-[100%] md:w-[50%] h-full bg-gradient-to-l from-red-50/40 via-red-50/10 to-transparent pointer-events-none z-0" />
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#FF4D30]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">

                    {/* Left side */}
                    <motion.div
                        className="lg:col-span-5 space-y-5 text-center lg:text-left"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <p className="text-sm font-bold tracking-wider text-slate-900 uppercase">
                            Premium Fleet Experience
                        </p>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                            Rent the <span className="text-[#FF4D30]">best</span> cars for your
                            next ride
                        </h1>

                        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Rent the car of your dreams with absolute confidence. DriveFleet offers unbeatable prices, flexible booking options, and premium local support for an exceptional journey.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                            <Link href={'/cars'}
                                className="bg-[#FF4D30] hover:bg-[#e03a1e] text-white px-8 py-4 rounded-lg font-bold text-sm flex items-center space-x-2 transition-all shadow-lg shadow-[#FF4D30]/20 transform active:scale-95 group"
                            >
                                <span>Book Ride</span>
                                <Calendar className="h-4 w-4 transform group-hover:scale-110 transition-transform" />
                            </Link>

                            <Link href={'/cars'}
                                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold text-sm flex items-center space-x-2 transition-all transform active:scale-95 group"
                            >
                                <span>Learn More</span>
                                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start space-x-6 pt-6 text-xs font-semibold text-slate-500 border-t border-slate-100 max-w-md mx-auto lg:mx-0">
                            <div className="flex items-center space-x-1">
                                <ShieldCheck className="h-4 w-4 text-[#FF4D30]" />
                                <span>Premium Fleet</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <ShieldCheck className="h-4 w-4 text-[#FF4D30]" />
                                <span>24/7 Roadside Assist</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* right section */}

                    <motion.div
                        className="lg:col-span-7 relative w-full h-[300px] sm:h-[420px] lg:h-[500px] flex items-center justify-center lg:justify-end overflow-visible select-none"
                        initial={{ opacity: 0, x: 70 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    >
                        <div className="relative w-full lg:w-[125%] h-full lg:-mr-20 xl:-mr-32">
                            <Image
                                src="/assets/banner_car3.png"
                                alt="DriveFleet Premium Car"
                                fill
                                priority
                                sizes="(max-w-7xl) 60vw"

                                className="object-contain lg:object-right-bottom"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Banner;