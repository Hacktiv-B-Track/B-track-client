import React from "react";

export default function BudgetDetail() {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto max-w-7x1">
        {/* Table */}
        <div
          class="
          -my-2
          py-2
          overflow-x-auto
          sm:-mx-6 sm:px-6
          lg:-mx-8
          pr-10
          lg:px-8
        "
        >
          <div
            class="
            align-middle
            inline-block
            min-w-full
            shadow
            overflow-hidden
            bg-white
            shadow-dashboard
            px-8
            pt-3
            rounded-bl-lg rounded-br-lg
          "
          >
            <h1 class="mb-2 text-xl font-bold">Budget 1</h1>
            <button
              class="
              px-5
              py-2
              border-blue-500 border
              text-blue-500
              rounded
              transition
              duration-300
              hover:bg-blue-700 hover:text-white
              focus:outline-none
              mb-10
            "
            >
              Add New Transaction
            </button>
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="
                    px-6
                    py-3
                    border-b-2 border-gray-300
                    text-left
                    leading-4
                    text-blue-500
                    tracking-wider
                  "
                  >
                    Name
                  </th>
                  <th
                    class="
                    px-6
                    py-3
                    border-b-2 border-gray-300
                    text-left text-sm
                    leading-4
                    text-blue-500
                    tracking-wider
                  "
                  >
                    Date
                  </th>
                  <th
                    class="
                    px-6
                    py-3
                    border-b-2 border-gray-300
                    text-left text-sm
                    leading-4
                    text-blue-500
                    tracking-wider
                  "
                  >
                    Amount
                  </th>
                  <th
                    class="
                    px-6
                    py-3
                    border-b-2 border-gray-300
                    text-left text-sm
                    leading-4
                    text-blue-500
                    tracking-wider
                  "
                  >
                    Invoice
                  </th>
                  <th class="px-6 py-3 border-b-2 border-gray-300"></th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr>
                  <td
                    class="
                    px-6
                    py-4
                    whitespace-no-wrap
                    border-b border-gray-500
                  "
                  >
                    <div class="text-sm leading-5 text-blue-900">
                      Damilare Anjorin
                    </div>
                  </td>
                  <td
                    class="
                    px-6
                    py-4
                    whitespace-no-wrap
                    border-b
                    text-blue-900
                    border-gray-500
                    text-sm
                    leading-5
                  "
                  >
                    16 september 2021
                  </td>
                  <td
                    class="
                    px-6
                    py-4
                    whitespace-no-wrap
                    border-b
                    text-blue-900
                    border-gray-500
                    text-sm
                    leading-5
                  "
                  >
                    Rp. 200.000
                  </td>
                  <td class="border-b border-gray-500">
                    <img
                      class="object-scale-down w-1\/2 rounded h-72 my-5"
                      src="https://images.unsplash.com/photo-1628191137573-dee64e727614?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                      alt="image broken"
                    />
                  </td>
                  <td
                    class="
                    px-6
                    py-4
                    whitespace-no-wrap
                    text-right
                    border-b border-gray-500
                    text-sm
                    leading-5
                  "
                  >
                    <div class="flex w-40 justify-between">
                      <button
                        class="
                        px-5
                        py-2
                        border-blue-500 border
                        text-blue-500
                        rounded
                        transition
                        duration-300
                        hover:bg-blue-700 hover:text-white
                        focus:outline-none
                      "
                      >
                        Edit
                      </button>
                      <button
                        class="
                        px-5
                        py-2
                        border-blue-500 border
                        text-blue-500
                        rounded
                        transition
                        duration-300
                        hover:bg-blue-700 hover:text-white
                        focus:outline-none
                      "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    class="
                    px-6
                    py-4
                    whitespace-no-wrap
                    border-b border-gray-500
                  "
                  >
                    <div class="text-sm leading-5 text-blue-900">
                      Damilare Anjorin
                    </div>
                  </td>
                  <td
                    class="
                    px-6
                    py-4
                    whitespace-no-wrap
                    border-b
                    text-blue-900
                    border-gray-500
                    text-sm
                    leading-5
                  "
                  >
                    16 september 2021
                  </td>
                  <td
                    class="
                    px-6
                    py-4
                    whitespace-no-wrap
                    border-b
                    text-blue-900
                    border-gray-500
                    text-sm
                    leading-5
                  "
                  >
                    Rp. 200.000
                  </td>
                  <td class="border-b border-gray-500">
                    <img
                      class="object-scale-down w-1\/2 rounded h-72 my-5"
                      src="https://images.unsplash.com/photo-1628191137573-dee64e727614?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                      alt="image broken"
                    />
                  </td>
                  <td
                    class="
                    px-6
                    py-4
                    whitespace-no-wrap
                    text-right
                    border-b border-gray-500
                    text-sm
                    leading-5
                  "
                  >
                    <div class="flex w-40 justify-between">
                      <button
                        class="
                        px-5
                        py-2
                        border-blue-500 border
                        text-blue-500
                        rounded
                        transition
                        duration-300
                        hover:bg-blue-700 hover:text-white
                        focus:outline-none
                      "
                      >
                        Edit
                      </button>
                      <button
                        class="
                        px-5
                        py-2
                        border-blue-500 border
                        text-blue-500
                        rounded
                        transition
                        duration-300
                        hover:bg-blue-700 hover:text-white
                        focus:outline-none
                      "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
