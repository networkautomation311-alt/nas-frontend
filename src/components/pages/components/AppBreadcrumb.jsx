import { Link, useLocation } from "react-router-dom";

function AppBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  function formatSegment(seg) {
    return seg
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Always show at least 'Home'
  return (
    <nav
      className="flex items-center px-4 py-2 rounded-lg dark:bg-gray-900"
      aria-label="Breadcrumb"
    >
      <ol className="flex space-x-2 w-full">
        <li className="flex items-center">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600 transition font-medium text-base"
          >
            Home
          </Link>
        </li>
        {pathnames.map((segment, idx) => {
          const to = "/" + pathnames.slice(0, idx + 1).join("/");
          const isLast = idx === pathnames.length - 1;
          return (
            <li
              key={to}
              className="flex items-center"
            >
              <svg
                className="mx-2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {isLast ? (
                <span className="text-blue-700 font-semibold text-base cursor-default">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link
                  to={to}
                  className="text-gray-600 hover:text-blue-600 transition font-medium text-base"
                >
                  {formatSegment(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default AppBreadcrumb;
