import { Search, Star } from "lucide-react";

const NasVisionCctvCamera = () => {
  return (
    <div className="bg-[#fff1f2] py-16 w-full">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
        {/* Vision */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-600 rounded-full p-5 mb-4 flex items-center justify-center shadow-lg shadow-red-200/60">
            <Search className="text-white w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-red-700 tracking-wide">Vision</h3>
          <p className="text-base sm:text-lg text-red-900/70 max-w-md">
            Being an active contributor in building a more secure and safe India, by using the best technologies and human expertise for high quality CCTV installation services in Indore.
          </p>
        </div>
        {/* Mission */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-tr from-red-700 via-red-600 to-red-400 rounded-full p-5 mb-4 flex items-center justify-center shadow-lg shadow-red-100/50">
            <Star className="text-white w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-red-700 tracking-wide">Mission</h3>
          <p className="text-base sm:text-lg text-red-900/70 max-w-md">
            We bring innovation and evolve our products, blending technology and human expertise for ultimate customer, employee, and vendor satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NasVisionCctvCamera;