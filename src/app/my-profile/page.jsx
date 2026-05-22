"use client";

import { authClient } from "@/lib/auth-client";
import { Card, Button, Chip } from "@heroui/react";
import {
    User, Mail, MapPin, Calendar, Car,
    ShoppingBag, PlusCircle, ArrowRight, ShieldCheck, LogOut
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; 
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const [stats, setStats] = useState({ bookings: 0, cars: 0 });
    const [statsLoading, setStatsLoading] = useState(true);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        if (!user?.email) return;

        const fetchDashboardData = async () => {
            try {
                setStatsLoading(true);
                
                const bookingsRes = await fetch(`https://drive-fleet-sever.vercel.app/bookings?userEmail=${user.email}`);
                const bookingsData = await bookingsRes.json();

                const carsRes = await fetch(`http://localhost:5000/cars?userEmail=${user.email}`);
                const carsData = await carsRes.json();

                setStats({
                    bookings: bookingsData.length || 0,
                    cars: carsData.length || 0
                });
            } catch (error) {
                console.error("Dashboard data fetching failed:", error);
            } finally {
                setStatsLoading(false);
            }
        };

        fetchDashboardData();
    }, [user?.email]); 

    const formatNumber = (num) => String(num).padStart(2, '0');

    const handleLogout = async () => {
        setLoading(true);
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.error("Logged Out");
                        router.replace("/auth/login");
                        router.refresh();
                    },
                },
            });
        } catch (error) {
            toast.error("Failed to log out");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 lg:py-18 px-4 sm:px-6 lg:px-8 mt-12 lg:mt-20">
            <div className="max-w-5xl mx-auto space-y-8">

                <div className="flex flex-col gap-1 border-b border-slate-200 pb-5">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        My Account Dashboard
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Manage your profile details, vehicle listings, and active rental bookings.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <Card className="md:col-span-1 bg-white border border-slate-100 p-6 flex flex-col items-center text-center shadow-sm rounded-2xl h-fit">
                        <div className="relative group">
                            {user?.image && (
                                <Image
                                    width={200}
                                    height={200}
                                    src={user.image}
                                    alt=""
                                    className="w-28 h-28 text-large border-4 border-indigo-50 shadow-md group-hover:scale-105 transition-transform duration-300 rounded-full object-cover"
                                />
                            )}
                            <div className="absolute bottom-1 right-1 bg-emerald-500 p-1.5 rounded-full border-2 border-white shadow-sm" />
                        </div>

                        <h2 className="mt-4 text-xl font-black text-slate-800 tracking-tight">
                            {user?.name || "Guest User"}
                        </h2>

                        <Chip
                            className="mt-2 bg-indigo-50 text-indigo-600 font-extrabold border border-indigo-100 uppercase tracking-wider text-[10px]"
                            variant="flat"
                        >
                            <span className="flex items-center gap-1">
                                <ShieldCheck className="size-3.5" />
                                {user?.role || "User"}
                            </span>
                        </Chip>

                        <div className="w-full border-t border-slate-100 my-5" />

                        <div className="w-full space-y-3.5 text-left text-sm font-bold text-slate-600">
                            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                                <Mail className="size-4 text-slate-400 shrink-0" />
                                <span className="truncate text-xs">{user?.email || "No Email"}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                                <MapPin className="size-4 text-emerald-500 shrink-0" />
                                <span className="text-xs">{user?.location || "Dhaka, Bangladesh"}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                                <Calendar className="size-4 text-amber-500 shrink-0" />
                                <span className="text-xs">
                                    Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "N/A"}
                                </span>
                            </div>
                        </div>

                        <div className="w-full border-t border-slate-100 my-5" />

                        <Button
                            isLoading={loading}
                            onClick={handleLogout}
                            className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs h-11 rounded-xl border border-rose-100 transition-colors cursor-pointer"
                        >
                            <LogOut className="size-4" /> Logout Account
                        </Button>
                    </Card>

                    <div className="md:col-span-2 space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card className="bg-gradient-to-br from-indigo-600 to-indigo-400 text-white p-5 shadow-md shadow-indigo-600/10 rounded-2xl flex flex-row items-center justify-between border-none">
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-indigo-100 uppercase tracking-wider">My Total Bookings</p>
                                    <h3 className="text-3xl font-black">
                                        {statsLoading ? "--" : formatNumber(stats.bookings)}
                                    </h3>
                                </div>
                                <div className="bg-indigo-500/30 p-3 rounded-xl backdrop-blur-md">
                                    <ShoppingBag className="size-6 text-white" />
                                </div>
                            </Card>

                            <Card className="bg-white border border-slate-100 p-5 shadow-sm rounded-2xl flex flex-row items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Vehicles Listed</p>
                                    <h3 className="text-3xl font-black text-slate-800">
                                        {statsLoading ? "--" : formatNumber(stats.cars)}
                                    </h3>
                                </div>
                                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl border border-emerald-100">
                                    <Car className="size-6" />
                                </div>
                            </Card>
                        </div>

                        <Card className="bg-white border border-slate-100 p-6 shadow-sm rounded-2xl space-y-4">
                            <h4 className="text-base font-black text-slate-800 uppercase tracking-tight border-b border-slate-50 pb-2">
                                Quick Shortcuts
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Link href="/add-car" className="w-full">
                                    <Button className="w-full bg-slate-50 hover:bg-indigo-50 border border-slate-200/60 text-slate-700 hover:text-indigo-600 font-bold text-xs h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group">
                                        <PlusCircle className="size-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                                        <span>Add New Car</span>
                                    </Button>
                                </Link>

                                <Link href="/my-bookings" className="w-full">
                                    <Button className="w-full bg-slate-50 hover:bg-emerald-50 border border-slate-200/60 text-slate-700 hover:text-emerald-600 font-bold text-xs h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group">
                                        <ShoppingBag className="size-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                                        <span>My Bookings</span>
                                    </Button>
                                </Link>

                                <Link href="/my-added-cars" className="w-full">
                                    <Button className="w-full bg-slate-50 hover:bg-amber-50 border border-slate-200/60 text-slate-700 hover:text-amber-600 font-bold text-xs h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group">
                                        <Car className="size-4 text-amber-500 group-hover:scale-110 transition-transform" />
                                        <span>My Added Cars</span>
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        <Card className="bg-white border border-slate-100 p-6 shadow-sm rounded-2xl space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-black text-slate-800 uppercase tracking-tight">
                                    Security & Verification
                                </h4>
                                <Chip className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold text-[10px]" size="sm">Verified Account</Chip>
                            </div>

                            <p className="text-xs font-medium text-slate-500 leading-relaxed">
                                Your account is completely verified and compliant with DriveFleet rules. You have permission to request car rentals and manage private listings. Make sure to keep your password and cookie tokens confidential.
                            </p>

                            <div className="flex gap-4 pt-2">
                                <Link href="/cars" className="text-xs font-extrabold text-indigo-600 flex items-center gap-1 hover:underline">
                                    Browse available vehicles <ArrowRight className="size-3" />
                                </Link>
                            </div>
                        </Card>

                    </div>
                </div>

            </div>
        </div>
    );
}