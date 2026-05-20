"use client";

import Image from "next/image";
import { useState } from "react";
import { Gauge, Users, Fuel, Calendar, MapPin, ShieldCheck, ArrowRight, DoorOpen, BriefcaseBusiness, CheckCircle } from "lucide-react";
import BookingModal from "@/components/BookingModal";

const MOCK_SINGLE_CAR = {
    id: "car_cadillac_01",
    name: "Cadillac Escalade Platinum",
    brand: "Cadillac",
    carType: "SUV",
    price: 57.40,
    year: "2025",
    fuel: "Petrol",
    transmission: "Automatic",
    seats: "5 Persons",
    doors: 4,
    luggage: "2 Suitcases / 2 Bags",
    location: "Los Angeles - 5711 W Century Blvd",
    image: "/assets/banner_car.png",
    description: "The Cadillac Escalade Platinum is the brand's flagship luxury SUV, delivering unmatched road presence alongside modern first-class cabin comfort. Perfect for family road trips, business hospitality, or premium airport transfers.",
    availabilityStatus: "Available"
};

const CarDetailsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const car = MOCK_SINGLE_CAR;

    return (
        <section className="w-full bg-slate-50/40 py-12 lg:py-20 mt-10 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-10">
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Vehicle Details</h1>
                    <p className="text-slate-500 font-medium mt-2">Explore the premium features of {car.name}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <div className="relative w-full h-[320px] sm:h-[420px] flex items-center justify-center">
                            <Image src={car.image} alt={car.name} fill priority className="object-contain" />
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900">Vehicle Description</h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed mt-4">{car.description}</p>
                        </div>
                    </div>

                    <div className="lg:col-span-5 lg:sticky lg:top-24">
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xl flex flex-col gap-6">
                            
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold text-[#FF4D30] uppercase">{car.brand}</span>
                                    <h1 className="text-2xl font-black text-slate-950 mt-1">{car.name}</h1>
                                </div>
                                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-100">
                                    <CheckCircle className="h-3 w-3" /> {car.availabilityStatus}
                                </div>
                            </div>

                            <div className="text-3xl font-black text-slate-950">${car.price} <span className="text-sm font-bold text-slate-500">/ day</span></div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {[
                                    { icon: Calendar, label: "Year", val: car.year },
                                    { icon: Users, label: "Seats", val: car.seats },
                                    { icon: Gauge, label: "Transmission", val: car.transmission },
                                    { icon: Fuel, label: "Fuel", val: car.fuel },
                                    { icon: DoorOpen, label: "Doors", val: car.doors },
                                    { icon: BriefcaseBusiness, label: "Luggage", val: car.luggage },
                                ].map((item, i) => (
                                    <div key={i} className="p-3 bg-slate-50 rounded-xl flex items-center gap-3 border border-slate-100">
                                        <item.icon className="h-5 w-5 text-[#FF4D30]" />
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{item.label}</p>
                                            <p className="font-bold text-slate-900 text-xs">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <BookingModal car={car}></BookingModal>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default CarDetailsPage;