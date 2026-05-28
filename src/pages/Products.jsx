import React, { useState } from 'react';
import { 
  Search, 
  Phone, 
  Mail, 
  ChevronRight, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Camera, 
  Wifi, 
  Database, 
  Smartphone,
  HardDrive,
  Users,
  Globe,
  Award,
} from 'lucide-react';

// --- Components ---

const Hero = () => (
  <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-16 px-6 lg:px-20 overflow-hidden">
    <div className="max-w-4xl relative z-10">
      <h2 className="text-orange-400 font-semibold uppercase tracking-widest text-sm mb-2">India's Leading Security Distributor</h2>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Find the Right <br />
        <span className="text-white">Security & IT Solution</span>
      </h1>
      <p className="text-blue-100 mb-8 max-w-xl">
        We provide a comprehensive range of surveillance, networking, and IT infrastructure products for your home and business.
      </p>
      <div className="flex w-full max-w-lg shadow-2xl rounded-lg overflow-hidden">
        <input 
          type="text" 
          placeholder="Search for CCTV, Biometrics, Networking..." 
          className="flex-grow p-2 text-gray-800 focus:outline-none bg-white"
        />
        <button className="bg-orange-500 hover:bg-orange-600 px-8 font-bold flex items-center gap-2">
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {[
          { label: "Products", val: "950+" },
          { label: "Brands", val: "100+" },
          { label: "Dealers", val: "200+" },
          { label: "Cities", val: "12+" }
        ].map((stat, i) => (
          <div key={i} className="border-l border-white/20 pl-4">
            <div className="text-2xl font-bold">{stat.val}</div>
            <div className="text-xs text-blue-200">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
    {/* Abstract Background Element */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
  </section>
);

const ProductCard = ({ title, icon: Icon, items }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
        <Icon size={24} />
      </div>
      <h3 className="font-bold text-gray-800">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="text-sm text-gray-600 flex items-center justify-between group cursor-pointer hover:text-blue-600">
          {item}
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </li>
      ))}
    </ul>
    <button className="mt-6 text-xs font-bold text-blue-700 uppercase tracking-tighter flex items-center gap-1 hover:gap-2 transition-all">
      View All <ChevronRight size={12} />
    </button>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-4">{title}</h2>
      <p className="text-gray-500 text-sm mt-1 pl-4">{subtitle}</p>
    </div>
    <button className="text-sm font-semibold text-blue-600 hover:underline">See all categories</button>
  </div>
);

const tabs = [
  { tab: 'All', key: 'All' },
  { tab: 'CCTV Surveillance Systems', key: 'CCTV' },
  { tab: 'Biometric', key: 'Biometric' },
  { tab: 'Networking', key: 'Networking' },
  { tab: 'EPABX', key: 'EPABX' },
  { tab: 'Security Solutions', key: 'SecuritySolutions' },
  { tab: 'Home Automation', key: 'HomeAutomation' },
  { tab: 'Industries We Serve', key: 'IndustriesWeServe' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('All');

  const renderSection = (key) => {
    switch (key) {
      case 'CCTV':
        return (
          <section>
            <SectionHeader 
              title="CCTV & Surveillance" 
              subtitle="Leading the market with high-definition surveillance solutions."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard 
                title="IP Cameras" 
                icon={Camera} 
                items={['2MP IP Bullet', '4MP Dome Camera', 'PTZ Network Camera', 'Fisheye IP Camera']} 
              />
              <ProductCard 
                title="Analog Cameras" 
                icon={ShieldCheck} 
                items={['HD-TVI Cameras', 'HD-CVI Bullet', 'AHD Dome', 'Analog PTZ']} 
              />
              <ProductCard 
                title="Recorders" 
                icon={Server} 
                items={['4 Channel NVR', '8 Channel DVR', 'Hybrid Recorders', 'Cloud Storage Box']} 
              />
              <ProductCard 
                title="Accessories" 
                icon={Cpu} 
                items={['BNC Connectors', 'Power Adapters', 'CCTV Cables', 'Mounting Brackets']} 
              />
            </div>
          </section>
        );
      case 'Biometric':
        return (
          <section>
            <SectionHeader 
              title="Biometric"
              subtitle="Advanced biometric access and authentication solutions."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard 
                title="Fingerprint Scanners"
                icon={ShieldCheck}
                items={['Standalone Devices', 'Readers & Terminals', 'Attendance Machines', 'Multi-Bio Models']} 
              />
              <ProductCard 
                title="Face Recognition"
                icon={Camera}
                items={['Face Recognition Terminals', 'Access Control Devices', 'Time & Attendance', 'Hybrid Models']}
              />
              <ProductCard 
                title="Access Control"
                icon={Cpu}
                items={['Controllers', 'Electromagnetic Locks', 'RFID Card Readers', 'Biometric Panels']}
              />
              <ProductCard 
                title="Biometric Accessories"
                icon={Server}
                items={['Proximity Cards', 'Lanyards', 'Power Supplies', 'Enclosures']}
              />
            </div>
          </section>
        );
      case 'Networking':
        return (
          <section>
            <SectionHeader 
              title="IT & Networking" 
              subtitle="Robust connectivity solutions for small and enterprise businesses."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard 
                title="Switches" 
                icon={Wifi} 
                items={['PoE Switches', 'Managed Switches', 'Gigabit Desktop', 'Fiber Switches']} 
              />
              <ProductCard 
                title="Wireless" 
                icon={Globe} 
                items={['Access Points', 'Outdoor CPE', 'Mesh Wi-Fi', 'Range Extenders']} 
              />
              <ProductCard 
                title="Storage" 
                icon={HardDrive} 
                items={['Surveillance HDD', 'SSD Storage', 'NAS Systems', 'External Drives']} 
              />
              <ProductCard 
                title="Cabling" 
                icon={Database} 
                items={['Cat6 Cables', 'Fiber Optics', 'Patch Panels', 'Network Racks']} 
              />
            </div>
          </section>
        );
      case 'EPABX':
        return (
          <section>
            <SectionHeader 
              title="EPABX"
              subtitle="Modern and legacy telephony systems for business."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard 
                title="Analog EPABX"
                icon={Phone}
                items={['Small Office PBX', 'Large Office PBX', 'Multi-Line PBX', 'Expandable PBX']}
              />
              <ProductCard 
                title="Digital EPABX"
                icon={Server}
                items={['IP PBX Systems', 'Hybrid EPABX', 'Call Center PBX', 'SIP Trunk Systems']}
              />
              <ProductCard 
                title="Intercom Systems"
                icon={Users}
                items={['Audio Intercom', 'Video Intercom', 'Apartment Systems', 'Villa Kits']}
              />
              <ProductCard 
                title="EPABX Accessories"
                icon={Cpu}
                items={['Telephone Sets', 'Line Cards', 'Power Supplies', 'Voice Logger']}
              />
            </div>
          </section>
        );
      case 'SecuritySolutions':
        return (
          <section>
            <SectionHeader 
              title="Security Solutions"
              subtitle="Integrated security for every building and workspace."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard 
                title="Fire Alarm Systems"
                icon={ShieldCheck}
                items={['Conventional Panels', 'Addressable Panels', 'Smoke Detectors', 'Sounder & Strobes']}
              />
              <ProductCard 
                title="Intrusion Alarms"
                icon={Camera}
                items={['Control Panels', 'PIR Sensors', 'Glass-break Sensors', 'Alarm Keypads']}
              />
              <ProductCard 
                title="Video Door Phones"
                icon={Smartphone}
                items={['Basic VDP', 'Touch Screen VDP', 'Multi Apartment VDP', 'Wireless VDP']}
              />
              <ProductCard 
                title="Security Accessories"
                icon={Cpu}
                items={['Burglar Alarms', 'Siren & Hooters', 'Access Cards', 'Contact Sensors']}
              />
            </div>
          </section>
        );
      case 'HomeAutomation':
        return (
          <section>
            <SectionHeader 
              title="Home Automation"
              subtitle="Smart solutions for a connected modern home."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard 
                title="Smart Switches"
                icon={Wifi}
                items={['Wi-Fi Switches', 'Touch Switches', 'Remote Switchboards', 'RF Switches']}
              />
              <ProductCard 
                title="Lighting Control"
                icon={Award}
                items={['Dimmers', 'RGB Controllers', 'Scene Switches', 'Motion Sensors']}
              />
              <ProductCard 
                title="Home Hubs"
                icon={Database}
                items={['Voice Assistants', 'Smart Speakers', 'Hub Controllers', 'App-based Hubs']}
              />
              <ProductCard 
                title="Home Automation Accessories"
                icon={Cpu}
                items={['IR Blasters', 'Smart Plugs', 'Door Sensors', 'Curtain Motors']}
              />
            </div>
          </section>
        );
      case 'IndustriesWeServe':
        return (
          <section>
            <SectionHeader 
              title="Industries We Serve"
              subtitle="Expert solutions tailored for every industry vertical."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard 
                title="Banking & Finance"
                icon={Server}
                items={['ATM Security', 'Branch Surveillance', 'Access Control', 'Fire Detection']}
              />
              <ProductCard 
                title="Education"
                icon={Award}
                items={['Campus Surveillance', 'Smart Classrooms', 'Biometric Attendance', 'PA Systems']}
              />
              <ProductCard 
                title="Retail & Shopping Malls"
                icon={Globe}
                items={['People Counting', 'POS Security', 'Network Solutions', 'Emergency Alarms']}
              />
              <ProductCard 
                title="Healthcare"
                icon={ShieldCheck}
                items={['Hospital Surveillance', 'Access Control', 'Nurse Call Systems', 'Record Management']}
              />
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  // For showing all
  const allSectionsOrder = [
    'CCTV',
    'Biometric',
    'Networking',
    'EPABX',
    'SecuritySolutions',
    'HomeAutomation',
    'IndustriesWeServe'
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Hero />
      
      {/* Category Tabs */}
      <div className="flex gap-4 overflow-x-auto py-4 px-6 lg:px-20 border-b scrollbar-hide">
        {tabs.map((tabItem) => (
          <button 
            key={tabItem.key}
            onClick={() => setActiveTab(tabItem.key)}
            className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tabItem.key 
                ? 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tabItem.tab}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        {activeTab === 'All'
          ? allSectionsOrder.map((key) => (
              <React.Fragment key={key}>{renderSection(key)}</React.Fragment>
            ))
          : renderSection(activeTab)
        }
      </main>
    </div>
  );
}