import { useState } from "react";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

// Redesigned Social Icon
const SocialIcon = ({ href, label, color, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-red-100 hover:border-red-400 transition-all duration-300"
    style={{ color }}
  >
    {children}
  </a>
);

const footerNav = [
  {
    title: "Company",
    links: [
      { text: "About NAS", href: "/pages/about" },
      { text: "Our Services", href: "/pages/services" },
      { text: "Careers", href: "/pages/careers" },
      { text: "Why Choose Us", href: "/pages/why-us" },
    ],
  },
  {
    title: "Security Solutions",
    links: [
      { text: "CCTV Solutions", href: "/product/cctv-surveillance" },
      { text: "Video Door Phones", href: "/product/video-door-phone" },
      { text: "Biometric Systems", href: "/product/biometric-systems" },
      { text: "Alarm Systems", href: "/product/alarm-system" },
    ],
  },
  {
    title: "IT & Networking",
    links: [
      { text: "WiFi Networking", href: "/product/wifi-networking" },
      { text: "EPABX Solutions", href: "/product/epabx" },
      { text: "Server Installation", href: "/product/server-installation" },
      { text: "AMC Support", href: "/service/amc-services" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { text: "Contact Us", href: "/pages/contact" },
      { text: "Customer Support", href: "/support/customer-support" },
      { text: "Privacy Policy", href: "/support/privacy-policy" },
      { text: "Terms & Conditions", href: "/support/terms-condition" },
    ],
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    color: "#1877F2",
    icon: <FaFacebookF size={16} />,
  },
  {
    href: "https://www.twitter.com/",
    label: "Twitter",
    color: "#1DA1F2",
    icon: <FaTwitter size={16} />,
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    color: "#0A66C2",
    icon: <FaLinkedinIn size={16} />,
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    color: "#E4405F",
    icon: <FaInstagram size={16} />,
  },
];

// Hide hover gradient, use subtle red instead on hover
const linkClass =
  "text-gray-600 text-sm font-medium transition-colors duration-300 hover:text-red-600";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/newsletter/subscribe",
        { email }
      );
      if (response.data && response.data.success) {
        alert("Subscribed Successfully 🚀");
        setEmail("");
      } else {
        alert((response.data && response.data.message) || "Something went wrong");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-neutral-50 text-black border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Top info & navigation */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 border-b border-gray-200 pb-10">
          <div className="md:w-1/3 flex-shrink-0 mb-8 md:mb-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-black tracking-tight">
              Network Automation Solutions
            </h2>
            <div className="text-red-600 font-semibold text-xs sm:text-sm mb-3">
              30+ Years Experience in CCTV & IT Solutions
            </div>
            <div className="text-gray-700 text-xs sm:text-sm mb-6 pr-2 max-w-md">
              Network Automation Solutions is a leading Home Automation & Security System company in Indore providing CCTV, Video Door Phone, EPABX, WiFi Networking, Smart Lighting & Security Solutions with Sales, Installation & AMC support since 2001.
            </div>
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.label}
                  href={social.href}
                  label={social.label}
                  color={social.color}
                >
                  {social.icon}
                </SocialIcon>
              ))}
            </div>
          </div>
          {/* Nav links 4 columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
            {footerNav.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-widest mb-3 text-black">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className={linkClass}>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 flex flex-col md:flex-row md:justify-between md:items-center gap-8 border-b border-gray-200 pb-8">
          <div>
            <div className="text-xl font-bold mb-1 text-black">
              Subscribe Newsletter
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">
              Get latest updates about CCTV, Networking & Smart Security Solutions.
            </div>
          </div>
          <form className="w-full max-w-md" onSubmit={handleSubscribe}>
            <div className="flex overflow-hidden rounded-full border border-gray-300 bg-white">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 sm:py-3 border-none text-xs sm:text-sm outline-none bg-transparent"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <button
                className="bg-red-600 text-white px-6 text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-red-700"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Subscribe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;