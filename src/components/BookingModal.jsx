"use client";

import { useState, useEffect } from "react";
import { Button, Modal, Surface, TextField, Switch, Label } from "@heroui/react";
import { Calendar, UserCheck, FileText, DollarSign, Car, ArrowRight } from "lucide-react";

export default function BookingModal({ car }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [needDriver, setNeedDriver] = useState(false); 
    const [specialNote, setSpecialNote] = useState("");
    
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const DRIVER_COST_PER_DAY = 20;

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const timeDiff = end.getTime() - start.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (daysDiff > 0) {
                setTotalDays(daysDiff);
                const rentCost = daysDiff * car?.price;
                const driverCost = needDriver ? daysDiff * DRIVER_COST_PER_DAY : 0;
                setTotalPrice(rentCost + driverCost);
            } else {
                setTotalDays(0);
                setTotalPrice(0);
            }
        }
    }, [startDate, endDate, needDriver, car?.price]);

    const handleConfirmBooking = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            alert("Please select both Pick-up and Drop-off dates!");
            return;
        }

        setIsSubmitting(true);

        const bookingData = {
            carId: car?.id,
            carName: car?.name,
            startDate,
            endDate,
            totalDays,
            totalPrice,
            driverNeeded: needDriver,
            specialNote,    
            bookingDate: new Date().toISOString(),
        };

        console.log("Submitting Booking Data:", bookingData);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsOpen(false);
            alert("Booking Confirmed Successfully!");
        }, 1500);
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="w-full bg-[#FF4D30] hover:bg-[#e03d21] text-white py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-[#FF4D30]/20"
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
                                <form onSubmit={handleConfirmBooking} className="flex flex-col gap-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <TextField className="w-full" name="startDate" variant="secondary">
                                            <Label className="text-xs font-bold text-slate-600 mb-1.5">Pick-up Date</Label>
                                            <input type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setStartDate(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:border-[#FF4D30] outline-none" />
                                        </TextField>
                                        <TextField className="w-full" name="endDate" variant="secondary">
                                            <Label className="text-xs font-bold text-slate-600 mb-1.5">Drop-off Date</Label>
                                            <input type="date" value={endDate} min={startDate || new Date().toISOString().split("T")[0]} onChange={(e) => setEndDate(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:border-[#FF4D30] outline-none" />
                                        </TextField>
                                    </div>

                                    {/* Driver Switch */}
                                    <div className="flex items-center justify-between p-3.5 bg-slate-50/80 border border-slate-100 rounded-xl">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                                <UserCheck className="size-4" /> Driver Needed?
                                            </span>
                                            <span className="text-[11px] font-semibold text-slate-400">+${DRIVER_COST_PER_DAY}/day</span>
                                        </div>
                                        <Switch 
                                            isSelected={needDriver} 
                                            onValueChange={setNeedDriver} 
                                            color="warning" 
                                            className="cursor-pointer"
                                        />
                                    </div>

                                    {/* Special Note */}
                                    <TextField className="w-full" name="specialNote" variant="secondary">
                                        <Label className="text-xs font-bold text-slate-600 flex items-center gap-1 mb-1.5">
                                            <FileText className="size-3.5 text-slate-400" /> Special Instructions
                                        </Label>
                                        <textarea
                                            placeholder="Any specific requests (e.g., child seat)..."
                                            value={specialNote}
                                            onChange={(e) => setSpecialNote(e.target.value)}
                                            rows={2}
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#FF4D30] placeholder:text-slate-400 resize-none"
                                        />
                                    </TextField>

                                    {totalDays > 0 && (
                                        <div className="p-4 bg-emerald-50/60 border border-emerald-100/70 rounded-xl space-y-2">
                                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                                <span>Base Rent ({totalDays} days):</span>
                                                <span className="font-bold text-slate-800">${totalDays * car?.price}</span>
                                            </div>
                                            {needDriver && (
                                                <div className="flex justify-between text-xs font-semibold text-slate-500">
                                                    <span>Driver Allowance:</span>
                                                    <span className="font-bold text-slate-800">${totalDays * DRIVER_COST_PER_DAY}</span>
                                                </div>
                                            )}
                                            <div className="h-px bg-slate-200/60" />
                                            <div className="flex justify-between items-center text-sm font-black text-slate-900">
                                                <span>Total Price:</span>
                                                <span className="text-emerald-600">${totalPrice}</span>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </Modal.Body>

                            <Modal.Footer className="p-6 pt-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                                <Button variant="secondary" onClick={() => setIsOpen(false)} className="font-bold text-sm text-slate-500 bg-slate-200 rounded-xl">Cancel</Button>
                                <Button onClick={handleConfirmBooking} className="bg-[#FF4D30] text-white font-bold text-sm px-6 rounded-xl" disabled={isSubmitting}>
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