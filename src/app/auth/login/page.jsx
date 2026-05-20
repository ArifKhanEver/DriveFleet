'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

const LoginPage = () => {


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({

            email,
            password,
            callbackURL: "/",
            rememberMe: true
        }, {
            //callbacks
        });
        if (data) {
            toast.success("Login Successful. Redirecting...")
        } else if (error) {
            toast.error(error.message)
        }
    };

    const handleGoogleLogin = async() => {
        await authClient.signIn.social({
            /**
             * The social provider ID
             * @example "github", "google", "apple"
             */
            provider: "google",
            callbackURL: "/",
            errorCallbackURL: "/error",
        })
    };
    
    return (
        <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:py-20 mt-20 font-sans">
            <div className="max-w-4xl w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid md:grid-cols-12">

                {/* Left Side */}
                <div className="md:col-span-5 bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="bg-[#FF4D30] p-2 rounded-lg text-white">
                                <Car className="h-6 w-6" />
                            </div>
                            <span className="text-lg font-bold text-slate-900 tracking-tight">DriveFleet</span>
                        </div>
                    </div>

                    <div className="my-8">
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
                            Welcome Back to <br />
                            <span className="text-[#FF4D30]">DriveFleet Portal</span>
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Log in to your account to manage your active rentals, list new premium vehicles, and customize your user profile details instantly.
                        </p>
                    </div>

                    <div className="text-xs text-slate-400 font-medium">
                        &copy; {new Date().getFullYear()} DriveFleet Car Rental Platform.
                    </div>
                </div>

                {/* Right Side */}
                <div className="md:col-span-7 p-8 sm:p-10 bg-white">
                    <div className="mb-6">
                        <h1 className="text-xl font-bold text-slate-900 mb-1">Account Login</h1>
                        <p className="text-slate-500 text-sm">
                            New to our platform?{' '}
                            <Link href="/auth/register" className="text-[#FF4D30] font-semibold hover:underline">
                                Register Here
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="name@domain.com"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl outline-none focus:border-[#FF4D30] focus:bg-white transition-colors text-sm placeholder:text-slate-400"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Password</label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Enter your secure password"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl outline-none focus:border-[#FF4D30] focus:bg-white transition-colors text-sm placeholder:text-slate-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#FF4D30] hover:bg-[#e03d21] text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-[#FF4D30]/10 active:scale-[0.99] pt-3 text-xs uppercase tracking-wider cursor-pointer"
                        >
                            Sign In
                        </button>

                        {/* Divider Line */}
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="flex-shrink mx-3 text-slate-400 text-xs font-bold uppercase">Or</span>
                            <div className="flex-grow border-t border-slate-200"></div>
                        </div>

                        {/* Google Login Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 border border-slate-200 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                        >
                            <Image
                                width={16}
                                height={16}
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/960px-Google_Favicon_2025.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20251015042304"
                                alt="google"
                                className="h-4 w-4"
                            />
                            Login with Google
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;