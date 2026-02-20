import { Link } from "react-router-dom";
import { GreatorIcon } from "../../assets/svg/SvgIcons";

export default function Breadcrumb({ pageTitle, pagePath = "#", subTitle }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle}
      </h2>

      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500"
            >
              Home
              <GreatorIcon />
            </Link>
          </li>

          <li className="inline-flex items-center gap-1.5 text-sm">
            {subTitle ? (
              <>
                <Link
                  to={pagePath}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500"
                >
                  {pageTitle}
                  <GreatorIcon />
                </Link>
              </>
            ) : (
              <span className="text-gray-800 dark:text-white/90">
                {pageTitle}
              </span>
            )}
          </li>

          {subTitle && <li className="text-sm text-gray-500">{subTitle}</li>}
        </ol>
      </nav>
    </div>
  );
}
