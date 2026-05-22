"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Car, LogIn, UserPlus, LogOut, PlusCircle,
    Briefcase, CheckSquare, Menu, X, ChevronDown,
    CarFrontIcon,
    User2Icon
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Avatar, Spinner } from "@heroui/react";
import toast from "react-hot-toast";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    const user = session?.user;


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path) => pathname === path;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-md shadow-lg border-b border-white/20 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">

                    {/* Header Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-[#FF4D30] text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                            <Car className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                                Drive<span className="text-[#FF4D30]">Fleet</span>
                            </span>
                            <span className="text-xs text-slate-500 font-medium tracking-widest uppercase mt-0.5">
                                Car Rental
                            </span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1 bg-slate-100/50 dark:bg-slate-800/40 p-1.5 rounded-full border border-slate-200/40 backdrop-blur-sm">
                        <Link
                            href="/"
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive("/")
                                ? "bg-slate-900 text-white shadow-sm"
                                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/cars"
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive("/cars")
                                ? "bg-slate-900 text-white shadow-sm"
                                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                        >
                            Explore Cars
                        </Link>
                        <Link
                            href="/my-bookings"
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive("/my-bookings")
                                ? "bg-slate-900 text-white shadow-sm"
                                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                        >
                            My Bookings
                        </Link>
                        <Link
                            href="/add-car"
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive("/add-car")
                                ? "bg-slate-900 text-white shadow-sm"
                                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                        >
                            Add Car
                        </Link>
                    </div>

                    {/* ৩. Profile Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isPending ? <Spinner color="danger" /> : user ? (
                            /* profile dropdown links */
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center space-x-2 bg-slate-100 p-2 pr-3 rounded-full hover:bg-slate-200 transition-all border border-slate-200 cursor-pointer"
                                >
                                    <div className="h-8 w-8 rounded-full bg-[#FF4D30] text-white flex items-center justify-center font-bold text-sm shadow-inner uppercase">
                                        <Avatar>
                                            <Avatar.Image alt={user?.name} src={user?.image} />
                                            <Avatar.Fallback>JD</Avatar.Fallback>
                                        </Avatar>
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        My Account
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-slate-500" />
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-5 duration-200">
                                        <div className="px-4 py-2 border-b border-slate-100 mb-1">
                                            <p className="text-xs text-slate-400 capitalize">Signed in as <strong className="text-black">{user?.name}</strong></p>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            href="/add-car"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                            className="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#FF4D30] transition-colors"
                                        >
                                            <PlusCircle className="h-4 w-4" />
                                            <span>Add Car</span>
                                        </Link>
                                        <Link
                                            href="/my-profile"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                            className="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#FF4D30] transition-colors"
                                        >
                                            <User2Icon className="h-4 w-4" />
                                            <span>My Profile</span>
                                        </Link>
                                        <Link
                                            href="/my-bookings"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                            className="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#FF4D30] transition-colors"
                                        >
                                            <CheckSquare className="h-4 w-4" />
                                            <span>My Bookings</span>
                                        </Link>
                                        <Link
                                            href="/my-added-cars"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                            className="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#FF4D30] transition-colors"
                                        >
                                            <CarFrontIcon className="h-4 w-4" />
                                            <span>My Added Cars</span>
                                        </Link>
                                        <hr className="border-slate-100 dark:border-slate-800 my-1" />
                                        <button
                                            onClick={async () => {
                                                await authClient.signOut({
                                                    fetchOptions: {
                                                        onSuccess: () => {
                                                            toast.error("Logged Out");
                                                            router.replace("/auth/login");
                                                            router.refresh();
                                                        },
                                                    },
                                                });
                                                setIsProfileDropdownOpen(false);

                                            }}
                                            className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Login + register */
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/auth/login"
                                    className="flex items-center space-x-1.5 px-5 py-2.5 rounded-full text-sm font-medium bg-[#fdece9] text-slate-600 hover:bg-slate-100  transition-all"
                                >
                                    <LogIn className="h-4 w-4 text-[#FF4D30]" />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="flex items-center space-x-1.5 px-5 py-2.5 bg-[#FF4D30] hover:bg-[#e03a1e] text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all transform active:scale-95"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    <span>Register</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* mobile dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-5 duration-200">
                    <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-base font-medium ${isActive("/") ? "bg-[#FF4D30]/10 text-[#FF4D30]" : "text-slate-600 dark:text-slate-300"
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/cars"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-base font-medium ${isActive("/cars") ? "bg-[#FF4D30]/10 text-[#FF4D30]" : "text-slate-600 dark:text-slate-300"
                            }`}
                    >
                        Explore Cars
                    </Link>

                    {user && (
                        <>
                            <hr className="border-slate-100 dark:border-slate-800 my-2" />
                            <p className="px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Profile Options</p>
                            <Link
                                href="/my-profile"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#FF4D30] transition-colors"
                            >
                                <User2Icon className="h-4 w-4 text-[#FF4D30]" />
                                <span>My Profile</span>
                            </Link>
                            <Link
                                href="/add-car"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-2 px-4 py-2.5 text-slate-600 dark:text-slate-300"
                            >
                                <PlusCircle className="h-4 w-4 text-[#FF4D30]" />
                                <span>Add Car</span>
                            </Link>
                            <Link
                                href="/my-bookings"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-2 px-4 py-2.5 text-slate-600 dark:text-slate-300"
                            >
                                <CheckSquare className="h-4 w-4 text-[#FF4D30]" />
                                <span>My Bookings</span>
                            </Link>
                            <Link
                                href="/my-added-cars"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-2 px-4 py-2.5 text-slate-600 dark:text-slate-300"
                            >
                                <Briefcase className="h-4 w-4 text-[#FF4D30]" />
                                <span>My Added Cars</span>
                            </Link>
                        </>
                    )}

                    <hr className="border-slate-100 dark:border-slate-800 my-2" />

                    {user ? (
                        <button
                            onClick={async () => {
                                await authClient.signOut({
                                    fetchOptions: {
                                        onSuccess: () => {
                                            toast.error("Logged Out");
                                            router.replace("/auth/login");
                                            router.refresh();
                                        },
                                    },
                                });
                                router.refresh();
                                setIsMobileMenuOpen(false);
                                // logout logic
                            }}
                            className="w-full flex items-center space-x-2 px-4 py-2.5 text-base font-medium text-red-600"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <Link
                                href="/auth/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center space-x-1.5 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200"
                            >
                                <LogIn className="h-4 w-4 text-[#FF4D30]" />
                                <span>Login</span>
                            </Link>
                            <Link
                                href="/auth/register"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-[#FF4D30] text-white rounded-xl text-sm font-medium shadow-sm"
                            >
                                <UserPlus className="h-4 w-4" />
                                <span>Register</span>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;