import React from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";

export default function DashboardFinance() {
  return (
    <>
      {/* section main app.js */}
      <div className="max-w-full max-h-full min-h-screen">
        <div className="container mx-auto">
          {/* Department Dashboard */}
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto max-w-7x1">
              {/* Finance Head */}
              <div className="flex flex-wrap w-full p-4 mb-4">
                <div className="w-full mb-6 lg:mb-0">
                  <h1 className="mb-2 text-5xl font-bold text-gray-900 sm:text-4xl title-font">
                    Finance
                  </h1>
                  <div className="w-20 h-1 bg-indigo-500 rounded"></div>
                </div>
              </div>
              {/* /Finance Head */}

              {/* Finance Body */}
              <div className="flex-col p-5 border">
                {/* Chart */}
                <div className=" border">
                    <LineChart className=""/>
                </div>
                {/* /Chart */}

                {/* Departemen */}
                <div className='border mt-5'>
                    <div className="flex flex-wrap w-full p-4 mb-4">
                        <div className="w-full mb-6 lg:mb-0">
                        <h1 className="mb-2 text-5xl font-bold text-gray-900 sm:text-4xl title-font">
                            Departemen A
                        </h1>
                        <div className="w-20 h-1 bg-indigo-500 rounded"></div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        {/* Card Pie */}
                        <div className="p-4 border">
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
                        {/* Card Pie */}
                        <div className="p-4 border">
                            <div className="p-6 bg-white rounded-lg">
                                <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                                Budget 2
                                </h2>
                                <PieChart />
                                <p className="mt-2 font-medium text-center">
                                status: unapprove
                                </p>
                            </div>
                        </div>
                        {/* Card Pie */}
                        <div className="p-4 border">
                            <div className="p-6 bg-white rounded-lg">
                                <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                                Budget 3
                                </h2>
                                <PieChart />
                                <p className="mt-2 font-medium text-center">
                                status: unapprove
                                </p>
                            </div>
                        </div>
                        {/* Card Pie */}
                        <div className="p-4 border">
                            <div className="p-6 bg-white rounded-lg">
                                <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                                Budget 4
                                </h2>
                                <PieChart />
                                <p className="mt-2 font-medium text-center">
                                status: unapprove
                                </p>
                            </div>
                        </div>
                        {/* Card Pie */}
                        <div className="p-4 border">
                            <div className="p-6 bg-white rounded-lg">
                                <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                                Budget 5
                                </h2>
                                <PieChart />
                                <p className="mt-2 font-medium text-center">
                                status: unapprove
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Departemen */}

                {/* Departemen */}
                <div className='border mt-5'>
                    <div className="flex flex-wrap w-full p-4 mb-4">
                        <div className="w-full mb-6 lg:mb-0">
                        <h1 className="mb-2 text-5xl font-bold text-gray-900 sm:text-4xl title-font">
                            Departemen B
                        </h1>
                        <div className="w-20 h-1 bg-indigo-500 rounded"></div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        {/* Card Pie */}
                        <div className="p-4 border">
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
                        {/* Card Pie */}
                        <div className="p-4 border">
                            <div className="p-6 bg-white rounded-lg">
                                <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                                Budget 2
                                </h2>
                                <PieChart />
                                <p className="mt-2 font-medium text-center">
                                status: unapprove
                                </p>
                            </div>
                        </div>
                        {/* Card Pie */}
                        <div className="p-4 border">
                            <div className="p-6 bg-white rounded-lg">
                                <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                                Budget 3
                                </h2>
                                <PieChart />
                                <p className="mt-2 font-medium text-center">
                                status: unapprove
                                </p>
                            </div>
                        </div>
                        {/* Card Pie */}
                        <div className="p-4 border">
                            <div className="p-6 bg-white rounded-lg">
                                <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                                Budget 4
                                </h2>
                                <PieChart />
                                <p className="mt-2 font-medium text-center">
                                status: unapprove
                                </p>
                            </div>
                        </div>
                        {/* Card Pie */}
                        <div className="p-4 border">
                            <div className="p-6 bg-white rounded-lg">
                                <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                                Budget 5
                                </h2>
                                <PieChart />
                                <p className="mt-2 font-medium text-center">
                                status: unapprove
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Departemen */}
              </div>
              {/* /Finance Body */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
