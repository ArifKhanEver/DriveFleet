"use client";

import { Button, Modal } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function MyAddedCarDeleteModal({ car }) {
    const router = useRouter()
    const handleDelete = async () => {
        if (!car?._id) return;

        try {
            const res = await fetch(`http://localhost:5000/cars/${car._id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            });

            if(res.ok) {
                toast.success('Car deleted successfully');
                router.replace('/my-added-cars'); 
            }

        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };
    return (
        <div className="flex flex-wrap gap-4 w-full">
            <Modal>
                <Button
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs h-10 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-red-200/40 shadow-sm"
                >
                    <Trash2 className="size-3.5" /> Delete
                </Button>
                

                <Modal.Backdrop className="backdrop-blur-sm bg-black/40">
                    <Modal.Container>
                        <Modal.Dialog className="bg-white rounded-2xl p-6 max-w-md mx-auto shadow-xl border border-slate-100 flex flex-col items-center text-center">
                            <Modal.CloseTrigger className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors" />

                            <Modal.Header className="flex flex-col items-center gap-3 w-full">
                                <Modal.Icon className="p-3 bg-red-50 text-red-500 rounded-full border border-red-100 flex items-center justify-center shadow-sm">
                                    <Trash2 className="size-6" />
                                </Modal.Icon>

                                <Modal.Heading className="text-xl font-extrabold text-slate-900 tracking-tight flex flex-col items-center gap-1.5">
                                    Delete car?
                                    {car?.carName && (
                                        <h2 className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md inline-block mt-1 border border-slate-200/50">
                                            {car.carName}
                                        </h2>
                                    )}
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="mt-2">
                                <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                                    Are you sure you want to delete this car? This action cannot be undone and your car-data will be permanently lost.
                                </p>
                            </Modal.Body>

                            <Modal.Footer className="mt-6 flex gap-3 w-full border-t border-slate-100 pt-4 bg-slate-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                                <Button
                                    slot="close"
                                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs h-11 rounded-xl transition-colors cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    slot="close"
                                    onClick={handleDelete}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-11 rounded-xl transition-all shadow-md shadow-red-600/10 cursor-pointer"
                                >
                                    Confirm
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}