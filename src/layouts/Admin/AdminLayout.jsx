import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../pages/admin/sidebar/Sidebar";
import Navbar from "../../pages/admin/navbar/Navbar";

export default function AdminLayout() {
  const { isExpanded, isHovered, isMobile } = useSelector(
    (state) => state.sidebar
  );

  const expanded = isMobile ? false : isExpanded || isHovered;

  return (
    <div className="xl:flex min-h-screen">
      <Sidebar />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          expanded ? "lg:ml-[290px]" : "lg:ml-[90px]"
        }`}
      >
        <Navbar />

        <main className="overflow-hidden p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
