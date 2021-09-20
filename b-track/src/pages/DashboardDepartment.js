import React from "react";
import PieChart from "../components/PieChart";
import { toggleModalFormDetail } from "../store/action";
import { useDispatch } from "react-redux";
import FormBudgetModal from "../components/FormBudgetModal";
import InvoiceModal from "../components/InvoiceModal";

export default function DashboardDepartment() {
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(toggleModalFormDetail(true));
  };

  return (
    <>
      {/* section main app.js */}
      <div className="max-w-full max-h-full min-h-screen">
        <div className="container mx-auto">
        <FormBudgetModal name="add" />
        <InvoiceModal image="https://images.unsplash.com/photo-1628191137573-dee64e727614?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />

          {/* Department Dashboard */}
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto max-w-7x1">

              {/* Departemen Head */}
              <div className="flex flex-wrap w-full p-4 mb-4">
                <div className="w-full mb-6 lg:mb-0">
                  <h1 className="mb-2 text-5xl font-bold text-gray-900 sm:text-4xl title-font">
                    Department name
                  </h1>
                  <div className="w-20 h-1 bg-indigo-500 rounded"></div>
                </div>
              </div>

              <button
                className="px-5 py-2 mb-10 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                onClick={showModal}
              >
                Request New Budget
              </button>
              {/* Departemen Head */}

              {/* Departemen Body */}
              {/* <div className="flex flex-wrap justify-center border"> */}
                {/* Card Pie */}
                {/* <div className="p-4 xl:w-1/3 md:w-1/2">
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
              </div> */}
              {/* Departemen Body */}

              {/* Departemen Body */}
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
                    {/* Departemen Body */}
            
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
