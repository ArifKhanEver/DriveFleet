"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Users, Fuel, Calendar, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DUMMY_CARS = [
    {
        id: "1",
        name: "Audi A6 Matrix Sport",
        brand: "Audi",
        carType: "Luxury", 
        price: 120,
        year: "2024",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: "5 Persons", 
        location: "Dhaka, Gulshan", 
        image: "/assets/banner_car.png", 
        description: "Experience the ultimate luxury with high-tech Matrix LED headlights and executive lounge seating comfort.", // Added for details page
        availabilityStatus: "Available" 
    },
    {
        id: "2",
        name: "Mercedes-Benz C-Class",
        brand: "Mercedes",
        carType: "Sedan",
        price: 150,
        year: "2025",
        fuel: "Hybrid",
        transmission: "Automatic",
        seats: "5 Persons",
        location: "Chittagong, GEC",
        image: "/assets/banner_car.png",
        description: "A perfect blend of modern driving intelligence and sporty elegant design language.",
        availabilityStatus: "Rented"
    },
    {
        id: "3",
        name: "BMW M4 Competition",
        brand: "BMW",
        carType: "Sports",
        price: 180,
        year: "2024",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: "4 Persons",
        location: "Dhaka, Banani",
        image: "/assets/banner_car.png",
        description: "Track-ready performance coupe with aggressive styling and raw turbocharged horsepower.",
        availabilityStatus: "Available"
    },
    {
        id: "4",
        name: "Tesla Model S Plaid",
        brand: "Tesla",
        carType: "Electric",
        price: 160,
        year: "2024",
        fuel: "Electric",
        transmission: "Automatic",
        seats: "5 Persons",
        location: "Dhaka, Uttara",
        image: "/assets/banner_car.png",
        description: "Beyond fast. Experience multi-device Bluetooth, active noise canceling, and gaming-class processing.",
        availabilityStatus: "Available"
    },
    {
        id: "5",
        name: "Toyota RAV4 Hybrid",
        brand: "Toyota",
        carType: "SUV",
        price: 90,
        year: "2024",
        fuel: "Hybrid",
        transmission: "Automatic",
        seats: "5 Persons",
        location: "Sylhet, Zindabazar",
        image: "/assets/banner_car.png",
        description: "Built for weekend getaways and rugged terrains with exceptional fuel mileage efficiency.",
        availabilityStatus: "Available"
    },
    {
        id: "6",
        name: "Honda Civic Type R",
        brand: "Honda",
        carType: "Hatchback",
        price: 110,
        year: "2024",
        fuel: "Petrol",
        transmission: "Manual",
        seats: "4 Persons",
        location: "Dhaka, Dhanmondi",
        image: "/assets/banner_car.png",
        description: "The ultimate hot-hatch designed for precision cornering and pure mechanical gearshifts.",
        availabilityStatus: "Rented"
    },
];

const TABS = ["All", "Audi", "Mercedes", "BMW", "Tesla"];

const AvailableCars = () => {
    const [activeTab, setActiveTab] = useState("All");

    const filteredCars = activeTab === "All" ? DUMMY_CARS : DUMMY_CARS.filter(car => car.brand === activeTab);
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
                        {filteredCars.map((car) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                key={car.id}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
                            >
                                <div className="relative w-full h-[210px] bg-slate-100 overflow-hidden flex items-center justify-center p-4">
                                    
                                    <span className="absolute top-4 left-4 z-10 bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wide uppercase">
                                        {car.carType}
                                    </span>

                                    <span className={`absolute top-4 right-4 z-10 text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide flex items-center gap-1.5 shadow-sm bg-white border ${
                                        car.availabilityStatus === "Available"
                                            ? "text-emerald-600 border-emerald-100"
                                            : "text-rose-500 border-rose-100"
                                    }`}>
                                        <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                                            car.availabilityStatus === "Available" ? "bg-emerald-500" : "bg-rose-500"
                                        }`} />
                                        {car.availabilityStatus}
                                    </span>

                                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                                        <Image
                                            src={car.image}
                                            alt={car.name}
                                            fill
                                            sizes="(max-w-7xl) 33vw"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* text content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        <span className="text-xs font-bold text-[#FF4D30] uppercase tracking-wider">{car.brand}</span>
                                        <h3 className="text-lg font-bold text-slate-900 mt-0.5 group-hover:text-[#FF4D30] transition-colors line-clamp-1">
                                            {car.name}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 py-4 my-auto border-t border-b border-dashed border-slate-100 text-slate-500 text-xs font-semibold">
                                        <div className="flex items-center space-x-2">
                                            <Gauge className="h-4 w-4 text-slate-400" />
                                            <span>{car.transmission}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Fuel className="h-4 w-4 text-slate-400" />
                                            <span>{car.fuel}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            <span>Year: {car.year}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Users className="h-4 w-4 text-slate-400" />
                                            <span>{car.seats}</span>
                                        </div>
                                    </div>

                                    {/* Location & Pricing */}
                                    <div className="pt-5 flex items-center justify-between">
                                        <div className="flex items-center text-slate-400 space-x-1">
                                            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                            <span className="text-xs font-medium text-slate-500 truncate max-w-[120px]">{car.location}</span>
                                        </div>

                                        <div className="text-right">
                                            <span className="text-xs text-slate-400 font-bold block leading-none">Starting From</span>
                                            <span className="text-xl font-black text-slate-950">
                                                ${car.price}<span className="text-xs font-bold text-slate-500"> / Day</span>
                                            </span>
                                        </div>
                                    </div>

                                    <Link href={`/cars/${car.id}`} className="w-full mt-5 bg-slate-900 hover:bg-[#FF4D30] text-white py-3.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-sm group-hover:shadow group-active:scale-[0.98] cursor-pointer">
                                        <span>Rent Now</span>
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
};

export default AvailableCars;