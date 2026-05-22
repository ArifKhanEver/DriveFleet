import {Car, Calendar, UserCheck, FileText, DollarSign, Clock, Trash2, ChevronRight, SlidersHorizontal} from "lucide-react";
import { Button, Card, Chip } from "@heroui/react"; 
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { BookingDeleteModal } from "@/components/BookingDeleteModal";

export default async function MyBookingsPage() {
    const { user } = await auth.api.getSession({
        headers: await headers()
    })

    const { token } = await auth.api.getToken({
            headers: await headers()
        })

    const res = await fetch(`https://drive-fleet-sever.vercel.app/bookings?userEmail=${user.email}`, {
        headers: {
            authorization: `Bearer booking ${token}`
        }
    })
    const bookings = await res.json();

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-12 lg:mt-24">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/60 pb-8 mb-10 gap-4">
                    <div>
                        <span className="bg-[#FF4D30]/10 text-[#FF4D30] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                            User Dashboard
                        </span>
                        <h1 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                            My <span className="text-[#FF4D30]">Bookings</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-semibold mt-1">
                            Manage your upcoming rides, view invoices, and track rental status.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-white border border-slate-200 p-2 rounded-xl shadow-sm w-fit">
                        <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-center">
                            <span className="block text-xl font-black text-slate-900">{bookings.length}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Trips</span>
                        </div>
                        {/* <Button variant="flat" size="sm" className="bg-slate-100 text-slate-700 font-bold rounded-lg h-10 px-3 flex items-center gap-2 cursor-pointer">
                            <SlidersHorizontal className="size-4" /> Filter
                        </Button> */}
                    </div>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <Car className="size-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-black text-slate-800">No Bookings Found</h3>
                        <p className="text-slate-400 text-sm font-semibold mt-1">You haven't booked any luxury vehicle yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white border border-slate-200/70 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col lg:flex-row"
                            >

                                <div className="p-6 flex-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
                                    <div>
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                            <span className="text-[11px] font-bold text-slate-400 font-mono">
                                                ID: #{booking._id.substring(0, 8)}...
                                            </span>
                                            <Chip
                                                color="success"
                                                variant="flat"
                                                className="text-xs font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 h-6"
                                            >
                                                Confirmed
                                            </Chip>
                                        </div>

                                        <h2 className="text-xl font-black text-slate-900 group-hover:text-[#FF4D30] transition-colors flex items-center gap-2">
                                            <Car className="size-5 text-[#FF4D30]" /> {booking.carName}
                                        </h2>

                                        <div className="flex flex-col sm:flex-row gap-6 mt-5 items-start">
                                            <div className="w-full sm:w-52 h-32 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200/60 shrink-0">
                                                <Image
                                                    fill 
                                                    src={booking.carImage || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=500"} 
                                                    alt={booking.carName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1 w-full flex flex-col gap-4">
                                                <div className="grid grid-cols-2 gap-4 bg-slate-50/80 border border-slate-100 p-4 rounded-xl">
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                                            <Calendar className="size-3 text-slate-400" /> Pick-Up
                                                        </span>
                                                        <p className="text-sm font-black text-slate-800">{booking.startDate}</p>
                                                    </div>
                                                    <div className="space-y-1 border-l border-slate-200 pl-4">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                                            <Calendar className="size-3 text-slate-400" /> Drop-Off
                                                        </span>
                                                        <p className="text-sm font-black text-slate-800">{booking.endDate}</p>
                                                    </div>
                                                </div>

                                                {booking.specialNote ? (
                                                    <div className="flex items-start gap-2 text-xs font-semibold text-slate-500 bg-amber-50/40 border border-amber-100/60 p-3 rounded-xl">
                                                        <FileText className="size-4 text-amber-500 shrink-0 mt-0.5" />
                                                        <p><strong className="text-slate-700">Note:</strong> {booking.specialNote}</p>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start gap-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                                                        <FileText className="size-4 text-slate-400 shrink-0 mt-0.5" />
                                                        <p><strong className="text-slate-600">Note:</strong> no note yet</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-50/60 lg:w-72 flex flex-col justify-between items-stretch gap-6">

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                                            <span className="flex items-center gap-1.5"><Clock className="size-3.5 text-slate-400" /> Duration:</span>
                                            <span className="text-slate-900 font-black">{booking.totalDays} Days</span>
                                        </div>

                                        <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                                            <span className="flex items-center gap-1.5"><UserCheck className="size-3.5 text-slate-400" /> Driver Service:</span>
                                            <span>
                                                {booking.driverNeeded ? (
                                                    <Chip size="sm" color="warning" variant="flat" className="text-[10px] font-black h-5 uppercase">Included</Chip>
                                                ) : (
                                                    <span className="text-slate-400">Excluded</span>
                                                )}
                                            </span>
                                        </div>

                                        <div className="h-px bg-slate-200/60 my-2" />

                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs font-bold text-slate-500">Total Price:</span>
                                            <span className="text-2xl font-black text-emerald-600 flex items-center">
                                                <DollarSign className="size-5 stroke-[3]" />{booking.totalPrice}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Link href={`/cars/${booking.carId}`}
                                            className="w-full bg-[#FF4D30] text-white font-bold text-xs h-10 rounded-xl transition-all hover:bg-[#e03d21] shadow-md shadow-[#FF4D30]/10 flex items-center justify-center gap-1 cursor-pointer"
                                        >
                                            View Details <ChevronRight className="size-3.5" />
                                        </Link>
                                        <BookingDeleteModal booking={booking}></BookingDeleteModal>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}