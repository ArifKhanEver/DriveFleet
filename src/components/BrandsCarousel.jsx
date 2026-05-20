"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BRANDS = [
    { name: "Toyota", src: "/assets/Toyota-logo.png" },
    { name: "BMW", src: "/assets/BMW.png" },
    { name: "Audi", src: "/assets/audi.png" },
    { name: "Mercedes", src: "/assets/mercedes.png" },
    { name: "Honda", src: "/assets/Honda-Logo.png" },
    { name: "Ford", src: "/assets/ford.png" },
    { name: "Tesla", src: "/assets/tesla.png" },
    { name: "Nissan", src: "/assets/nissan.png" },
];

export default function BrandsCarousel() {
    return (
        <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Featured Brands
                </h3>
            </div>

            <div className="relative flex overflow-hidden">
                <motion.div
                    className="flex gap-8 md:gap-14 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 50, 
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {[...BRANDS, ...BRANDS].map((brand, index) => (
                        <div key={index} className="flex-shrink-0 w-24 md:w-32 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                            <div className="relative h-12 w-full">
                                <Image 
                                    src={brand.src} 
                                    alt={brand.name} 
                                    fill 
                                    className="object-contain" 
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}