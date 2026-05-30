import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

// Animated AnnouncementBar / MarqueeBar Component (unchanged)
const AnnouncementBar = () => {
  const announcementText =
    "🎉 Welcome to Network Automation Solutions! | 🚨 Special Offer: Get a free site survey – Contact us today! | 🏆 Trusted by 500+ businesses across India | 💡 For quick enquiry, call us at +91-9876543210";
  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-red-400 py-1 px-2 text-white overflow-hidden text-xs font-medium sticky top-0 z-[70]">
      <div className="relative w-full flex items-center h-6">
        <div
          className="absolute left-0 top-0 w-full h-full overflow-hidden"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="flex items-center h-full animate-marquee whitespace-nowrap"
            style={{
              animation: "marquee-scroller 36s linear infinite",
            }}
          >
            <span className="mx-2">{announcementText}</span>
            <span className="mx-2">{announcementText}</span>
            <span className="mx-2">{announcementText}</span>
          </div>
        </div>
        <span className="sr-only">{announcementText}</span>
      </div>
      <style>
        {`
          @keyframes marquee-scroller {
            0% { transform: translateX(0);}
            100% { transform: translateX(-50%);}
          }
          @media (max-width: 768px) {
            .animate-marquee {
              animation-duration: 28s !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const AnimatedHamburger = ({ open, toggle }) => {
  return (
    <button
      aria-label={open ? "Close menu" : "Open menu"}
      tabIndex={0}
      type="button"
      onClick={toggle}
      className="relative w-9 h-9 rounded flex flex-col items-center justify-center focus:outline-none z-50 group text-red-600"
      style={{ background: "none", minWidth: 0, padding: 0 }}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="relative w-[2.2rem] h-[2.2rem] flex items-center justify-center">
        <RiMenu4Fill
          size={32}
          className={`absolute transition-all duration-300 ${open ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
        />
        <IoMdClose
          size={32}
          className={`absolute transition-all duration-300 ${open ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        />
        {!open && (
          <span
            className="
              absolute left-1/2 -translate-x-1/2 bottom-[-5px]
              h-[0.24rem] bg-red-600 rounded-full w-0 
              group-hover:w-4/5
              transition-all duration-300
            "
            style={{ transition: "all 0.35s cubic-bezier(.4,2,.6,1)" }}
          ></span>
        )}
      </span>
    </button>
  );
};

const useDropdown = (initial = false, delay = 200) => {
  const [open, setOpen] = useState(initial);
  const timeoutRef = useRef(null);

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearTimeoutRef();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearTimeoutRef();
    timeoutRef.current = setTimeout(() => setOpen(false), delay);
  };

  const handleDropdownMouseEnter = handleMouseEnter;
  const handleDropdownMouseLeave = handleMouseLeave;

  const handleToggleClick = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      clearTimeoutRef();
    };
  }, []);

  return {
    open,
    setOpen,
    handleMouseEnter,
    handleMouseLeave,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave,
    handleToggleClick,
  };
};

const useSubDropdown = (initial = false, delay = 200) => {
  const [open, setOpen] = useState(initial);
  const timeoutRef = useRef(null);

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearTimeoutRef();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearTimeoutRef();
    timeoutRef.current = setTimeout(() => setOpen(false), delay);
  };

  const handleToggleClick = (e) => {
    e?.preventDefault?.();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      clearTimeoutRef();
    };
  }, []);

  return { open, handleMouseEnter, handleMouseLeave, handleToggleClick };
};

const Navbar = () => {
  const productDropdown = useDropdown(false, 200);
  const servicesDropdown = useDropdown(false, 200);
  const joinHandDropdown = useDropdown(false, 200);

  // Installation
  const installationSubDropdown = useSubDropdown(false, 200);
  const cctvSubDropdown = useSubDropdown(false, 200);
  const epabxSubDropdown = useSubDropdown(false, 200);

  // Maintenance
  const maintenanceSubDropdown = useSubDropdown(false, 200);
  const annualSubDropdown = useSubDropdown(false, 200);
  const quarterlySubDropdown = useSubDropdown(false, 200);

  // Celebrations
  const celebrationsSubDropdown = useSubDropdown(false, 200);
  const festivalSubDropdown = useSubDropdown(false, 200);
  const rewardsSubDropdown = useSubDropdown(false, 200);

  // Mobile states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileJoinHandOpen, setMobileJoinHandOpen] = useState(false);

  // Mobile sub-dropdowns
  const [mobileInstallationSubOpen, setMobileInstallationSubOpen] = useState(false);
  const [mobileCctvSubOpen, setMobileCctvSubOpen] = useState(false);
  const [mobileEpabxSubOpen, setMobileEpabxSubOpen] = useState(false);
  const [mobileMaintenanceSubOpen, setMobileMaintenanceSubOpen] = useState(false);
  const [mobileAnnualSubOpen, setMobileAnnualSubOpen] = useState(false);
  const [mobileQuarterlySubOpen, setMobileQuarterlySubOpen] = useState(false);
  const [mobileCelebrationsSubOpen, setMobileCelebrationsSubOpen] = useState(false);
  const [mobileFestivalSubOpen, setMobileFestivalSubOpen] = useState(false);
  const [mobileRewardsSubOpen, setMobileRewardsSubOpen] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Desktop Product Dropdown (cctv, epabx dropdowns removed) ---
  const desktopProductDropdownItems = [
    {
      label: "CCTV Surveillance Systems",
      to: "/product/cctv-surveillance",
      sub: null,
    },
    {
      to: "/product/biometric-systems",
      label: "Biometric Systems",
      sub: null,
    },
    {
      to: "/product/networking-solutions",
      label: "Networking Solutions",
      sub: null,
    },
    {
      label: "EPABX Systems",
      to: "/product/epabx",
      sub: null,
    },
    {
      to: "/product/security-solution",
      label: "Security Solutions",
      sub: null,
    },
    {
      to: "/product/home-automation",
      label: "Home Automation",
      sub: null,
    },
  ];

  // --- Mobile Product Dropdown - same as desktop (dropdowns removed for CCTV, EPABX) ---
  const mobileProductDropdownItems = desktopProductDropdownItems;

  const joinHandDropdownItems = [
    {
      to: "/pages/career",
      label: "Career With Us",
    },
    {
      to: "/pages/internship",
      label: "Internship Program",
    },
    {
      to: "/pages/partner-with-us",
      label: "Partner With Us",
    },
    {
      to: "/pages/franchise-opportunity",
      label: "Franchise Opportunity",
    },
    {
      to: "/pages/dealer-registration",
      label: "Dealer Registration",
    },
    {
      to: "/pages/vendor-registration",
      label: "Vendor Registration",
    },
  ];

  // Deep sub-menu data for Installation PICS
  const installationPicsDropdownItems = [
    {
      label: "CCTV",
      sub: [
        { to: "/service/installation-services/industrial/camera", label: "Camera" },
        { to: "/service/installation-services/industrial/dvr", label: "DVR" },
      ],
    },
    {
      label: "EPABX",
      sub: [
        { to: "/service/installation-services/residential/intercom", label: "Intercom" },
        { to: "/service/installation-services/residential/console", label: "Console" },
      ],
    },
    {
      to: "/service/installation-services/office",
      label: "Networking",
    },
    {
      to: "/service/installation-services/office",
      label: "Multiple Product",
    },
  ];

  // Deep sub-menu data for Maintenance PICS
  const maintenancePicsDropdownItems = [
    {
      label: "Annual",
      sub: [
        { to: "/service/maintenance-services/annual/option1", label: "Option 1" },
        { to: "/service/maintenance-services/annual/option2", label: "Option 2" },
      ],
    },
    {
      label: "Quarterly",
      sub: [
        { to: "/service/maintenance-services/quarterly/option1", label: "Option 1" },
        { to: "/service/maintenance-services/quarterly/option2", label: "Option 2" },
      ],
    },
    {
      to: "/service/maintenance-services/emergency",
      label: "Emergency",
    },
  ];

  // Celebrations with deep submenus for 'Festival' and 'Awards & Rewards'
  const celebrationsDropdownItems = [
    {
      label: "Festival",
      sub: [
        { to: "/service/amc-services/festival/holi", label: "Holi" },
        { to: "/service/amc-services/festival/diwali", label: "Diwali" },
      ],
    },
    {
      to: "/service/amc-services/team-party",
      label: "Team Party",
    },
    {
      label: "Awards & Rewards",
      sub: [
        { to: "/service/amc-services/rewards/star-employee", label: "Star Employee" },
        { to: "/service/amc-services/rewards/best-team", label: "Best Team" },
      ],
    },
  ];

  const mobileServicesDropdownItems = [
    {
      to: "/service/installation-services",
      label: "Installation PICS",
      sub: installationPicsDropdownItems,
    },
    {
      to: "/service/maintenance-services",
      label: "Maintenance PICS",
      sub: maintenancePicsDropdownItems,
    },
    {
      to: "/service/amc-services",
      label: "Celebrations",
      sub: celebrationsDropdownItems,
    },
    {
      to: "/service/offshore-support",
      label: "Workplace",
    },
  ];

  return (
    <>
      <AnnouncementBar />
      <nav className="bg-[#f2fbff] shadow-sm sticky top-[31px] md:top-[26px] z-50 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center flex-shrink-0 animate-fade-in-left">
              <Link
                to="/"
                aria-label="Home"
                onClick={handleLogoClick}
                className="flex items-center"
              >
                <img
                  className="h-35 w-35 object-contain transition-transform duration-300 hover:scale-105"
                  src="/logo.png"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* CENTER: Nav links */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-6">
                {/* About - NORMAL LINK, DROPDOWN REMOVED */}
                <Link
                  to="/pages/about"
                  className="hover:text-red-600 text-sm px-2 py-1 relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0s" }}
                >
                  About
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
                </Link>
                {/* Product dropdown (no nested drop for CCTV, EPABX anymore) */}
                <div
                  className="relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.15s" }}
                  onMouseEnter={productDropdown.handleMouseEnter}
                  onMouseLeave={productDropdown.handleMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 hover:text-red-600 text-sm px-2 py-1 relative bg-transparent focus:outline-none"
                    onClick={productDropdown.handleToggleClick}
                  >
                    <span>Product</span>
                    <ChevronDown size={16} />
                    <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  {productDropdown.open && (
                    <div
                      className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in-up"
                      onMouseEnter={productDropdown.handleDropdownMouseEnter}
                      onMouseLeave={productDropdown.handleDropdownMouseLeave}
                    >
                      {desktopProductDropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="block px-3 py-1 text-sm hover:bg-gray-100"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {/* Our Work - removed */}
                <Link
                  to="/pages/services"
                  className="hover:text-red-600 text-sm px-2 py-1 relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.60s" }}
                >
                  Services
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
                </Link>
                {/* Services dropdown with sub-dropdowns */}
                <div
                  className="relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.75s" }}
                  onMouseEnter={servicesDropdown.handleMouseEnter}
                  onMouseLeave={servicesDropdown.handleMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 hover:text-red-600 text-sm px-2 py-1 relative bg-transparent focus:outline-none"
                    onClick={servicesDropdown.handleToggleClick}
                  >
                    <span>Project & People</span>
                    <ChevronDown size={16} />
                    <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  {servicesDropdown.open && (
                    <div
                      className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in-up"
                      onMouseEnter={servicesDropdown.handleDropdownMouseEnter}
                      onMouseLeave={servicesDropdown.handleDropdownMouseLeave}
                    >
                      {/* Installation PICS with dropdown */}
                      <div
                        className="relative group"
                        onMouseEnter={installationSubDropdown.handleMouseEnter}
                        onMouseLeave={installationSubDropdown.handleMouseLeave}
                      >
                        <button
                          className="flex items-center w-full justify-between px-3 py-1 text-sm hover:bg-gray-100"
                          onClick={installationSubDropdown.handleToggleClick}
                          style={{ background: "none", outline: "none" }}
                        >
                          <span>Installation PICS</span>
                          <ChevronDown size={15} className={`ml-1 transition-transform ${installationSubDropdown.open ? "rotate-180" : ""}`} />
                        </button>
                        {installationSubDropdown.open && (
                          <div className="absolute left-full top-0 min-w-[180px] bg-white rounded-lg shadow-lg z-50 py-2 animate-fade-in-up">
                            {/* CCTV with sub-dropdown */}
                            <div
                              className="relative group"
                              onMouseEnter={cctvSubDropdown.handleMouseEnter}
                              onMouseLeave={cctvSubDropdown.handleMouseLeave}
                            >
                              <button
                                className="flex items-center w-full justify-between px-3 py-1 text-sm hover:bg-gray-100"
                                onClick={cctvSubDropdown.handleToggleClick}
                                style={{ background: "none", outline: "none" }}
                              >
                                <span>CCTV</span>
                                <ChevronDown size={13} className={`ml-1 transition-transform ${cctvSubDropdown.open ? "rotate-180" : ""}`} />
                              </button>
                              {cctvSubDropdown.open && (
                                <div className="absolute left-full top-0 min-w-[160px] bg-white rounded-lg shadow-lg z-50 py-2 animate-fade-in-up">
                                  {installationPicsDropdownItems[0].sub.map((subitem) => (
                                    <Link
                                      key={subitem.to}
                                      to={subitem.to}
                                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                                    >
                                      {subitem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                            {/* EPABX with sub-dropdown */}
                            <div
                              className="relative group"
                              onMouseEnter={epabxSubDropdown.handleMouseEnter}
                              onMouseLeave={epabxSubDropdown.handleMouseLeave}
                            >
                              <button
                                className="flex items-center w-full justify-between px-3 py-1 text-sm hover:bg-gray-100"
                                onClick={epabxSubDropdown.handleToggleClick}
                                style={{ background: "none", outline: "none" }}
                              >
                                <span>EPABX</span>
                                <ChevronDown size={13} className={`ml-1 transition-transform ${epabxSubDropdown.open ? "rotate-180" : ""}`} />
                              </button>
                              {epabxSubDropdown.open && (
                                <div className="absolute left-full top-0 min-w-[160px] bg-white rounded-lg shadow-lg z-50 py-2 animate-fade-in-up">
                                  {installationPicsDropdownItems[1].sub.map((subitem) => (
                                    <Link
                                      key={subitem.to}
                                      to={subitem.to}
                                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                                    >
                                      {subitem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                            {/* Networking and Multiple Product: plain links */}
                            <Link
                              to={installationPicsDropdownItems[2].to}
                              className="block px-3 py-1 text-sm hover:bg-gray-100"
                            >
                              Networking
                            </Link>
                            <Link
                              to={installationPicsDropdownItems[3].to}
                              className="block px-3 py-1 text-sm hover:bg-gray-100"
                            >
                              Multiple Product
                            </Link>
                          </div>
                        )}
                      </div>
                      {/* Maintenance PICS with sub-dropdown */}
                      <div
                        className="relative group"
                        onMouseEnter={maintenanceSubDropdown.handleMouseEnter}
                        onMouseLeave={maintenanceSubDropdown.handleMouseLeave}
                      >
                        <button
                          className="flex items-center w-full justify-between px-3 py-1 text-sm hover:bg-gray-100"
                          onClick={maintenanceSubDropdown.handleToggleClick}
                          style={{ background: "none", outline: "none" }}
                        >
                          <span>Maintenance PICS</span>
                          <ChevronDown size={15} className={`ml-1 transition-transform ${maintenanceSubDropdown.open ? "rotate-180" : ""}`} />
                        </button>
                        {maintenanceSubDropdown.open && (
                          <div className="absolute left-full top-0 min-w-[180px] bg-white rounded-lg shadow-lg z-50 py-2 animate-fade-in-up">
                            {/* Annual with sub-dropdown */}
                            <div className="relative group"
                              onMouseEnter={annualSubDropdown.handleMouseEnter}
                              onMouseLeave={annualSubDropdown.handleMouseLeave}
                            >
                              <button
                                className="flex items-center w-full justify-between px-3 py-1 text-sm hover:bg-gray-100"
                                onClick={annualSubDropdown.handleToggleClick}
                                style={{ background: "none", outline: "none" }}
                              >
                                <span>Annual</span>
                                <ChevronDown size={13} className={`ml-1 transition-transform ${annualSubDropdown.open ? "rotate-180" : ""}`} />
                              </button>
                              {annualSubDropdown.open && (
                                <div className="absolute left-full top-0 min-w-[160px] bg-white rounded-lg shadow-lg z-50 py-2 animate-fade-in-up">
                                  {maintenancePicsDropdownItems[0].sub.map((subitem) => (
                                    <Link
                                      key={subitem.to}
                                      to={subitem.to}
                                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                                    >
                                      {subitem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                            {/* Quarterly with sub-dropdown */}
                            <div className="relative group"
                              onMouseEnter={quarterlySubDropdown.handleMouseEnter}
                              onMouseLeave={quarterlySubDropdown.handleMouseLeave}
                            >
                              <button
                                className="flex items-center w-full justify-between px-3 py-1 text-sm hover:bg-gray-100"
                                onClick={quarterlySubDropdown.handleToggleClick}
                                style={{ background: "none", outline: "none" }}
                              >
                                <span>Quarterly</span>
                                <ChevronDown size={13} className={`ml-1 transition-transform ${quarterlySubDropdown.open ? "rotate-180" : ""}`} />
                              </button>
                              {quarterlySubDropdown.open && (
                                <div className="absolute left-full top-0 min-w-[160px] bg-white rounded-lg shadow-lg z-50 py-2 animate-fade-in-up">
                                  {maintenancePicsDropdownItems[1].sub.map((subitem) => (
                                    <Link
                                      key={subitem.to}
                                      to={subitem.to}
                                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                                    >
                                      {subitem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                            {/* Emergency - NO SUBDROPDOWN */}
                            <Link
                              to={maintenancePicsDropdownItems[2].to}
                              className="block px-3 py-1 text-sm hover:bg-gray-100"
                            >
                              Emergency
                            </Link>
                          </div>
                        )}
                      </div>
                      {/* Celebrations with sub-dropdown */}
                      <div
                        className="relative group"
                        onMouseEnter={celebrationsSubDropdown.handleMouseEnter}
                        onMouseLeave={celebrationsSubDropdown.handleMouseLeave}
                      >
                        <button
                          className="flex items-center w-full justify-between px-3 py-1 text-sm hover:bg-gray-100"
                          onClick={celebrationsSubDropdown.handleToggleClick}
                          style={{ background: "none", outline: "none" }}
                        >
                          <span>Celebrations</span>
                          <ChevronDown size={15} className={`ml-1 transition-transform ${celebrationsSubDropdown.open ? "rotate-180" : ""}`} />
                        </button>
                        {celebrationsSubDropdown.open && (
                          <div className="absolute left-full top-0 min-w-[180px] bg-white rounded-lg shadow-lg z-50 py-2 animate-fade-in-up">
                            {/* Festival w/ sub-dropdown */}
                            <div
                              className="relative group"
                              onMouseEnter={festivalSubDropdown.handleMouseEnter}
                              onMouseLeave={festivalSubDropdown.handleMouseLeave}
                            >
                              <button
                                className="flex items-center w-full justify-between px-3 py-1 text-sm hover:bg-gray-100"
                                onClick={festivalSubDropdown.handleToggleClick}
                                style={{ background: "none", outline: "none" }}
                              >
                                <span>Festival</span>
                                <ChevronDown size={13} className={`ml-1 transition-transform ${festivalSubDropdown.open ? "rotate-180" : ""}`} />
                              </button>
                              {festivalSubDropdown.open && (
                                <div className="absolute left-full top-0 min-w-[160px] bg-white rounded-lg shadow-lg z-50 py-2 animate-fade-in-up">
                                  {(celebrationsDropdownItems[0].sub || []).map((subitem) => (
                                    <Link
                                      key={subitem.to}
                                      to={subitem.to}
                                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                                    >
                                      {subitem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                            {/* Team Party - plain link */}
                            <Link
                              to={celebrationsDropdownItems[1].to}
                              className="block px-3 py-1 text-sm hover:bg-gray-100"
                            >
                              Team Party
                            </Link>
                            {/* Awards & Rewards w/ sub-dropdown */}
                            <div
                              className="relative group"
                              onMouseEnter={rewardsSubDropdown.handleMouseEnter}
                              onMouseLeave={rewardsSubDropdown.handleMouseLeave}
                            >
                              <button
                                className="flex items-center w-full justify-between px-3 py-1 text-sm hover:bg-gray-100"
                                onClick={rewardsSubDropdown.handleToggleClick}
                                style={{ background: "none", outline: "none" }}
                              >
                                <span>Awards & Rewards</span>
                                <ChevronDown size={13} className={`ml-1 transition-transform ${rewardsSubDropdown.open ? "rotate-180" : ""}`} />
                              </button>
                              {rewardsSubDropdown.open && (
                                <div className="absolute left-full top-0 min-w-[160px] bg-white rounded-lg shadow-lg z-50 py-2 animate-fade-in-up">
                                  {(celebrationsDropdownItems[2].sub || []).map((subitem) => (
                                    <Link
                                      key={subitem.to}
                                      to={subitem.to}
                                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                                    >
                                      {subitem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <Link
                        to="/service/offshore-support"
                        className="block px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        Workplace
                      </Link>
                    </div>
                  )}
                </div>
                {/* Contact link added after Work */}
                <Link
                  to="/pages/contact"
                  className="hover:text-red-600 text-sm px-2 py-1 relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.63s" }}
                >
                  Contact
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
                </Link>
                {/* Join Hand */}
                <div
                  className="relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.90s" }}
                  onMouseEnter={joinHandDropdown.handleMouseEnter}
                  onMouseLeave={joinHandDropdown.handleMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 hover:text-red-600 text-sm px-2 py-1 relative bg-transparent focus:outline-none"
                    onClick={joinHandDropdown.handleToggleClick}
                  >
                    <span>Join Hand</span>
                    <ChevronDown size={16} />
                    <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  {joinHandDropdown.open && (
                    <div
                      className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in-up"
                      onMouseEnter={joinHandDropdown.handleDropdownMouseEnter}
                      onMouseLeave={joinHandDropdown.handleDropdownMouseLeave}
                    >
                      {joinHandDropdownItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="block px-3 py-1 text-sm hover:bg-gray-100"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {/* Enquiry Now Button - desktop */}
                <Link
                  to="/pages/enquiry-form"
                  className="ml-2 px-3 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-red-400 text-white text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200 animate-stagger-fade-in"
                  style={{ animationDelay: "1s" }}
                >
                  Enquiry Now
                </Link>
                {/* Login Button - desktop (added after Enquiry Now) */}
                <Link
                  to="/login"
                  className="ml-2 px-3 py-0.5 rounded-full border border-red-500 text-red-600 text-sm font-semibold shadow-md hover:bg-red-50 transition-transform duration-200 animate-stagger-fade-in"
                  style={{ animationDelay: "1.1s" }}
                >
                  Login
                </Link>
              </div>
            </div>

            {/* RIGHT: Hamburger */}
            <div className="flex items-center space-x-3 ml-auto animate-fade-in-right">
              <div className="md:hidden flex items-center h-14">
                <AnimatedHamburger
                  open={mobileMenuOpen}
                  toggle={() => setMobileMenuOpen((o) => !o)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white shadow-lg absolute top-16 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? "max-h-[80vh] opacity-100 animate-fade-in" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col px-4 py-4 space-y-2">
            {/* About (mobile) */}
            <Link
              to="/pages/about"
              className="block px-2 py-1 hover:text-red-600 text-sm animate-stagger-fade-in"
              style={{ animationDelay: "0s" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {/* Product (mobile) - NO dropdown for CCTV/EPABX */}
            <div>
              <button
                className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                onClick={() => setMobileProductOpen((v) => !v)}
              >
                <span>Product</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileProductOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  mobileProductOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pl-4">
                  {mobileProductDropdownItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Our Work - removed */}
            <Link
              to="/pages/services"
              className="hover:text-red-600 text-sm px-2 py-1 relative group animate-stagger-fade-in"
              style={{ animationDelay: "0.60s" }}
            >
              Services
              <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
            </Link>
            {/* Services (mobile) dropdown with sub-dropdowns */}
            <div>
              <button
                className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                onClick={() => setMobileServicesOpen((v) => !v)}
              >
                <span>Project & People</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pl-4">
                  {mobileServicesDropdownItems.map((item) =>
                    item.sub ? (
                      <div key={item.label}>
                        <button
                          className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                          onClick={() => {
                            if (item.label === "Installation PICS") setMobileInstallationSubOpen(v => !v);
                            if (item.label === "Maintenance PICS") setMobileMaintenanceSubOpen(v => !v);
                            if (item.label === "Celebrations") setMobileCelebrationsSubOpen(v => !v);
                          }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${
                              (item.label === "Installation PICS" && mobileInstallationSubOpen) ||
                              (item.label === "Maintenance PICS" && mobileMaintenanceSubOpen) ||
                              (item.label === "Celebrations" && mobileCelebrationsSubOpen)
                                ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-all duration-200 ease-in-out ${
                            (item.label === "Installation PICS" && mobileInstallationSubOpen) ||
                            (item.label === "Maintenance PICS" && mobileMaintenanceSubOpen) ||
                            (item.label === "Celebrations" && mobileCelebrationsSubOpen)
                              ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden pl-4">
                            {/* Installation PICS: CCTV/EPABX with sub-submenus */}
                            {item.label === "Installation PICS" ? (
                              <>
                                {/* CCTV */}
                                <div>
                                  <button
                                    className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                                    onClick={() => setMobileCctvSubOpen((v) => !v)}
                                  >
                                    <span>CCTV</span>
                                    <ChevronDown
                                      size={12}
                                      className={`transition-transform ${mobileCctvSubOpen ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                  <div
                                    className={`grid transition-all duration-200 ease-in-out ${
                                      mobileCctvSubOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                  >
                                    <div className="overflow-hidden pl-3">
                                      {(item.sub[0].sub || []).map((subItem) => (
                                        <Link
                                          key={subItem.to}
                                          to={subItem.to}
                                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          {subItem.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {/* EPABX */}
                                <div>
                                  <button
                                    className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                                    onClick={() => setMobileEpabxSubOpen((v) => !v)}
                                  >
                                    <span>EPABX</span>
                                    <ChevronDown
                                      size={12}
                                      className={`transition-transform ${mobileEpabxSubOpen ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                  <div
                                    className={`grid transition-all duration-200 ease-in-out ${
                                      mobileEpabxSubOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                  >
                                    <div className="overflow-hidden pl-3">
                                      {(item.sub[1].sub || []).map((subItem) => (
                                        <Link
                                          key={subItem.to}
                                          to={subItem.to}
                                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          {subItem.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {/* Networking, Multiple Product (plain links) */}
                                <Link
                                  key={item.sub[2].to}
                                  to={item.sub[2].to}
                                  className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  Networking
                                </Link>
                                <Link
                                  key={item.sub[3].to}
                                  to={item.sub[3].to}
                                  className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  Multiple Product
                                </Link>
                              </>
                            ) : item.label === "Maintenance PICS" ? (
                              <>
                                {/* Annual */}
                                <div>
                                  <button
                                    className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                                    onClick={() => setMobileAnnualSubOpen((v) => !v)}
                                  >
                                    <span>Annual</span>
                                    <ChevronDown
                                      size={12}
                                      className={`transition-transform ${mobileAnnualSubOpen ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                  <div
                                    className={`grid transition-all duration-200 ease-in-out ${
                                      mobileAnnualSubOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                  >
                                    <div className="overflow-hidden pl-3">
                                      {(item.sub[0].sub || []).map((subItem) => (
                                        <Link
                                          key={subItem.to}
                                          to={subItem.to}
                                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          {subItem.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {/* Quarterly */}
                                <div>
                                  <button
                                    className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                                    onClick={() => setMobileQuarterlySubOpen((v) => !v)}
                                  >
                                    <span>Quarterly</span>
                                    <ChevronDown
                                      size={12}
                                      className={`transition-transform ${mobileQuarterlySubOpen ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                  <div
                                    className={`grid transition-all duration-200 ease-in-out ${
                                      mobileQuarterlySubOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                  >
                                    <div className="overflow-hidden pl-3">
                                      {(item.sub[1].sub || []).map((subItem) => (
                                        <Link
                                          key={subItem.to}
                                          to={subItem.to}
                                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          {subItem.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {/* Emergency - no subdropdown */}
                                <Link
                                  key={item.sub[2].to}
                                  to={item.sub[2].to}
                                  className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {item.sub[2].label}
                                </Link>
                              </>
                            ) : item.label === "Celebrations" ? (
                              <>
                                {/* Festival dropdown */}
                                <div>
                                  <button
                                    className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                                    onClick={() => setMobileFestivalSubOpen((v) => !v)}
                                  >
                                    <span>Festival</span>
                                    <ChevronDown
                                      size={12}
                                      className={`transition-transform ${mobileFestivalSubOpen ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                  <div
                                    className={`grid transition-all duration-200 ease-in-out ${
                                      mobileFestivalSubOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                  >
                                    <div className="overflow-hidden pl-3">
                                      {(item.sub[0].sub || []).map((subItem) => (
                                        <Link
                                          key={subItem.to}
                                          to={subItem.to}
                                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          {subItem.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                {/* Team Party, plain link */}
                                <Link
                                  key={item.sub[1].to}
                                  to={item.sub[1].to}
                                  className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {item.sub[1].label}
                                </Link>
                                {/* Awards & Rewards dropdown */}
                                <div>
                                  <button
                                    className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                                    onClick={() => setMobileRewardsSubOpen((v) => !v)}
                                  >
                                    <span>Awards & Rewards</span>
                                    <ChevronDown
                                      size={12}
                                      className={`transition-transform ${mobileRewardsSubOpen ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                  <div
                                    className={`grid transition-all duration-200 ease-in-out ${
                                      mobileRewardsSubOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                  >
                                    <div className="overflow-hidden pl-3">
                                      {(item.sub[2].sub || []).map((subItem) => (
                                        <Link
                                          key={subItem.to}
                                          to={subItem.to}
                                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          {subItem.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              // Default for simple arrays
                              item.sub.map((subItem) => (
                                <Link
                                  key={subItem.to}
                                  to={subItem.to}
                                  className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.label}
                                </Link>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.to}
                        className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
            {/* Contact */}
            <Link
              to="/pages/contact"
              className="block px-2 py-1 hover:text-red-600 text-sm animate-stagger-fade-in"
              style={{ animationDelay: "0.33s" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {/* Join Hand Dropdown (Mobile) */}
            <div>
              <button
                className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                onClick={() => setMobileJoinHandOpen((v) => !v)}
              >
                <span>Join Hand</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileJoinHandOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  mobileJoinHandOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pl-4">
                  {joinHandDropdownItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Enquiry Now Button - mobile */}
            <Link
              to="/pages/enquiry-form"
              className="block w-full mt-2 px-3 py-0.5 rounded-full bg-white text-red-600 text-sm font-semibold shadow-md text-center hover:scale-105 hover:shadow-lg transition-transform duration-200"
              style={{ animationDelay: "1s" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Enquiry Now
            </Link>
            {/* Login Button - mobile (added after enquiry) */}
            <Link
              to="/login"
              className="block w-full mt-2 px-3 py-0.5 rounded-full border border-red-500 text-red-600 text-sm font-semibold shadow-md text-center hover:bg-red-50 transition-transform duration-200"
              style={{ animationDelay: "1.1s" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
