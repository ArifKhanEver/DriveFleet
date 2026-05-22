"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Users, Fuel, Calendar, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CarCard from "./CarCard";

const TABS = ["All", "Audi", "Mercedes", "BMW", "Tesla"];

const AvailableCars = () => {

    const [cars, setCars] = useState([])

    useEffect(() => {
        fetch('https://drive-fleet-sever.vercel.app/cars').then(res => res.json()).then(data => { setCars(data) }).catch(err => console.error(err))

    }, [])


    const [activeTab, setActiveTab] = useState("All");

    const filteredCars = activeTab === "All" ? cars : cars.filter(car => car.brand === activeTab);
    return (
        <section className="w-full bg-slate-50/50 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* section header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                        Explore Most Popular Cars
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                        Here's a list of some of the most popular cars globally, curated carefully to deliver ultimate performance and comfort.
                    </p>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-4 mb-12">

                    <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-200/60 p-1.5 rounded-2xl border border-slate-300/30 backdrop-blur-sm">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${activeTab === tab
                                    ? "text-white bg-slate-900 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                                    }`}
                            >
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>

                    <div className="w-full sm:w-auto flex justify-center lg:absolute lg:right-0">
                        <Link
                            href="/cars"
                            className="inline-flex items-center gap-2 bg-white hover:bg-[#FF4D30] text-slate-900 hover:text-white border border-slate-200 hover:border-[#FF4D30] px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#FF4D30]/10 group active:scale-[0.98] w-full sm:w-auto justify-center cursor-pointer"
                        >
                            <span>View All Cars</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* car cards */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {[...filteredCars]
                            .sort((a, b) => (b.booking_count || 0) - (a.booking_count || 0))
                            .slice(0, 6)
                            .map((car) => (
                                <CarCard car={car} key={car._id} />
                            ))
                        }
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
};

export default AvailableCars;