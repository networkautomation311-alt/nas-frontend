import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

// Corrected formatting, spellings, and simple improvements to code as needed

export default function CctvServices() {
  // State Hooks
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("General Consultation");
  // Removed isProductModalOpen (and all Product Modal code)
  const [toast, setToast] = useState({ show: false, title: "", message: "" });

  // Calculator States (unused but left for completeness)
  const [propertyType, setPropertyType] = useState("Residential");
  const [cameraCount, setCameraCount] = useState(4);
  const [brandChoice, setBrandChoice] = useState("budget");
  const [calculatedPrice, setCalculatedPrice] = useState(12500);

  // Form States
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  useEffect(() => {
    let baseRate = 2200;
    if (brandChoice === "standard") baseRate = 3000;
    if (brandChoice === "premium") baseRate = 4500;

    const dvrCost = propertyType === "Industrial" ? 6000 : 3500;
    const hardDiskCost = cameraCount > 8 ? 6000 : 3000;
    const installationLabor = cameraCount * 450;

    setCalculatedPrice(
      cameraCount * baseRate + dvrCost + hardDiskCost + installationLabor
    );
  }, [cameraCount, brandChoice, propertyType]);

  const triggerToast = (title, message) => {
    setToast({ show: true, title, message });
    setTimeout(() => {
      setToast({ show: false, title: "", message: "" });
    }, 4500);
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    setIsCallbackOpen(false);
    triggerToast(
      "Inquiry Received! ✔️",
      `Thank you ${clientName}. हमारी टीम जल्द ही आपको ${clientPhone} पर कॉल करेगी।`
    );
    setClientName("");
    setClientPhone("");
  };

  const openCallbackFor = (serviceName) => {
    setSelectedService(serviceName);
    setIsCallbackOpen(true);
  };

  // Services (typos fixed)
  const services = [
    {
      id: 1,
      title: "Surveillance System Installation",
      desc: "The close surveillance of business or properties has got flexible setups and fixing choices. Our CCTV Surveillance System Installation brings together the best in cabling management, line checkup and real-time video analyzer. We are offering CCTV installation services to commercial, retail and industrial spaces under expert technicians. We update with all the leading brands.",
      img: "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779276487/ChatGPT_Image_May_20_2026_04_57_55_PM_vlsdmi.png",
    },
    {
      id: 2,
      title: "CCTV Camera Repair",
      desc: "CCTV cameras suffering hardware glitches, bad connectivity, blurriness of the lens or recording issues. Regular maintenance of CCTV is imperative when systems are under active duty. It keeps surveillance active for uninterrupted safety of your premises.",
      img: "https://res.cloudinary.com/dz4zdzuaj/image/upload/q_auto/f_auto/v1779276976/ChatGPT_Image_May_20_2026_05_05_24_PM_ndngei.png",
    },
    {
      id: 3,
      title: "CCTV Installation AMC",
      desc: "CCTV surveillance setup collection which can keep the effectiveness of security surveillance. CCTV installation is recommended under active maintenance contract. Specially designed service plans to keep your system and accessories functional.",
      img: "/image/cctvinstallation.png",
    },
    {
      id: 4,
      title: "24/7 Monitoring",
      desc: "Our CCTV surveillance network monitoring center actively keeps check on secure transmissions. You can view feed on your smartphone, tablet or dedicated screens with highly secure password setup.",
      img: "/image/monitor.png",
    },
    {
      id: 5,
      title: "CCTV Camera Dealer",
      desc: "The item collection includes cameras with different lenses, DVR, NVR, power supply and high-speed hard disks. Get all parts under wholesale rates with warranty assurance on every purchase.",
      img: "/image/cctvdealer.png",
    },
    {
      id: 6,
      title: "Branded CCTV Camera Installation",
      desc: "We provide popular brands of home camera security setups with high-quality cameras. Best brand setup includes Hikvision, CP Plus, Dahua etc. Fully secure setups.",
      img: "/image/brandimage.png",
    },
  ];

  // Camera types (fixed consistent naming)
  const cameraTypes = [
    {
      name: "Dome CCTV Camera",
      img: "/image/domecamera.png",
      desc: "Indoor ceiling-mounted circular security device.",
    },
    {
      name: "Bullet CCTV Camera",
      img: "/image/bulletcamera.png",
      desc: "Weatherproof long cylinder camera with shade shield.",
    },
    {
      name: "PTZ Pan Tilt Zoom Camera",
      img: "/image/ptzcamera.png",
      desc: "Motorized 360° rotation with powerful optical zoom.",
    },
    {
      name: "C-Mount CCTV Camera",
      img: "/image/cmountcamera.png",
      desc: "Box body cameras with custom changeable zoom lens.",
    },
    {
      name: "Day-Night CCTV Camera",
      img: "/image/daynightcamera.png",
      desc: "Adapts smoothly in low daylight and high sun glare.",
    },
    {
      name: "Infrared-Night Vision CCTV",
      img: "/image/infranightcamera.png",
      desc: "Pitch black area monitoring with dynamic IR LEDs.",
    },
    {
      name: "Network-IP CCTV Camera",
      img: "/image/ipcamera.png",
      desc: "Pure digital high-definition video over IP networks.",
    },
    {
      name: "Wireless CCTV Camera",
      img: "/image/wificamera.png",
      desc: "Smart active Wi-Fi camera with dual antenna.",
    },
  ];

  // UI STARTS HERE
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans antialiased">
      {/* HERO HEADER */}
      <header className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 font-jost text-[2.375rem] bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
          CCTV Installation Services in Indore
        </h1>
        <p className="text-gray-600 w-full max-w-screen-lg mx-auto leading-relaxed font-[Jost] text-[20px] mt-1 mb-0 ml-0 mr-0 text-justify">
          With security and worries growing, and rapid adoption of the latest surveillance cameras in business, we offer a comprehensive and customized range of products, services, and solutions that cater to every need. Professional service for all kinds of state-of-the-art security equipment. Based in Kolkata, we are highly engaged in providing a wide range of security systems required for various surveillance purposes.
        </p>
      </header>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 pb-16 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col rounded-xl overflow-hidden transition"
            >
              <div>
                {/* Image */}
                <div className="w-full aspect-[16/9] overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    style={{
                      aspectRatio: "16/9",
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      display: "block",
                    }}
                  />
                </div>
                {/* Title & Desc */}
                <div className="pt-6 px-3 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-justify px-3 font-[Jost] text-[18px]">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAMERA TYPES */}
      <section className="bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-bold tracking-tight text-gray-950 mb-12 font-[Jost] text-[38px]">
            Types of CCTV Camera
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 gap-x-10">
            {cameraTypes.map((type, i) => (
              <div
                key={i}
                className="p-4 rounded-xl flex flex-col items-center"
              >
                <div className="w-full aspect-[16/9] rounded-lg mb-4 overflow-hidden">
                  <img
                    src={type.img}
                    alt={type.name}
                    className="w-full h-full object-contain"
                    style={{
                      aspectRatio: "16/9",
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      display: "block",
                    }}
                  />
                </div>
                <div className="text-center w-full px-3">
                  <h4 className="font-bold text-gray-900 text-base md:text-lg mb-1">
                    {type.name}
                  </h4>
                  <p className="text-gray-600 font-[Jost] text-[18px]">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Bottom action */}
          {/* "View Product Details" button removed as per instruction */}
        </div>
      </section>

      {/* DVR & NVR SECTION */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* DVR IMAGE */}
            <div className="flex justify-center">
              <img
                src="/image/dvr.png"
                alt="Digital Video Recorder (DVR)"
                className="w-[340px] max-w-full object-contain"
              />
            </div>
            {/* DVR DESCRIPTION */}
            <div>
              <h3 className="text-2xl font-bold text-gray-950 mb-3 font-[Jost]">
                Digital Video Recorder (DVR)
              </h3>
              <p className="text-gray-700 mb-3 text-[17px] font-[Jost]">
                DVR (Digital Video Recorder) is an electronic device that records and stores the video signal coming from an analog camera. It converts the video into digital format so that the user can playback it later. Available in 4, 8, 16, 32, and 64 channel variants.
              </p>
              <p className="text-gray-700 mb-3 text-[17px] font-[Jost]">
                It is mainly used in security systems where analog cameras are deployed. It also allows for remote camera access, so users can monitor cameras from anywhere.
              </p>
              <p className="text-gray-700 mb-3 text-[17px] font-[Jost]">
                A digital video recorder is a large hard drive where the video signal is stored. It also provides easy search, filter, and playback of video recordings, comes with a user-friendly interface, and offers advanced features like motion detection and remote viewing.
              </p>
            </div>
          </div>

          {/* NVR SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-16">
            {/* NVR IMAGE */}
            <div className="flex justify-center md:order-2">
              <img
                src="/image/nvr.png"
                alt="Network Video Recorder (NVR)"
                className="w-[340px] max-w-full object-contain"
              />
            </div>
            {/* NVR DESCRIPTION */}
            <div className="md:order-1">
              <h3 className="text-2xl font-bold text-gray-950 mb-3 font-[Jost]">
                Network Video Recorder (NVR)
              </h3>
              <p className="text-gray-700 mb-3 text-[17px] font-[Jost]">
                NVR (Network Video Recorder) is an electronic device that records and stores the video stream from an IP camera. Stores video in high-quality digital format for later playback.
              </p>
              <p className="text-gray-700 mb-3 text-[17px] font-[Jost]">
                Commonly used in security systems managing multiple IP cameras. It supports remote access, enabling users to monitor their cameras easily from anywhere.
              </p>
              <p className="text-gray-700 mb-3 text-[17px] font-[Jost]">
                NVRs come with a large hard drive for storage and provide easy search, filter, and playback for recordings. Features a user-friendly interface and many advanced features including motion detection and remote viewing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALLBACK MODAL */}
      {isCallbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Request Callback
              </h3>
              <button
                onClick={() => setIsCallbackOpen(false)}
                className="text-gray-400 hover:text-gray-600"
                type="button"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-blue-600 bg-blue-50 py-2 px-3 rounded-lg mb-4 font-semibold">
              Selected inquiry service: {selectedService}
            </p>
            <form onSubmit={handleCallbackSubmit} className="space-y-4" autoComplete="off">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="cctv-client-name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="cctv-client-name"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full border border-gray-300 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="cctv-client-phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="cctv-client-phone"
                  required
                  pattern="[0-9]{10}"
                  inputMode="numeric"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile number"
                  className="w-full border border-gray-300 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  maxLength={10}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Request Instant Support
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gray-950 text-white py-3 px-5 rounded-2xl">
          <Check className="w-4 h-4 text-emerald-400" />
          <div className="text-xs">
            <div className="font-bold">{toast.title}</div>
            <div className="text-gray-400 mt-0.5">{toast.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}