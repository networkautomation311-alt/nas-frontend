import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
// import Work from "./pages/Work"; // Removed as per instruction
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import EnquiryForm from "./pages/EnquiryForm";
import Enquiry from "./components/pages/dashboard/Enquiry";
import CCTVSurveillance from "./components/product/CCTVSurveillance";
import BiometricSystems from "./components/product/BiometricSystems";
import NetworkingSolutions from "./components/product/NetworkingSolutions";
import Epabx from "./components/product/Epabx";
import SecuritySolution from "./components/product/SecuritySolution";
import HomeAutomation from "./components/product/HomeAutomation";
import Industries from "./components/product/Industries";
import VideoDoorPhone from "./components/product/VideoDoorPhone";
import AlarmSystem from "./components/product/AlarmSystem";
import WifiNetworking from "./components/product/WifiNetworking";
import ServerInstallation from "./components/product/ServerInstallation";

import InstallationServices from "./components/service/InstallationServices";
import MaintenanceServices from "./components/service/MaintenanceServices";
import AmcServices from "./components/service/AmcServices";
import OffshoreSupport from "./components/service/OffshoreSupport";
import FmsServices from "./components/service/FmsServices";
import OurProcess from "./components/service/OurProcess";

import PrivacyPolicy from "./components/support/PrivacyPolicy";
import CustomerSupport from "./components/support/CustomerSupport";
import TermsCondition from "./components/support/TermsCondition";

import Profile from "./components/pages/dashboard/settings/Profile";
import Support from "./components/pages/dashboard/Support";
import Security from "./components/pages/dashboard/settings/Security";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import TwoFa from "./components/auth/TwoFa";
import DashboardLayout from "./components/pages/components/DashboardLayout";
import Dashboard from "./components/pages/Dashboard";
import Settings from "./components/pages/dashboard/Settings";
import Users from "./components/pages/dashboard/Users";
import Blogs from "./components/pages/dashboard/Blogs";
import Project from "./components/pages/dashboard/Project";
import Category from "./components/pages/dashboard/Category";
import Department from "./components/pages/dashboard/Department";
import Customer from "./components/pages/dashboard/Customer";
import Client from "./components/pages/dashboard/Client";
import ClientHistory from "./components/pages/dashboard/ClientHistory";
import ServiceCall from "./components/pages/dashboard/ServiceCall";
import CallSlip from "./components/pages/dashboard/CallSlip";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import IncomeSheet from "./components/pages/dashboard/IncomeSheet";
import Invoice from "./components/pages/dashboard/Invoice";
import Order from "./components/pages/dashboard/Order";
import Payment from "./components/pages/dashboard/Payment";
import Expense from "./components/pages/dashboard/Expense";
import ExpenseCategory from "./components/pages/dashboard/ExpenseCategory";

// The following imports are for component usage only, not for direct routing
// Removed generateInvoicePdf from routing and only keep for usage in code if needed
import InvoiceModal from "./components/pages/dashboard/InvoiceModal";
// StatusMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import StatusMaster from "./components/pages/dashboard/StatusMaster";
// CallMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import TechnicianMaster from "./components/pages/dashboard/TechnicianMaster";
// CallMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import CallMaster from "./components/pages/dashboard/CallMaster";
// VenderMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import VenderMaster from "./components/pages/dashboard/VenderMaster";
// CallUrgency import (frontend usage; e.g., for API integration helpers or context if exists)
import CallUrgency from "./components/pages/dashboard/CallUrgency";
// ProblemMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import ProblemMaster from "./components/pages/dashboard/ProblemMaster";
// ItemTypeMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import ItemTypeMaster from "./components/pages/dashboard/ItemTypeMaster";
// SupportPeriodMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import SupportPeriodMaster from "./components/pages/dashboard/SupportPeriodMaster";
// DesignationMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import DesignationMaster from "./components/pages/dashboard/DesignationMaster";
// EndUserMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import EndUserMaster from "./components/pages/dashboard/EndUserMaster";
// DivisionMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import DivisionMaster from "./components/pages/dashboard/DivisionMaster";
// CallTypeMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import CallTypeMaster from "./components/pages/dashboard/CallTypeMaster";
// CallNatureMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import CallNatureMaster from "./components/pages/dashboard/CallNatureMaster";
// InstrumentMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import InstrumentMaster from "./components/pages/dashboard/InstrumentMaster";
// EmployeeMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import EmployeeMaster from "./components/pages/dashboard/EmployeeMaster";
// CustomerMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import CustomerMaster from "./components/pages/dashboard/CustomerMaster";
// CustomerTypeMaster import (frontend usage; e.g., for API integration helpers or context if exists)
import CustomerTypeMaster from "./components/pages/dashboard/CustomerTypeMaster";
// MasterManagement import (frontend usage; e.g., for API integration helpers or context if exists)
import MasterManagement from "./components/pages/dashboard/MasterManagement";
// AllMktWork import (frontend usage; e.g., for API integration helpers or context if exists)
import AllMktWork from "./components/pages/dashboard/AllMktWork";
// Misc import (frontend usage; e.g., for API integration helpers or context if exists)
import Misc from "./components/pages/dashboard/Misc";
// All Service import (frontend usage; e.g., for API integration helpers or context if exists)
import AllService from "./components/pages/dashboard/AllService";
// CallEntryForm import (frontend usage; e.g., for API integration helpers or context if exists)
import CallEntryForm from "./components/pages/dashboard/CallEntryForm";
// CallEntryForm import (frontend usage; e.g., for API integration helpers or context if exists)
import CallsAssigningForm from "./components/pages/dashboard/CallsAssigningForm";
// Plan To Action import (frontend usage; e.g., for API integration helpers or context if exists)
import PlanToAction from "./components/pages/dashboard/PlanToAction";
// Cross Check Form import (frontend usage; e.g., for API integration helpers or context if exists)
import CrossCheckForm from "./components/pages/dashboard/CrossCheckForm";
// CallEntryForm import (frontend usage; e.g., for API integration helpers or context if exists)
// import DailyCallsSheet from "./components/pages/dashboard/DailyCallsSheet";
function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");
  const hideFooter = location.pathname.startsWith("/dashboard");

  return (
    <>
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pages/about" element={<About />} />
        {/* <Route path="/pages/work" element={<Work />} /> */} {/* Removed as per instruction */}
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/pages/services" element={<Services />} />
        <Route path="/pages/enquiry-form" element={<EnquiryForm />} />

        {/* Product Routes */}
        <Route path="/product/cctv-surveillance" element={<CCTVSurveillance />} />
        <Route path="/product/biometric-systems" element={<BiometricSystems />} />
        <Route path="/product/networking-solutions" element={<NetworkingSolutions />} />
        <Route path="/product/epabx" element={<Epabx />} />
        <Route path="/product/security-solution" element={<SecuritySolution />} />
        <Route path="/product/home-automation" element={<HomeAutomation />} />
        <Route path="/product/industries" element={<Industries />} />
        <Route path="/product/video-door-phone" element={<VideoDoorPhone />} />
        <Route path="/product/alarm-system" element={<AlarmSystem />} />
        <Route path="/product/wifi-networking" element={<WifiNetworking />} />
        <Route path="/product/server-installation" element={<ServerInstallation />} />

        {/* Service Routes */}
        <Route path="/service/installation-services" element={<InstallationServices />} />
        <Route path="/service/maintenance-services" element={<MaintenanceServices />} />
        <Route path="/service/amc-services" element={<AmcServices />} />
        <Route path="/service/offshore-support" element={<OffshoreSupport />} />
        <Route path="/service/fms-services" element={<FmsServices />} />
        <Route path="/service/our-process" element={<OurProcess />} />

        {/* Support Routes */}
        <Route path="/support/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/support/customer-support" element={<CustomerSupport />} />
        <Route path="/support/terms-condition" element={<TermsCondition />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/twofa" element={<TwoFa />} />

        {/* Dashboard Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings/security"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Security />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/support"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Support />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/customer"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Customer />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/client"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Client />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/client-history"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ClientHistory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/blogs"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Blogs />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/project"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Project />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/category"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Category />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/department"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Department />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/service-call"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ServiceCall />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/callslip"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CallSlip />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/income-sheet"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <IncomeSheet />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/invoice"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Invoice />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/order"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Order />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/payment"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Payment />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/expense"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Expense />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/expense-category"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ExpenseCategory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/enquiry"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Enquiry />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/invoice-modal"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <InvoiceModal />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/status-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <StatusMaster />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/technician-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TechnicianMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/call-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CallMaster />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/vender-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <VenderMaster />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/call-urgency"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CallUrgency/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/problem-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProblemMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/item-type-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ItemTypeMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/support-period-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SupportPeriodMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/designation-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DesignationMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/end-user-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EndUserMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/division-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DivisionMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/call-type-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CallTypeMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/call-nature-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CallNatureMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/instrument-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <InstrumentMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/employee-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EmployeeMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/customer-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CustomerMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/customer-type-master"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CustomerTypeMaster/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/master-management"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MasterManagement/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/all-mkt-work"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AllMktWork/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/misc"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Misc/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/all-service"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AllService/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/call-entry-form"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CallEntryForm/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/calls-assigning-form"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CallsAssigningForm/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/dashboard/plan-to-action"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <PlanToAction/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/cross-check-form"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CrossCheckForm/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/dashboard/daily-calls-sheet"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DailyCallsSheet/>
              </DashboardLayout>
            </ProtectedRoute>
          }
        /> */}
        {/* 
          Note: Removed the route for generateInvoicePdf as it is not a React component.
          If you need to use generateInvoicePdf, call it from a component instead.
        */}
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
