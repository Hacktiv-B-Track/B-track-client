import React from "react";
import PieChart from "../components/PieChart";

export default function DashboardDepartment() {
  return (
    <>
      {/* section main app.js */}
      <div className="max-w-full max-h-full min-h-screen bg-gray-400">
        <div className="container mx-auto">
          {/* Department Dashboard */}
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto max-w-7x1">
              <div className="flex flex-wrap w-full p-4 mb-4">
                <div className="w-full mb-6 lg:mb-0">
                  <h1 className="mb-2 text-5xl font-bold text-gray-900 sm:text-4xl title-font">
                    Department name
                  </h1>
                  <div className="w-20 h-1 bg-indigo-500 rounded"></div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                {/* Card Pie */}
                <div className="p-4 xl:w-1/3 md:w-1/2">
                  <div className="p-6 bg-white rounded-lg">
                    <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                      Budget 1
                    </h2>
                    <PieChart />
                    <p className="mt-2 font-medium text-center">
                      status: unapprove
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
