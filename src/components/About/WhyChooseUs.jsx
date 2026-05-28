export default function WhyChooseUs() {
  const features = [
    {
      title: "Individually",
      description:
        "All CCTV installations are done on a one-to-one basis and tailored to the specific needs of the location or individual.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-.1 1-.43A6 6 0 1121.75 8.25z"
          />
        </svg>
      ),
    },
    {
      title: "Genuine Products",
      description:
        "We offer or sell genuine company products with warranty. Products are sourced from authorized manufacturers or distributors.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7V5a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9c-2.75 0-5 2.25-5 3s2.25 3 5 3 5-2.25 5-3-2.25-3-5-3z"
          />
          <circle
            cx="12"
            cy="12"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path strokeLinecap="round" d="M8 12h8" />
        </svg>
      ),
    },
    {
      title: "Professionally",
      description:
        "Installation, maintenance, repair or other services related to CCTV systems are provided in a professional manner.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 9l-2-2m0 0l-2 2m2-2v12M3 12h18M17 14l2-2m-2 2l-2-2m2 2v-5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18c2-2 4-2 6-2s4 0 6 2M4 14.5a3 3 0 013-3h10a3 3 0 013 3"
          />
        </svg>
      ),
    },
    {
      title: "24/5 support",
      description:
        "Our support team is available to answer questions, resolve issues, or provide guidance to customers or clients during normal business hours on weekdays.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect
            x="7"
            y="3"
            width="10"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 9h3a1 1 0 011 1v1a1 1 0 01-1 1h-3"
          />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
          <path strokeLinecap="round" d="M10 18h4" />
        </svg>
      ),
    },
    {
      title: "Quick help call",
      description:
        "Customers can contact a support team or helpline over phone to get immediate assistance or guidance for their problems.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 20L10 4h4l4 16M4 20h16M8 15h8M9 10h6"
          />
        </svg>
      ),
    },
    {
      title: "Reliability",
      description:
        "Our reliable service is able to build trust and satisfaction with customers. So our team is always ready to help customers.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle
            cx="8"
            cy="14"
            r="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="16"
            cy="10"
            r="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path strokeLinecap="round" d="M10.5 12.5l3-3" />
          <path
            d="M7 14a1 1 0 102 0 1 1 0 00-2 0zM15 10a1 1 0 102 0 1 1 0 00-2 0z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      style={{
        // No background image
        // fallback background
        backgroundColor: '#ffffff',
      }}
    >
      {/* Color overlay for better readability */}
      <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-[2px] pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Why Choose Our Security Services
          </h2>

          {/* Red Gradient Line */}
          <div className="w-32 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-pink-600"></div>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Professional CCTV installations and surveillance systems tailored
            specifically for your peace of mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-row items-start space-x-5 p-5 rounded-2xl transition-all duration-300 hover:bg-red-50 hover:shadow-xl bg-white bg-opacity-90"
              style={{ backdropFilter: 'blur(0.5px)' }}
            >
              {/* Red Gradient Icon Circle */}
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-pink-600 shadow-lg shadow-red-300 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}