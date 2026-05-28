import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiUser,
  FiSettings,
  FiInfo,
  FiLogOut,
  FiSun,
  FiMoon,
  FiMoreVertical,
} from "react-icons/fi";

// 💡 Custom Monitor Icon for "Auto" theme mode
function CustomMonitorIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

// 💡 Profile Dropdown Component (Animated)
function ProfileDropdown({ show, userName, userEmail, onClose, onLogout, navigate }) {
  return (
    <div
      className={`absolute right-0 top-14 bg-white shadow-lg rounded-xl w-72 py-4 border border-gray-200 z-50 transition-all duration-300 transform
        ${show ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
      `}
      style={{ transitionProperty: "opacity, transform" }}
    >
      <div className="px-6 pb-3 border-b border-gray-100">
        <div className="font-semibold text-gray-800">{userName}</div>
        <div className="text-sm text-gray-500">{userEmail}</div>
      </div>

      <div className="flex flex-col gap-1 px-2 mt-2">
        <button
          onClick={() => {
            onClose();
            navigate("/dashboard/settings/profile");
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
        >
          <FiUser className="text-xl" />
          Edit profile
        </button>

        <button
          onClick={() => {
            onClose();
            navigate("/dashboard/settings");
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
        >
          <FiSettings className="text-xl" />
          Account settings
        </button>

        <button
          onClick={() => {
            onClose();
            navigate("/dashboard/support");
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
        >
          <FiInfo className="text-xl" />
          Support
        </button>
      </div>

      <hr className="my-3 border-gray-200" />

      <div className="px-2">
        <button
          onClick={() => {
            onClose();
            onLogout();
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 w-full transition-colors duration-200"
        >
          <FiLogOut className="text-xl" />
          Sign out
        </button>
      </div>
    </div>
  );
}

// ThreeDot Menu for mobile: shows Avatar in dropdown (Animated)
function ThreeDotMenu({
  open,
  setOpen,
  userImage,
  userName,
  userEmail,
  onClose,
  onLogout,
  navigate,
}) {
  const dotMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dotMenuRef.current && !dotMenuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return (
    <div className="relative sm:hidden" ref={dotMenuRef}>
      <button
        onClick={() => setOpen(o => !o)}
        className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none transition-all duration-200"
        aria-label="Open user menu"
      >
        <FiMoreVertical className={`text-2xl transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
      </button>
      {/* Dropdown with avatar and menu */}
      <div
        className={`absolute right-0 top-12 bg-white shadow-lg rounded-xl w-72 py-4 border border-gray-200 z-50 transition-all duration-300 transform
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
        style={{ transitionProperty: "opacity, transform" }}
      >
        <div className="flex flex-col items-center pb-3 border-b border-gray-100">
          <img
            src={userImage}
            alt={userName}
            className="h-14 w-14 rounded-full object-cover border border-gray-200 mb-2 transition-all duration-300"
          />
          <div className="font-semibold text-gray-800">{userName}</div>
          <div className="text-sm text-gray-500">{userEmail}</div>
        </div>
        <div className="flex flex-col gap-1 px-2 mt-2">
          <button
            onClick={() => {
              setOpen(false);
              navigate("/dashboard/settings/profile");
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
          >
            <FiUser className="text-xl" />
            Edit profile
          </button>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/dashboard/settings");
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
          >
            <FiSettings className="text-xl" />
            Account settings
          </button>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/dashboard/support");
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors duration-200"
          >
            <FiInfo className="text-xl" />
            Support
          </button>
        </div>
        <hr className="my-3 border-gray-200" />
        <div className="px-2">
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 w-full transition-colors duration-200"
          >
            <FiLogOut className="text-xl" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // user avatar menu (desktop)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [dotMenuOpen, setDotMenuOpen] = useState(false); // mobile three dot

  const dropdownRef = useRef(null);
  const themeMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get user info from localStorage safely
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  })();

  const userName = user?.name || "Guest User";
  const userEmail = user?.email || "guest@example.com";
  const userImage = user?.photoURL || "/image/profile.png";

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ Theme handling (light / dark / auto)
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "auto");

  useEffect(() => {
    const mode =
      theme === "auto"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Close menus on outside click (desktop avatar/thememenu)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setMenuOpen(false);
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) setThemeMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeOptions = [
    { value: "light", label: "Light", icon: <FiSun className="mr-2" /> },
    { value: "dark", label: "Dark", icon: <FiMoon className="mr-2" /> },
    {
      value: "auto",
      label: "Auto",
      icon: <CustomMonitorIcon className="mr-2" style={{ width: 20, height: 20 }} />,
    },
  ];

  const links = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Settings", to: "/dashboard/settings" },
  ];

  return (
    <div className="px-4 py-3 border-b bg-white sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side links (hidden on mobile) */}
        <nav className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              className={`text-base font-medium transition-colors duration-200 ${
                location.pathname.startsWith(link.to)
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-3 relative ml-auto">
          {/* 🌗 Theme Switch */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setThemeMenuOpen((open) => !open)}
              className={`h-9 w-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors duration-200 transform transition-transform ${
                themeMenuOpen ? "scale-110" : "scale-100"
              }`}
            >
              {theme === "light" ? (
                <FiSun className="text-xl text-yellow-400 animate-spin-slow" />
              ) : theme === "dark" ? (
                <FiMoon className="text-xl text-gray-700 animate-pulse" />
              ) : (
                <CustomMonitorIcon style={{ width: 20, height: 20 }} />
              )}
            </button>

            <div
              className={`absolute right-0 top-12 bg-white border rounded-lg shadow-lg w-32 z-40 transition-all duration-300 transform
                ${themeMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
              `}
              style={{ transitionProperty: "opacity, transform" }}
            >
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setTheme(opt.value);
                    setThemeMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                    theme === opt.value ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 👤 User Avatar: Desktop only (Animated Dropdown) */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className={`flex items-center bg-transparent focus:outline-none transition-transform duration-200 ${menuOpen ? "scale-105" : ""}`}
            >
              <img
                src={userImage}
                alt={userName}
                className="h-10 w-10 rounded-full object-cover border border-gray-200 transition-shadow duration-300 hover:shadow-lg"
              />
            </button>
            <ProfileDropdown
              show={menuOpen}
              userName={userName}
              userEmail={userEmail}
              onClose={() => setMenuOpen(false)}
              onLogout={handleLogout}
              navigate={navigate}
            />
          </div>

          {/* Three Dot Menu: Mobile only (Animated) */}
          <ThreeDotMenu
            open={dotMenuOpen}
            setOpen={setDotMenuOpen}
            userImage={userImage}
            userName={userName}
            userEmail={userEmail}
            onClose={() => setDotMenuOpen(false)}
            onLogout={handleLogout}
            navigate={navigate}
          />

        </div>
      </div>
      {/* ✨ Animations CSS for custom effects */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .animate-spin-slow {
            animation: spin-slow 2.5s linear infinite;
          }
          @keyframes pulse {
            0% { opacity: 1;}
            50% { opacity: .6;}
            100% { opacity: 1;}
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;
          }
        `}
      </style>
    </div>
  );
}
