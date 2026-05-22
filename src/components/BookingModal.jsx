"use client";

import { useState } from "react";
import { Button, Modal, TextField, Label } from "@heroui/react";
import { Calendar, UserCheck, FileText, Car, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {  useRouter } from "next/navigation";

export default function BookingModal({ car }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()


    const { data: session } = authClient.useSession()
    const user = session?.user;

    const [formState, setFormState] = useState({
        startDate: "",
        endDate: "",
        driverNeeded: false
    });

    const driverCostPerDay = 20;
    const carPricePerDay = car?.dailyPrice || 0;

    let totalDays = 0;
    let baseRentCost = 0;
    let driverAllowanceCost = 0;
    let finalTotalPrice = 0;

    if (formState.startDate && formState.endDate) {
        const startDateObj = new Date(formState.startDate);
        const endDateObj = new Date(formState.endDate);

        const timeDiffInMs = endDateObj.getTime() - startDateObj.getTime();

        const calculatedDays = Math.ceil(timeDiffInMs / (1000 * 60 * 60 * 24));

        if (calculatedDays > 0) {
            totalDays = calculatedDays;

            baseRentCost = totalDays * carPricePerDay;

            if (formState.driverNeeded === true) {
                driverAllowanceCost = totalDays * driverCostPerDay;
            } else {
                driverAllowanceCost = 0;
            }

            finalTotalPrice = baseRentCost + driverAllowanceCost;
        }
    }

   const handleConfirmBooking = async (e) => {
    e.preventDefault();

    const {data:tokenData} = await authClient.token()
    console.log("from modal",tokenData)

    if (!user?.email) {
        toast.error('You must be logged in to book a car!');
        return;
    }

    const formData = new FormData(e.target);
    const rawValues = Object.fromEntries(formData);

    console.log('raw values',rawValues)

    if (!rawValues.startDate || !rawValues.endDate) {
        toast.error("Please select both Pick-up and Drop-off dates!");
        return;
    }

    setIsSubmitting(true);

    const bookingData = {
        carId: car?._id, 
        userEmail: user?.email,
        carName: car?.carName,
        carImage: car?.imageUrl,
        startDate: rawValues.startDate,
        endDate: rawValues.endDate,
        specialNote: rawValues.specialNote || "",
        driverNeeded: !!rawValues.driverNeeded,
        totalDays: totalDays,
        totalPrice: finalTotalPrice,
        bookingDate: new Date().toISOString(),
    };

    try {
        const res = await fetch('https://drive-fleet-sever.vercel.app/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(bookingData)
        });

        const data = await res.json();
        console.log('is submitted', data);

        if (res.ok) {
            setTimeout(() => {
                setIsSubmitting(false);
                setIsOpen(false);
                toast.success("Booking Confirmation Successful!");
                router.replace('/my-bookings');
            }, 1500);
        } else {
            setIsSubmitting(false);
            toast.error(data.message || "Booking failed on server!");
        }

    } catch (error) {
        setIsSubmitting(false);
        toast.error("Network error! Could not connect to server.");
        console.error(error);
    }
};

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="w-full bg-[#FF4D30] hover:bg-[#e03d21] text-white py-6 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-[#FF4D30]/20"
            >
                BOOK THIS VEHICLE <ArrowRight className="h-4 w-4" />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                            <Modal.Header className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#FF4D30]/10 text-[#FF4D30] p-2.5 rounded-xl">
                                        <Car className="size-5" />
                                    </div>
                                    <div>
                                        <Modal.Heading className="text-lg font-black text-slate-900">Book Your Ride</Modal.Heading>
                                        <p className="text-xs font-bold text-slate-500 mt-0.5">{car?.name}</p>
                                    </div>
                                </div>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                <form id="booking-form" onSubmit={handleConfirmBooking} className="flex flex-col gap-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <TextField className="w-full" variant="secondary">
                                            <Label className="text-xs font-bold text-slate-600 mb-1.5">Pick-up Date</Label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={formState.startDate}
                                                min={new Date().toISOString().split("T")[0]}
                                                onChange={(e) => setFormState(prev => ({ ...prev, startDate: e.target.value }))}
                                                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:border-[#FF4D30] outline-none"
                                            />
                                        </TextField>
                                        <TextField className="w-full" variant="secondary">
                                            <Label className="text-xs font-bold text-slate-600 mb-1.5">Drop-off Date</Label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={formState.endDate}
                                                min={formState.startDate || new Date().toISOString().split("T")[0]}
                                                onChange={(e) => setFormState(prev => ({ ...prev, endDate: e.target.value }))}
                                                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:border-[#FF4D30] outline-none"
                                            />
                                        </TextField>
                                    </div>

                                    {/* Driver Input */}
                                    <div className="flex items-center justify-between p-3.5 bg-slate-50/80 border border-slate-100 rounded-xl">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                                <UserCheck className="size-4" /> Professional Driver
                                            </span>
                                            <span className="text-[11px] font-semibold text-slate-400">Additional cost: ${driverCostPerDay}/day</span>
                                        </div>
                                        <label className="flex items-center gap-2 cursor-pointer px-3 py-1.5  rounded-lg hover:bg-slate-100 transition-all select-none">
                                            <span className="text-xs font-bold text-slate-700">Include</span>
                                            <input
                                                type="checkbox"
                                                name="driverNeeded"
                                                checked={formState.driverNeeded}
                                                onChange={(e) => setFormState(prev => ({ ...prev, driverNeeded: e.target.checked }))}
                                                className="w-4 h-4 accent-[#FF4D30] cursor-pointer"
                                            />
                                        </label>
                                    </div>

                                    {/* Special Note */}
                                    <TextField className="w-full" variant="secondary">
                                        <Label className="text-xs font-bold text-slate-600 flex items-center gap-1 mb-1.5">
                                            <FileText className="size-3.5 text-slate-400" /> Special Instructions
                                        </Label>
                                        <textarea
                                            name="specialNote"
                                            placeholder="Any specific requests (e.g., child seat)..."
                                            rows={2}
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#FF4D30] placeholder:text-slate-400 resize-none"
                                        />
                                    </TextField>

                                    {totalDays > 0 && (
                                        <div className="p-4 bg-emerald-50/60 border border-emerald-100/70 rounded-xl space-y-2">
                                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                                <span>Base Rent ({totalDays} days):</span>
                                                <span className="font-bold text-slate-800">${baseRentCost}</span>
                                            </div>
                                            {formState.driverNeeded && (
                                                <div className="flex justify-between text-xs font-semibold text-slate-500">
                                                    <span>Driver Allowance:</span>
                                                    <span className="font-bold text-slate-800">${driverAllowanceCost}</span>
                                                </div>
                                            )}
                                            <div className="h-px bg-slate-200/60" />
                                            <div className="flex justify-between items-center text-sm font-black text-slate-900">
                                                <span>Total Price:</span>
                                                <span className="text-emerald-600">${finalTotalPrice}</span>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </Modal.Body>

                            <Modal.Footer className="p-6 pt-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                                <Button variant="secondary" onClick={() => setIsOpen(false)} className="font-bold text-sm text-slate-500 bg-slate-200 rounded-xl">Cancel</Button>
                                <Button
                                    type="submit"
                                    form="booking-form"
                                    className="bg-[#FF4D30] text-white font-bold text-sm px-6 rounded-xl"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
}