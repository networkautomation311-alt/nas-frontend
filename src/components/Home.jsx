import Hero from "./Hero";
import CctvServices from "./CctvServices";
import WhyChooseUs from "./About/WhyChooseUs";
import CctvLandingPage from "./CctvLandingPage";
import NasVisionCctvCamera from "./NasVisionCctvCamera";
import CompanyOverview from "./CompanyOverview";
import TypeCctvInstallation from "./TypeCctvInstallation";
import HappyCustomer from "./HappyCustomer";
import TrustPartner from "./TrustPartner";

const Home = () => {
  return (
    <div>
      {/* Home page main hero add kiya gaya hai */}
      <Hero />
      {/* CCTV Landing Page Section */}
      <CctvLandingPage />
      <CompanyOverview />
      <NasVisionCctvCamera/>
      {/* Add content for the Home page here */}
      {/* <NasVisionCctvCamera /> */}
      <WhyChooseUs />
      <CctvServices />
      {/* TypeCctvInstallation Section */}
      <TypeCctvInstallation />
      {/* Happy Customers Section */}
      <HappyCustomer />
      {/* Partners Section */}
      <TrustPartner />
    </div>
  );
};

export default Home;