import { auth } from "@/lib/auth";
import { headers } from "next/headers"; 
import { Trash2, Edit3, MapPin, Tag, Calendar, Fuel } from "lucide-react";
import { MyAddedCarDeleteModal } from "@/components/MyAddedCarDeleteModal";
import { UpdateCarModal } from "@/components/UpdateCarModal";
import Image from "next/image";

// export const dynamic = "force-dynamic";

const MyAddedCars = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user?.email) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <p className="text-slate-500 font-bold">Please log in to view your added cars.</p>
            </div>
        );
    }

    const res = await fetch(`http://localhost:5000/cars?userEmail=${user.email}`, {
        cache: "no-store",
    });
    const myCars = await res.json();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50/50 min-h-screen mt-12 lg:mt-20">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Added Cars</h1>
                <p className="text-sm text-slate-500 font-semibold mt-1">
                    Manage and update your listed vehicles easily.
                </p>
            </div>

            {myCars.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
                    <p className="text-sm text-slate-400 font-bold">You haven't added any cars yet!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myCars.map((car) => (
                        <div 
                            key={car._id} 
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all group flex flex-col"
                        >
                            <div className="relative h-48 bg-slate-100 overflow-hidden">
                                <Image
                                    fill 
                                    src={car.imageUrl || "https://images.unsplash.com/photo-1563720223185-11003d516935?w=500"} 
                                    alt={car.carName} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className={`absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-sm ${
                                    car.availabilityStatus?.toLowerCase() === "available" 
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                        : "bg-amber-50 text-amber-600 border-amber-100"
                                }`}>
                                    {car.availabilityStatus || "Available"}
                                </span>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-slate-100 text-slate-500 rounded">
                                            {car.brand}
                                        </span>
                                        <span className="text-xs font-bold text-slate-400">Model {car.year}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-1">
                                        {car.carName}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-semibold line-clamp-2 mb-4">
                                        {car.description}
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-600 mb-5">
                                        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100/60">
                                            <Tag className="size-3.5 text-indigo-500" /> {car.carType}
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100/60">
                                            <Fuel className="size-3.5 text-amber-500" /> {car.fuel || "Octane"}
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100/60 col-span-2">
                                            <MapPin className="size-3.5 text-emerald-500 truncate" /> 
                                            <span className="truncate">{car.pickupLocation}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Per Day</p>
                                        <p className="text-lg font-black text-slate-900 flex items-center">
                                            ${car.dailyPrice}
                                        </p>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <UpdateCarModal car={car}></UpdateCarModal>
                                        <MyAddedCarDeleteModal car={car}></MyAddedCarDeleteModal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAddedCars;