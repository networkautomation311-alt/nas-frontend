import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';

export default function CompanyOverview() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(1);
  const [systemTime, setSystemTime] = useState(new Date());

  // Live timer for feeds
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const networkSolutions = [
    { id: 1, name: "Node 01 - Main Office", status: "ACTIVE", color: "from-slate-900 to-indigo-950", type: "Core Router" },
    { id: 2, name: "Node 02 - Data Center", status: "ACTIVE", color: "from-zinc-900 to-slate-950", type: "Distribution Switch" },
    { id: 3, name: "Node 03 - Branch Office", status: "ACTIVE", color: "from-neutral-900 to-emerald-950", type: "Edge Firewall" },
    { id: 4, name: "Node 04 - Wifi Hub", status: "ACTIVE", color: "from-stone-900 to-blue-950", type: "Access Point" },
    { id: 5, name: "Node 05 - Security Appliance", status: "ACTIVE", color: "from-slate-900 to-neutral-950", type: "IDS/IPS" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#555555] font-sans flex items-center justify-center p-4 md:p-8">
      {/* Video section replaces bg-image */}
      <div className="max-w-7xl w-full mx-auto py-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* LEFT COLUMN: Tablet with Network Feed Layout */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto w-full max-w-[580px] aspect-[1.8/1] sm:aspect-[1.58/1] rounded-[24px] overflow-hidden shadow-2xl">
              {/* Remove background image, add video */}
              <div className="absolute inset-0 w-full h-full z-0">
                <video
                  className="object-cover w-full h-full rounded-[24px]"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://res.cloudinary.com/dz4zdzuaj/video/upload/q_auto/f_auto/v1779260722/nas_promo_video_prvjra.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: About Our Company */}
          <div className="lg:col-span-6 space-y-6 lg:pl-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
              About Company
            </h2>
            <div className="text-[#666666] text-[15px] sm:text-[16px] leading-[1.7] space-y-5">
              <p>
                We are pioneers in <b>Network Automation Solutions</b>, trusted by organizations throughout Indore since 2002. Our headquarters is in Indore, and we are a leading provider of automated, intelligent, and secure network infrastructures. Our solutions are deployed in hundreds of enterprise environments.
              </p>
              <p>
                <strong className="text-black font-bold">Network Automation Solutions in Indore</strong> are advancing rapidly, and we deliver cutting-edge systems for enterprises and businesses of any scale. Our engineers and automation specialists bring decades of expertise, ensuring seamless, secure, and reliable network operations right at your doorstep.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* DETAILED INTERACTIVE NETWORK TERMINAL MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative">

            {/* Modal Header */}
            <div className="flex justify-between items-center bg-slate-950 px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-mono tracking-wider font-bold text-white uppercase">
                  Live Network Central Station - Demonstration Screen
                </span>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
                aria-label="Close window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Grid removed */}

            {/* Modal Footer */}
            <div className="bg-slate-950 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-800 text-xs">
              <span className="text-slate-500">
                Created to demonstrate live network automation solutions interface.
              </span>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
              >
                Close Terminal
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}