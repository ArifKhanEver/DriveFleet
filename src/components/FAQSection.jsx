"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqData = [
    {
        question: "How do I make a reservation?",
        answer: "Simply browse our car selection, select your preferred dates, and click 'Book Now'. You can choose to add a driver or additional requirements during the checkout process."
    },
    {
        question: "What documents do I need to rent a car?",
        answer: "You will need a valid driver's license, a national ID or Passport, and a credit card in the primary driver's name for the security deposit."
    },
    {
        question: "Is insurance included in the rental price?",
        answer: "Yes, basic insurance is included in our daily rates. We also offer optional premium coverage to reduce your excess/deductible."
    },
    {
        question: "Can I cancel or change my booking?",
        answer: "Absolutely! You can modify or cancel your booking up to 24 hours before the pickup time without any penalty fees."
    }
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-[#FF4D30]/10 text-[#FF4D30] rounded-full mb-4">
                        <HelpCircle size={28} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-500 font-semibold">Everything you need to know about our rental service.</p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="text-lg font-bold text-slate-800">{item.question}</span>
                                <div className={`p-1 rounded-full transition-transform ${activeIndex === index ? "bg-[#FF4D30] text-white" : "bg-slate-100 text-slate-600"}`}>
                                    {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 text-slate-500 font-medium leading-relaxed"
                                    >
                                        {item.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}