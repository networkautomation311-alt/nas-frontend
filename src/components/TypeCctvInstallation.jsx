export default function TypeCctvInstallation() {
  // System data (image URLs or file names, update as needed)
  const systems = [
    {
      id: "wired",
      title: "Wired CCTV installation",
      paragraph:
        "Wired CCTV installations demand cable connections from cameras to DVRs/monitors, often involving drilling and routing through walls and ceilings. The result is a reliable, stable connection best suited for locations where running wires is feasible and preferred.",
      color: "blue",
      img: "/image/wiredcctvinstall.png",
    },
    {
      id: "wireless",
      title: "Wireless CCTV installation",
      paragraph:
        "Wireless CCTV systems transmit the video signal over the air—no cables between camera and monitor. They are easy to install in most places, but local obstacles like trees or wired interference can sometimes affect signal performance.",
      color: "cyan",
      img: "/image/wifiinstall.png",
    },
    {
      id: "ip",
      title: "IP CCTV Installation",
      paragraph:
        "IP CCTV installation connects cameras to your local network or internet, allowing control and viewing from anywhere online. This offers powerful remote access and higher scalability, but requires proper network setup for best performance.",
      color: "emerald",
      img: "/image/ipcctvinstall.png",
    },
    {
      id: "analog",
      title: "Analog CCTV Installation",
      paragraph:
        "Analog CCTV installations use coaxial cable to send video from cameras to monitors or DVRs. The technology is simple, cost-effective, and suitable for smaller setups—though it may have limitations in signal quality and maximum distance.",
      color: "amber",
      img: "/image/analogcctvinstall.png",
    },
  ];

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans antialiased">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-xl md:text-4xl font-semibold tracking-tight mb-4 font-jost text-[1.5rem] bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
          Types of CCTV Installation
        </h1>
   
        <p className="text-gray-600 w-full max-w-screen-lg mx-auto leading-relaxed font-[Jost] text-[20px] mt-[5px] mb-0 ml-0 mr-0 text-justify">
        Choosing the right CCTV installation is very important for security and surveillance of any place. Each CCTV installation has its own advantages and limitations so choosing the right one depends on the location and the specific needs of the security system. There are different types of CCTV installations available for security monitoring and surveillance and each has unique features and benefits.        </p>
      </header>

      {/* SYSTEMS GRID */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {systems.map((system) => (
            <div
              key={system.id}
              className="flex flex-col overflow-hidden"
            >
              {/* Image container like CctvServices.jsx */}
              <div className="w-full aspect-[16/9] overflow-hidden">
                <img
                  src={system.img}
                  alt={system.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  style={{
                    aspectRatio: "16/9",
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    background: "white",
                  }}
                />
              </div>
              {/* Text and details */}
              <div className="pt-6 pb-5 px-5 text-center flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 tracking-tight">
                  {system.title}
                </h3>
                <p className="text-gray-500 font-[Jost] text-[18px] mb-6">
                  {system.paragraph}
                </p>
                <div className="flex-1"></div>
                {/* Button removed as per instruction */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}