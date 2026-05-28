import React, { useState } from 'react';
import {
  Smartphone,
  Tv,
  HardDrive,
  Wrench,
  Shield,
  Phone,
  Mail,
  Camera,
} from 'lucide-react';

export default function CctvLandingPage() {
  // State
  const [cameraCount, setCameraCount] = useState(4);
  const [resolution, setResolution] = useState('1080p');
  const [storageDays, setStorageDays] = useState(15);
  const [needsInstallation, setNeedsInstallation] = useState(true);

  // Calculation Logic
  const calculatePrice = () => {
    // Corrected price calculation based on requirements
    const basePrice =
      resolution === '4k'
        ? 4200
        : resolution === '4mp'
        ? 2400
        : 1500;
    const dvr =
      cameraCount <= 4
        ? 3500
        : cameraCount <= 8
        ? 5500
        : 9500;
    const storage =
      storageDays === 60
        ? 7500
        : storageDays === 30
        ? 4500
        : 2500;
    const install = needsInstallation ? cameraCount * 500 : 0;
    const wires = cameraCount * 400;
    return basePrice * cameraCount + dvr + storage + install + wires;
  };

  return (
    <div className="bg-[#f6f7fb] min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="w-full pt-8 pb-10 bg-gradient-to-r from-red-200 via-red-100 to-white flex items-center">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row-reverse items-center px-6 gap-6">
          {/* Camera Visual Panel */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative flex items-center justify-center aspect-square w-[300px] md:w-[360px] lg:w-[420px]">
              {/* Camera Illustration */}
              <img
                src="/image/bdcamera.png"
                alt="Modern CCTV Camera"
                className="w-full h-full object-cover"
                style={{ aspectRatio: '1/1', width: '100%', height: '100%' }}
                draggable={false}
              />
        
            </div>
          </div>
          {/* Headline & Description */}
          <div className="flex-1 flex flex-col md:items-end md:text-right max-w-lg">
            <h1 className="text-[25px] sm:text-[34px] md:text-[44px] leading-tight font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-yellow-400 tracking-tighter mb-2 drop-shadow-lg font-jost">
              Indore’s Most Trusted <br />
              <span className="block text-slate-900 bg-none font-bold text-[1.5rem] md:text-[2.2rem] tracking-normal pt-2">
                CCTV Installation Experts
              </span>
            </h1>
            <p className="text-lg font-semibold">
              Secure your home or business the smart way with<br />
              best-in-class <span className="font-bold text-slate-900">CCTV Installation</span> by local certified pros.<br />
              <span className="block mt-1">
                Remote access, powerful backups, elegant fit-outs.<br className="hidden md:inline" />
                All at a clear upfront price.
              </span>
            </p>
          </div>
        </div>
      </section>
      {/* Calculator Section */}
      <section
        id="estimator"
        className="py-8 relative bg-white"
      >
        {/* Optional overlay for readability (remove overlay to keep background white) */}
        {/* <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" /> */}
        {/* Increase width by using max-w-7xl and px-2 (or even px-0 for edge-to-edge) */}
        <div className="container mx-auto max-w-7xl px-2 sm:px-4 relative z-10">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-10">
            {/* Config panel */}
            <div className="flex-1 pr-0 md:pr-10">
              <h2 className="text-2xl font-bold mb-2 text-slate-900">Quick Installation Estimator</h2>
              <p className="text-slate-500 mb-8">Get an instant estimate for hardware, storage &amp; pro install in Kolkata.</p>

              {/* Camera count slider */}
              <div className="mb-8">
                <label className="font-medium text-slate-700 text-sm flex justify-between mb-1">
                  Cameras needed:
                  <span className="font-black ml-2 text-slate-900">{cameraCount}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="16"
                  step="1"
                  value={cameraCount}
                  onChange={e => setCameraCount(parseInt(e.target.value))}
                  className="w-full accent-gradient-red cursor-pointer"
                  style={{
                    accentColor: '#ef4444'
                  }}
                />
                <div className="text-xs text-slate-400 mt-1 flex justify-between">
                  <span>1</span>
                  <span>8</span>
                  <span>16</span>
                </div>
              </div>
        

              {/* Resolution buttons */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wide mb-2">Resolution</label>
                <div className="flex gap-2">
                  {["1080p", "4mp", "4k"].map(res => (
                    <button
                      key={res}
                      onClick={() => setResolution(res)}
                      className={
                        "flex-1 py-2 rounded-lg text-xs font-bold transition " +
                        (resolution === res
                          ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white shadow"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100")
                      }
                    >
                      {res === "1080p"
                        ? "HD (1080p)"
                        : res === "4mp"
                        ? "Ultra (4MP)"
                        : "True 4K"}
                    </button>
               
                  ))}
                </div>
              </div>

              {/* Storage buttons */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wide mb-2">Recording Days</label>
                <div className="flex gap-2">
                  {[15, 30, 60].map(days => (
                    <button
                      key={days}
                      onClick={() => setStorageDays(days)}
                      className={
                        "flex-1 py-2 rounded-lg text-xs font-bold transition " +
                        (storageDays === days
                          ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white shadow"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100")
                      }
                    >
                      {days} Days
                    </button>
               
                  ))}
                </div>
              </div>

              {/* Install toggle */}
              <div className="mb-4 flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-red-200">
                <span className="font-semibold text-xs text-slate-700 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 bg-clip-text" />
                  Need Installation Help?
                </span>
           
                <button
                  onClick={() => setNeedsInstallation(!needsInstallation)}
                  className={
                    "relative w-12 h-7 rounded-full duration-200 border-2 border-slate-200" +
                    (needsInstallation
                      ? " bg-red-500 border-red-400"
                      : " bg-slate-300")
                  }
                  aria-label="Toggle Installation"
                >
                  <span
                    className={
                      "block w-6 h-6 rounded-full bg-white shadow transform duration-200" +
                      (needsInstallation ? " translate-x-5" : "")
                    }
                  />
                </button>
              </div>
            </div>

            {/* Summary panel */}
            <div className="flex-1 rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 border-b pb-2 mb-4 tracking-wider">Your Quote Includes</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-center gap-2"><Camera className="w-4 h-4 text-red-400" /> {cameraCount}x Cameras</li>
                  <li className="flex items-center gap-2"><Tv className="w-4 h-4 text-red-400" /> DVR Box &amp; Accessories</li>
                  <li className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-red-400" /> {storageDays} Day Loop Storage</li>
                  <li className="flex items-center gap-2"><Wrench className="w-4 h-4 text-red-400" /> {needsInstallation ? "Professional Setup" : "Self Install"}</li>
                </ul>
              </div>
              <div className="mt-8 flex flex-col items-center">
                <div className="text-[11px] text-slate-400 uppercase">Total Estimate</div>
                <div className="text-4xl font-black text-red-500 my-2 tracking-tight">
                  ₹{calculatePrice().toLocaleString('en-IN')}
                  <span className="text-base text-slate-400 font-medium">*</span>
                </div>
                <div className="text-xs text-slate-400 mb-4">Excludes GST. Actual wiring extra if site requires.</div>
                <a
                  href="#"
                  className="bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 hover:from-red-600 hover:to-yellow-500 text-white font-bold w-full text-center py-2 rounded-lg shadow transition text-sm"
                >
                  Book on WhatsApp
                </a>
           
           
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Feature Grid */}
      <section className="bg-white text-white py-6">
        <div className="container px-7 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-red-500 via-red-600 to-yellow-400 rounded-2xl p-2 md:p-4">
            {/* Mobile Monitoring */}
            <div className="flex flex-col items-center bg-white/90 rounded-xl py-6 px-2 transition text-slate-900">
              <Smartphone className="w-8 h-8 text-red-500 mb-2" />
              <span className="font-bold text-[0.98rem]">Mobile Monitoring</span>
              <span className="mt-1 text-xs text-slate-600 text-center">
                Watch anytime, anywhere via your phone.
              </span>
            </div>
            {/* TV/Desktop View */}
            <div className="flex flex-col items-center bg-white/90 rounded-xl py-6 px-2 transition text-slate-900">
              <Tv className="w-8 h-8 text-red-500 mb-2" />
              <span className="font-bold text-[0.98rem]">TV/Desktop Live</span>
              <span className="mt-1 text-xs text-slate-600 text-center">
                Mirror feeds on big screens easily.
              </span>
            </div>
            {/* Smart DVR */}
            <div className="flex flex-col items-center bg-white/90 rounded-xl py-6 px-2 transition text-slate-900">
              <HardDrive className="w-8 h-8 text-red-500 mb-2" />
              <span className="font-bold text-[0.98rem]">Backup DVR</span>
              <span className="mt-1 text-xs text-slate-600 text-center">
                Reliable storage for your recordings.
              </span>
            </div>
            {/* Pro Installation */}
            <div className="flex flex-col items-center bg-white/90 rounded-xl py-6 px-2 transition text-slate-900">
              <Wrench className="w-8 h-8 text-red-500 mb-2" />
              <span className="font-bold text-[0.98rem]">Pro Installation</span>
              <span className="mt-1 text-xs text-slate-600 text-center">
                Neat, concealed, and safe wiring.
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}