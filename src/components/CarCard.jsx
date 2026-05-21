import { motion } from "framer-motion";
import { Gauge, Users, Fuel, Calendar, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CarCard = ({ car }) => {
    return (
        <div>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
            >
                {/* Image Section / Upper Layer */}
                <div className="relative w-full h-[200px] bg-slate-50 overflow-hidden flex items-center justify-center p-4">

                    <span className="absolute top-4 left-4 z-10 bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wide uppercase">
                        {car.carType}
                    </span>

                    <span className={`absolute top-4 right-4 z-10 text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide flex items-center gap-1.5 shadow-sm bg-white border ${car.availabilityStatus === "Available"
                            ? "text-emerald-600 border-emerald-100"
                            : "text-rose-500 border-rose-100"
                        }`}>
                        <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${car.availabilityStatus === "Available" ? "bg-emerald-500" : "bg-rose-500"
                            }`} />
                        {car.availabilityStatus}
                    </span>

                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                        <Image
                            src={car.imageUrl}
                            alt={car.name}
                            fill
                            sizes="(max-w-7xl) 33vw"
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Content Section / Decreased padding for a tighter, compact feel */}
                {/* text content */}
                <div className="p-5 flex flex-col flex-grow">

                    {/* 1. Brand Tag sitting cleanly on top */}
                    <span className="text-xs font-bold text-[#FF4D30] uppercase tracking-wider block mb-0.5">
                        {car.brand}
                    </span>

                    {/* 2. Title & Pricing Pipeline: Perfectly aligned horizontally */}
                    <div className="flex justify-between items-center gap-4 mb-4">
                        {/* Car Name aligned to left */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#FF4D30] transition-colors line-clamp-1 min-w-0">
                            {car.carName}
                        </h3>

                        {/* Slightly bigger and side-by-side Price Badge aligned to right */}
                        <div className="text-right flex-shrink-0 flex items-baseline gap-1">
                            <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-none">
                                ${car.dailyPrice}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                /day
                            </span>
                        </div>
                    </div>

                    {/* Technical Specifications Grid */}
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 py-3.5 my-auto border-t border-b border-dashed border-slate-100 text-slate-500 text-xs font-semibold">
                        <div className="flex items-center space-x-2">
                            <Gauge className="h-4 w-4 text-slate-400" />
                            <span>Automatic</span>
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

                    {/* Compact Location Layer */}
                    <div className="pt-4 flex items-center text-slate-400 space-x-1">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                        <span className="text-xs font-medium text-slate-500 truncate max-w-[200px]">
                            {car.pickupLocation}
                        </span>
                    </div>

                    {/* Primary Call to Action */}
                    <Link
                        href={`/cars/${car._id}`}
                        className="w-full mt-4 bg-slate-900 hover:bg-[#FF4D30] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-sm group-hover:shadow group-active:scale-[0.98] cursor-pointer"
                    >
                        <span>Rent Now</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default CarCard;