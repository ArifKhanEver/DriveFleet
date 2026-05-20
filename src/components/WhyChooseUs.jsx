"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Percent, Clock, ArrowRight } from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";

const features = [
    {
        title: "Cross Country Drive",
        desc: "Unlimited freedom to roam across borders with our flexible rental agreements.",
        icon: <ShieldCheck className="size-6 text-[#FF4D30]" />,
    },
    {
        title: "All Inclusive Pricing",
        desc: "No hidden fees. Insurance, taxes, and maintenance are all bundled in one clear price.",
        icon: <Percent className="size-6 text-[#FF4D30]" />,
    },
    {
        title: "No Hidden Charges",
        desc: "Transparency is our policy. You pay exactly what you see during the booking process.",
        icon: <Clock className="size-6 text-[#FF4D30]" />,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="w-full bg-slate-100 py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h4 className="text-[#FF4D30] font-bold text-sm tracking-widest uppercase mb-3">Why Choose Us</h4>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                            Best valued deals <br /> you will ever find
                        </h2>
                        <p className="text-slate-500 font-semibold mb-8 max-w-md">
                            We pride ourselves on providing the best rental experience. From transparent pricing to flexible schedules, we make your journey stress-free.
                        </p>
                        <Link href={'/cars'}>
                            <Button className="bg-[#FF4D30] hover:bg-[#e03d21] text-white px-8 py-6 rounded-xl font-bold text-lg flex items-center gap-2">
                                Explore All Deals <ArrowRight className="size-5" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Right Side: Features */}
                    <div className="grid gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-[#FF4D30]/20 transition-all duration-300 flex gap-6"
                            >
                                <div className="bg-[#FF4D30]/10 p-4 rounded-xl h-fit">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2">{feature.title}</h3>
                                    <p className="text-slate-500 font-semibold text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}