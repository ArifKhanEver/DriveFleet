"use client";

import { Button } from "@heroui/react";
import { ArrowRight, MessageCircle, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 bg-slate-900">
                <Image
                    fill
                    src="/assets/cta-car.jpg"
                    alt="Footer Background"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                        Ready to start your <br />
                        <span className="text-[#FF4D30]">unforgettable journey?</span>
                    </h2>
                    <p className="text-slate-300 font-semibold max-w-md text-lg">
                        Join thousands of happy customers who trust us with their travel needs. Book your ride or reach out for assistance.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                    <Link href={'/cars'}>
                        <Button
                            size="lg"
                            className="bg-[#FF4D30] hover:bg-[#e03d21] text-white font-bold h-14 px-8 rounded-xl shadow-lg shadow-[#FF4D30]/20 flex items-center gap-2"
                        >
                            <Car className="size-5" /> Book Your Ride
                        </Button>
                    </Link>
                    <Link href={'/'}>
                        <Button
                            size="lg"
                            variant="bordered"
                            className="border-2 border-white text-white font-bold h-14 px-8 rounded-xl hover:bg-white hover:text-slate-900 transition-all flex items-center gap-2"
                        >
                            <MessageCircle className="size-5" /> Contact Support
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}