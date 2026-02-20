import React from "react";
export default function Dashboard() {

  return (
    <>
      <div className="p-6">
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Overview of platform statistics
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* CARD */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Games
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              128
            </h2>
            <p className="mt-1 text-xs text-green-500">+12 this month</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Users
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              24,560
            </h2>
            <p className="mt-1 text-xs text-green-500">+320 today</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active Users
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              18,230
            </h2>
            <p className="mt-1 text-xs text-gray-400">75% active</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              New Users
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              145
            </h2>
            <p className="mt-1 text-xs text-gray-400">Today</p>
          </div>
        </div>
      </div>
    
    </>
  );
}
