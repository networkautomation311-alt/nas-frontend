import React, { useState } from 'react';
import { Camera, Phone, Network, Wrench, LayoutGrid } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'CCTV Installation - Anuj Gupta Ji',
    category: 'CCTV',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'CHOLAMANDALAM Office',
    category: 'CCTV',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'Hotel Metro EPABX System',
    category: 'EPABX',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    title: 'Swastik Coal Installation',
    category: 'EPABX',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    title: 'Multiple Products Networking',
    category: 'Networking',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    title: 'CCTV Maintenance - RED Moments',
    category: 'Maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
  },
];

const CATEGORIES = [
  { name: 'All Work', icon: LayoutGrid },
  { name: 'CCTV', icon: Camera },
  { name: 'EPABX', icon: Phone },
  { name: 'Networking', icon: Network },
  { name: 'Maintenance', icon: Wrench },
];

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All Work');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects =
    activeFilter === 'All Work'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-red-100 font-sans selection:bg-red-100 selection:text-red-900">
      {/* Redesigned Header */}
      <header className="bg-gradient-to-r from-red-900 to-red-700 py-20 px-4 relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-3 tracking-tight">
              Our Work <span className="text-red-300">Showcase</span>
            </h1>
            <p className="text-lg text-red-100 font-medium">
              Explore the quality and diversity of projects we've delivered – installation, maintenance, networks, and more!
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=700&q=80"
              alt="Gallery header"
              className="w-[220px] h-[140px] object-cover rounded-2xl shadow-2xl border-4 border-red-300"
            />
          </div>
        </div>
      </header>

      {/* Category/Filter Tabs - pill style, fancy indicator */}
      <section className="max-w-4xl mx-auto -mt-8 px-4 relative z-10">
        <div className=" rounded-2xl flex justify-center gap-2 py-10 px-2 flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.name;
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveFilter(cat.name);
                  setActiveProject(null);
                }}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-lg text-base font-semibold outline-none transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-xl scale-105 ring-2 ring-red-300'
                    : 'bg-red-50 text-red-900 hover:bg-red-100'
                  }`}
                style={{ minWidth: 120 }}
              >
                <Icon size={19} className={`${isActive ? "text-white" : "text-red-700"}`} />
                <span>{cat.name}</span>
                {isActive && (
                  <span className="absolute -bottom-[2px] left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-lg"></span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Project Gallery Grid */}
      <section className="max-w-6xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative group bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-red-100 transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => setActiveProject(project)}
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
            >
              <div className="overflow-hidden aspect-[4/3] relative bg-gradient-to-tr from-red-100 to-red-300">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={e => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 text-xs font-bold text-red-700 uppercase border border-red-200 shadow-sm">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-red-900 mb-1 line-clamp-2 min-h-[2.8rem]">
                  {project.title}
                </h3>
                <p className="text-sm text-red-400 font-medium mb-2">
                  Project #{project.id}
                </p>
                <button
                  className="mt-2 transition-all bg-gradient-to-r from-red-700 to-red-600 text-white font-bold px-5 py-2 rounded-lg shadow hover:from-red-600 hover:to-red-500 hover:scale-105"
                  onClick={e => {
                    e.stopPropagation();
                    setActiveProject(project);
                  }}
                >
                  View Details
                </button>
              </div>
              <div className="absolute inset-0 group-hover:bg-red-800/5 transition"></div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-lg text-red-500 font-semibold">
            इस category में कोई projects नहीं मिले।
          </div>
        )}
      </section>

      {/* Project Detail Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8 relative animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-red-400 hover:text-red-900 transition text-xl font-bold"
              onClick={() => setActiveProject(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={activeProject.imageUrl}
              alt={activeProject.title}
              className="w-full h-56 object-cover rounded-xl mb-6 border border-red-100"
              onError={e => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
            <h2 className="text-2xl font-bold mb-2 text-red-900">{activeProject.title}</h2>
            <div className="mb-3">
              <span className="inline-block px-4 py-1 bg-red-50 text-red-700 text-xs font-extrabold rounded uppercase">
                {activeProject.category}
              </span>
            </div>
            <p className="text-red-600 text-lg font-medium mb-3">
              {activeProject.title} Project Details...
            </p>
            <div className="text-sm text-red-400">Project ID: {activeProject.id}</div>
          </div>
        </div>
      )}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.30s cubic-bezier(.27,.9,.52,1.47); }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(32px) scale(0.90);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
      `}</style>
    </div>
  );
};

export default Work;