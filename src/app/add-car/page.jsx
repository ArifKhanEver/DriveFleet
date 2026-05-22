'use client';

import React, { useState } from 'react';
import { Car, DollarSign, MapPin, Calendar, FileText, Layers, Image, Users, Fuel } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function AddCarPage() {
    const [loading, setLoading] = useState(false);
    const { data: session } = authClient.useSession()
    const user = session?.user;

    const handleAddCar = async (e) => {
        e.preventDefault();
        if (!user?.email) {
            toast.error('You must be logged in to add a car!');
            return;
        }
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const carData = Object.fromEntries(formData.entries());

        carData.dailyPrice = parseFloat(carData.dailyPrice);
        carData.year = parseInt(carData.year);
        carData.seats = parseInt(carData.seats);
        carData.addedBy = user.email;


        try {
            const res = await fetch('https://drive-fleet-sever.vercel.app/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carData)
            });
            const data = await res.json();
            console.log(data)
            console.log("Structured Car Payload:", carData);

            toast.success('Premium vehicle listed successfully!');
            e.target.reset();
        } catch (error) {
            toast.error('Failed to register the vehicle. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans lg:mt-20">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/50 overflow-hidden relative">

                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FF4D30]" />

                {/* Header Section */}
                <div className="px-8 pt-8 pb-6 border-b border-slate-100 text-center sm:text-left">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
                        <span className="bg-[#FF4D30]/10 text-[#FF4D30] p-2 rounded-xl">
                            <Car className="h-6 w-6" />
                        </span>
                        List a New Vehicle
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 font-medium">
                        Fill in the technical specifications below to feature your premium car on DriveFleet.
                    </p>
                </div>

                <form onSubmit={handleAddCar} className="p-8 space-y-6">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Car Model Name</label>
                            <div className="relative">
                                <input type="text" name="carName" required placeholder="e.g., Tesla Model S" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all" />
                                <Car className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Brand / Manufacturer</label>
                            <div className="relative">
                                <input type="text" name="brand" required placeholder="e.g., Porsche" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all" />
                                <Layers className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Car Type</label>
                            <select name="carType" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-900 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all cursor-pointer appearance-none">
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Crossover">Crossover</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Daily Rent Price ($)</label>
                            <div className="relative">
                                <input type="number" name="dailyPrice" min="1" required placeholder="99" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all" />
                                <DollarSign className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Year of Production</label>
                            <div className="relative">
                                <input type="number" name="year" min="1990" max={new Date().getFullYear() + 1} required placeholder="2024" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all" />
                                <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Fuel System</label>
                            <div className="relative">
                                <select name="fuel" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-sm text-slate-900 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all cursor-pointer appearance-none">
                                    <option value="Petrol">Petrol</option>
                                    <option value="Octane">Octane</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Electric">Electric (EV)</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="CNG">CNG</option>
                                </select>
                                <Fuel className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Seat Capacity</label>
                            <div className="relative">
                                <input type="number" name="seats" min="2" max="15" required placeholder="5" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all" />
                                <Users className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Initial Status</label>
                            <select name="availabilityStatus" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-900 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all cursor-pointer appearance-none">
                                <option value="Available">Available Immediately</option>
                                <option value="Maintenance">Under Maintenance</option>
                                <option value="Booked">Currently Rented</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Image URL */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Vehicle Image URL (ImgBB / PostImage link)</label>
                            <div className="relative">
                                <input type="url" name="imageUrl" required placeholder="https://i.ibb.co/example/premium-car.jpg" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all" />
                                <Image className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" alt='img' />
                            </div>
                        </div>

                        {/* Pickup Location */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Hub / Pickup Location</label>
                            <div className="relative">
                                <input type="text" name="pickupLocation" required placeholder="e.g., Gulshan-2, Dhaka" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all" />
                                <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Vehicle Overview & Features</label>
                            <div className="relative">
                                <textarea name="description" rows="4" required placeholder="Provide a compelling description of the vehicle's features, conditions, luxury packages, or performance metrics..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF4D30] focus:bg-white transition-all resize-none" />
                                <FileText className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF4D30] hover:bg-[#e03d21] disabled:bg-slate-300 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF4D30]/10 hover:shadow-[#FF4D30]/20 active:scale-[0.99] text-xs uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing System Registry...' : 'Publish Vehicle Listing'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}