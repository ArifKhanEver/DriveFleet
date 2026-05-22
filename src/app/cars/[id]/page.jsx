import Image from "next/image";
import { Gauge, Users, Fuel, Calendar, MapPin, DoorOpen, BriefcaseBusiness, CheckCircle } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`https://drive-fleet-sever.vercel.app/cars/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    console.log(token)
    const car = await res.json();

    return (
        <section className="w-full bg-slate-50/40 py-12 lg:py-20 mt-10 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-10">
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Vehicle Details</h1>
                    <p className="text-slate-500 font-medium mt-2">Explore the premium features of {car.carName}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    <div className="lg:col-span-7 flex flex-col gap-8">
                        
                        <div className="relative w-full h-[320px] sm:h-[420px] flex items-center justify-center  rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden">
                            
                            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-100 shadow-sm uppercase">
                                <span>Booked <strong>{car.booking_count || 0} times</strong> so far</span>
                            </div>

                            <Image 
                                src={car.imageUrl} 
                                alt={car.carName} 
                                fill 
                                priority 
                                sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 58vw" 
                                className="object-contain" 
                            />
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900">Vehicle Description</h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed mt-4">{car.description}</p>
                        </div>
                    </div>

                    <div className="lg:col-span-5 lg:sticky lg:top-24">
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xl flex flex-col gap-6">

                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-[#FF4D30] uppercase tracking-wider">
                                    {car.brand}
                                </span>
                                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-100">
                                    <CheckCircle className="h-3 w-3" /> {car.availabilityStatus || "Available"}
                                </div>
                            </div>

                            <div className="flex justify-between items-start gap-4 -mt-2">
                                <div className="min-w-0">
                                    <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-tight">
                                        {car.carName}
                                    </h1>
                                    <div className="flex items-center text-slate-400 space-x-1 mt-2">
                                        <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                                        <span className="text-xs font-semibold text-slate-500 truncate">
                                            {car.location || car.pickupLocation || "Gulshan-2, Dhaka"}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 flex items-baseline gap-0.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                    <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-none">
                                        ${car.dailyPrice}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                                        /day
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {[
                                    { icon: Calendar, label: "Year", val: car.year },
                                    { icon: Users, label: "Seats", val: car.seats },
                                    { icon: Gauge, label: "Transmission", val: "Automatic" },
                                    { icon: Fuel, label: "Fuel", val: car.fuel },
                                    { icon: DoorOpen, label: "Doors", val: 4 },
                                    { icon: BriefcaseBusiness, label: "Luggage", val: "2 Suitcases / 2 Bags" },
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
                            
                            <BookingModal car={car} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CarDetailsPage;