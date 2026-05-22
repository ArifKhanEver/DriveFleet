"use client";

import { Button, Modal } from "@heroui/react";
import { Edit3, DollarSign, MapPin, Tag, ClipboardList, Image as ImageIcon, AlignLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function UpdateCarModal({ car }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e, closeModal) => {
        e.preventDefault(); 
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`https://drive-fleet-sever.vercel.app/cars/${car._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                toast.success('Vehicle updated successfully!');
                closeModal();     
                router.refresh();   
            } else {
                toast.error('Failed to update vehicle');
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-wrap gap-4 w-full">
            <Modal>
                <Button
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-xs h-10 w-20 min-w-0 p-0 rounded-xl transition-all cursor-pointer border border-indigo-200/40 shadow-sm"
                >
                    <Edit3 className="size-4" /> Update
                </Button>

                <Modal.Backdrop className="backdrop-blur-sm bg-black/40">
                    <Modal.Container>
                        <Modal.Dialog className="bg-white rounded-2xl p-6 max-w-xl mx-auto shadow-xl border border-slate-100 flex flex-col text-left relative max-h-[90vh] overflow-y-auto">
                            {({ close }) => (
                                <form onSubmit={(e) => handleUpdate(e, close)} className="w-full flex flex-col">
                                    <Modal.CloseTrigger className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" />

                                    <Modal.Header className="flex flex-col gap-1 border-b border-slate-100 pb-4 w-full">
                                        <Modal.Heading className="text-xl font-black text-slate-900 tracking-tight">
                                            Update Vehicle Info
                                        </Modal.Heading>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{car?.carName}</p>
                                    </Modal.Header>

                                    <Modal.Body className="mt-4 space-y-4 w-full">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black text-slate-700 flex items-center gap-1.5 uppercase">
                                                    <DollarSign className="size-3.5 text-indigo-500" /> Daily Price ($)
                                                </label>
                                                <input 
                                                    name="price"
                                                    type="number"
                                                    defaultValue={car?.dailyPrice || ""}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-indigo-500 transition-all"
                                                    placeholder="e.g. 99"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black text-slate-700 flex items-center gap-1.5 uppercase">
                                                    <Tag className="size-3.5 text-indigo-500" /> Vehicle Type
                                                </label>
                                                <input 
                                                    name="type"
                                                    type="text"
                                                    defaultValue={car?.carType || ""}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-indigo-500 transition-all"
                                                    placeholder="e.g. SUV, Sedan"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black text-slate-700 flex items-center gap-1.5 uppercase">
                                                    <MapPin className="size-3.5 text-emerald-500" /> Pickup Location
                                                </label>
                                                <input 
                                                    name="location"
                                                    type="text"
                                                    defaultValue={car?.pickupLocation || ""}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-indigo-500 transition-all"
                                                    placeholder="e.g. Dhaka"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-black text-slate-700 flex items-center gap-1.5 uppercase">
                                                    <ClipboardList className="size-3.5 text-amber-500" /> Availability
                                                </label>
                                                <select 
                                                    name="availability"
                                                    defaultValue={car?.availabilityStatus || "Available"}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-indigo-500 transition-all h-[42px]"
                                                >
                                                    <option value="Available">Available</option>
                                                    <option value="Unavailable">Unavailable</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-700 flex items-center gap-1.5 uppercase">
                                                <ImageIcon className="size-3.5 text-blue-500" /> Image URL
                                            </label>
                                            <input 
                                                name="image"
                                                type="url"
                                                defaultValue={car?.imageUrl || ""}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-indigo-500 transition-all"
                                                placeholder="Paste car image URL"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-black text-slate-700 flex items-center gap-1.5 uppercase">
                                                <AlignLeft className="size-3.5 text-slate-500" /> Description
                                            </label>
                                            <textarea 
                                                name="description"
                                                rows="3"
                                                defaultValue={car?.description || ""}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-indigo-500 transition-all resize-none"
                                                placeholder="Enter vehicle details..."
                                                required
                                            />
                                        </div>
                                    </Modal.Body>

                                    <Modal.Footer className="mt-6 flex gap-3 w-full border-t border-slate-100 pt-4 bg-slate-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                                        <Button
                                            slot="close"
                                            type="button"
                                            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs h-11 rounded-xl transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            isLoading={loading}
                                            type="submit"
                                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-11 rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
                                        >
                                            {loading ? "Updating..." : "Update Car"}
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            )}
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}