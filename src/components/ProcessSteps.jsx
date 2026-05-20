"use client";

import { motion } from "framer-motion";
import { Car, Headset, KeyRound } from "lucide-react";

export default function ProcessSteps() {
  const steps = [
    {
      id: 1,
      title: "Select Your Ride",
      description: "Browse our extensive fleet of premium vehicles and find the absolute perfect match for your upcoming journey.",
      icon: Car,
      bgColor: "bg-red-50",
      iconColor: "text-[#FF4D30]",
    },
    {
      id: 2,
      title: "Contact Operator",
      description: "Our dedicated support professionals are available 24/7 to swiftly verify your booking parameters and details.",
      icon: Headset,
      bgColor: "bg-slate-50",
      iconColor: "text-slate-900",
    },
    {
      id: 3,
      title: "Let's Drive",
      description: "Grab your keys, hit the open road, and experience a flawless trip with our fully insured corporate-grade vehicles.",
      icon: KeyRound,
      bgColor: "bg-red-50",
      iconColor: "text-[#FF4D30]",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section className="w-full bg-white py-16 lg:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.p 
            className="text-sm font-bold tracking-wider text-slate-950 uppercase mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Plan your trip now
          </motion.p>
          
          
          <motion.h2 
            className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Quick & easy car rental
          </motion.h2>
          
          <motion.p 
            className="text-sm max-w-[60%] mx-auto tracking-wider text-slate-400 mb-2 mt-1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Booking a car rental is a straightforward process that typically involves the following steps
          </motion.p>
          
        </div>

        {/* Grid Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div 
                key={step.id} 
                className="relative flex flex-col items-center text-center group z-10"
                variants={cardVariants}
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] border-t-2 border-dashed border-slate-200 pointer-events-none -z-10" />
                )}

                <div className={`w-24 h-24 ${step.bgColor} rounded-3xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                  <IconComponent className={`h-10 w-10 ${step.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#FF4D30] transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}