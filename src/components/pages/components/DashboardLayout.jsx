import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AppBreadcrumb from "./AppBreadcrumb"; // ⚡ path sahi se adjust karna (aapke project ke structure ke hisaab se)

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <Navbar />

        {/* Breadcrumb - just below Navbar */}
        <div className="px-4 sm:px-6 lg:px-8 py-2 bg-white border-b">
          <AppBreadcrumb />
        </div>

        {/* Page Content */}
        <main className="p-4 flex-grow w-full max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
