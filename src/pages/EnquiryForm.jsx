import { useState } from "react";
import axios from "axios";
import {
  FiMapPin,
  FiSend,
} from "react-icons/fi";

// Sync with enquiry-model.js fields (required + common fields).
const services = [
  "CCTV Installation",
  "IP Camera Setup",
  "Biometric System",
  "Networking",
  "WiFi Setup",
  "Home Automation",
  "Access Control",
  "Website", // default in schema
];

// Project types
const projectTypes = [
  "Home",
  "Office",
  "Shop",
  "Warehouse",
  "Factory",
  "Website", // default in schema
];

// Time options for Preferred Contact Time
const timeOptions = [
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "1:00 PM - 3:00 PM",
  "3:00 PM - 5:00 PM",
  "After 5:00 PM",
  "Anytime",
];

function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    company: "",
    city: "",
    service: "",
    projectType: "",
    cameraCount: "",
    installAddress: "",
    message: "",
    contactTime: "", // Now uses dropdown/select
    location: {
      latitude: "",
      longitude: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nested object handler (location)
    if (name === "latitude" || name === "longitude") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
        // No alert - shows map visually for much better UX
      },
      (error) => {
        console.log(error);
        alert("Location permission denied");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");
      const data = new FormData();

      // Only add backend fields
      Object.keys(formData).forEach((key) => {
        if (key === "location") {
          data.append("location", JSON.stringify(formData.location));
        } else {
          data.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "https://networkautomation-in-234510.hostingersite.com/?utm_source=chatgpt.com/api/v1/enquiry/create",
        data
      );

      setSuccess(response.data.message);

      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        company: "",
        city: "",
        service: "",
        projectType: "",
        cameraCount: "",
        installAddress: "",
        message: "",
        contactTime: "",
        location: {
          latitude: "",
          longitude: "",
        },
      });

    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
        "Failed to submit enquiry"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-6 px-3">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 text-white p-5 text-center">
          <h1 className="text-2xl font-bold mb-1">Get Free Consultation</h1>
          <p className="text-sm text-red-100">
            Fill the enquiry form and our team will contact you soon.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              minLength={3}
              maxLength={100}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
            />
          </div>

          {/* Mobile + Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="9876543210"
                required
                pattern="^[6-9]\d{9}$"
                maxLength={10}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Company (optional)
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              maxLength={150}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
            />
          </div>

          {/* City + Service */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Service
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
              >
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Type + Camera Count */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Project Type
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
              >
                <option value="">Select Type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Camera Count
              </label>
              <input
                type="number"
                name="cameraCount"
                value={formData.cameraCount}
                onChange={handleChange}
                min={0}
                placeholder="e.g. 8"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Installation Address */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Installation Address
            </label>
            <textarea
              name="installAddress"
              value={formData.installAddress}
              onChange={handleChange}
              placeholder="Enter installation address"
              rows="3"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
            />
          </div>

          {/* Requirement Details */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Requirement Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your requirement..."
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
            />
          </div>

          {/* Preferred Contact Time */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Preferred Contact Time
            </label>
            <select
              name="contactTime"
              value={formData.contactTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-red-500"
            >
              <option value="">Select preferred time</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              <FiMapPin />
              Use Current Location
            </button>
            {(formData.location.latitude && formData.location.longitude) && (
              <>
                <div className="mt-3 bg-gray-100 rounded-lg p-3 text-xs">
                  <p>
                    Latitude: {formData.location.latitude}
                  </p>
                  <p>
                    Longitude: {formData.location.longitude}
                  </p>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border">
                  <iframe
                    title="Live Location Map"
                    width="100%"
                    height="250"
                    loading="lazy"
                    allowFullScreen
                    className="rounded-xl"
                    src={`https://maps.google.com/maps?q=${formData.location.latitude},${formData.location.longitude}&z=15&output=embed`}
                  ></iframe>
                </div>
              </>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <FiSend />
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>

          {/* Success */}
          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EnquiryForm;