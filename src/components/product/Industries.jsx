// No need for explicit import React for function components (React 17+).
import {
  Briefcase,
  Factory,
  GraduationCap,
  Hospital,
} from "lucide-react";

// Industry feature cards (with icon, tag, etc.)
const industryFeatures = [
  {
    title: "Corporate Offices",
    icon: <Briefcase size={44} strokeWidth={2.2} className="text-blue-500" />,
    color: "from-blue-100 to-cyan-100",
    description:
      "Robust access control, CCTV, and automation solutions for secure, modern workplaces—improve productivity and safety.",
    tag: "Workspaces",
    tagColor: "bg-blue-500 text-white",
  },
  {
    title: "Manufacturing & Warehouses",
    icon: <Factory size={44} strokeWidth={2.2} className="text-orange-500" />,
    color: "from-orange-100 to-yellow-100",
    description:
      "Track movement, safeguard assets, and monitor operations 24/7 with advanced surveillance and biometric systems.",
    tag: "Industrial",
    tagColor: "bg-orange-500 text-white",
  },
  {
    title: "Education & Institutions",
    icon: <GraduationCap size={44} strokeWidth={2.2} className="text-green-500" />,
    color: "from-green-100 to-lime-100",
    description:
      "Control visitor entry, protect students & staff, and automate administrative efficiency for schools, colleges, and more.",
    tag: "Campus",
    tagColor: "bg-green-500 text-white",
  },
  {
    title: "Healthcare Facilities",
    icon: <Hospital size={44} strokeWidth={2.2} className="text-pink-500" />,
    color: "from-pink-100 to-purple-100",
    description:
      "Safeguard sensitive areas, enable contactless access, and ensure compliance in hospitals, clinics, and labs.",
    tag: "Health & Safety",
    tagColor: "bg-pink-500 text-white",
  },
];

const Industries = () => {
  return (
    <section className="bg-gradient-to-br from-white via-indigo-50 to-blue-100 min-h-screen">
      {/* Header / Banner */}
      <div className="max-w-6xl mx-auto rounded-3xl p-6">
        <header className="mb-10 flex flex-col items-center text-center">
          <span className="inline-block px-4 py-0 rounded-full bg-indigo-100 text-indigo-600 text-sm mb-2 font-semibold tracking-wide uppercase">
            Industries
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
            Industries We Serve
          </h1>
          <p className="text-xl text-gray-700 mx-auto max-w-3xl">
            Future-proof security, connectivity, and automation—trusted by India's top organizations across verticals.
            <span className="text-indigo-600 font-bold"> Customized for your sector.</span>
          </p>
        </header>

        {/* Industry Feature Cards */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {industryFeatures.map((feature) => (
            <div
              key={feature.title}
              className={`group bg-gradient-to-br ${feature.color} rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition hover:shadow-xl duration-200 flex-1 relative border border-gray-100`}
            >
              {/* Tag */}
              <span className={`absolute right-4 top-4 text-xs px-3 py-1 rounded-full font-semibold ${feature.tagColor} z-10`}>
                {feature.tag}
              </span>
              {/* Icon */}
              <div className="rounded-full w-20 h-20 flex items-center justify-center mb-4 bg-white/70 shadow group-hover:scale-110 transition-transform duration-150">
                {feature.icon}
              </div>
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                {feature.title}
              </h2>
              {/* Description */}
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Section */}
        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-10 py-10">
          <div className="flex-1 bg-gradient-to-br from-indigo-200/60 to-white rounded-2xl p-8 flex flex-col shadow">
            <h3 className="font-black text-2xl text-indigo-800 mb-4 flex items-center gap-2">
              <span>Why Choose Our Solutions?</span>
              <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path d="M12 20v-6m0 0v-2a2 2 0 1 1 4 0v8a2 2 0 1 1-4 0z" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </h3>
            <ul className="list-none space-y-4 text-lg text-gray-800 pt-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1 font-bold">✓</span>
                Proven in diverse, demanding environments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1 font-bold">✓</span>
                Comprehensive—access, CCTV, alarms, automation, and more
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1 font-bold">✓</span>
                Scalable—adaptable for single sites or enterprise-wide
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1 font-bold">✓</span>
                Seamless integration with legacy & new technologies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1 font-bold">✓</span>
                Turnkey support—from planning to maintenance
              </li>
            </ul>
          </div>
          {/* Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/images/industries/industries-illustration.png"
              alt="Industries Illustration"
              className="max-w-xs md:max-w-sm w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      {/* Soft Animation from BiometricSystems (for consistency, optional) */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 18s linear infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Industries;