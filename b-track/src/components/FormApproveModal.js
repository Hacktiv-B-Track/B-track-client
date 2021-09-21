import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditBudget, toggleModalFormDetail } from "../store/action";

const customStyles = {
  content: {
    top: "15%",
    left: "15%",
    right: "15%",
    bottom: "15%",
    marginRight: "10%",
    marginLeft: "10%",
    // transform: "translate(-50%, -50%)",
  },
};

export default function FormApproveModal({id, name, amount, date:defaultDate, due_date:defaultDueDate}) {
  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.isModalFormDetail);
  const [price, setPrice] = useState('');
  const [namePrice, setNamePrice] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const closeModal = () => {
    dispatch(toggleModalFormDetail(false));
  };

  useEffect(() => {
    priceHandler(amount)
    setDate(defaultDate)
    setDueDate(defaultDueDate)
  }, [id])

  const priceHandler = (priceValue) => {
    setPrice(priceValue);
    setNamePrice(
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(priceValue)
    );
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(EditBudget({
  //     amount:price, date, due_date:dueDate, status:"Approved", budgetId:id
  //   }))
  // };

  function handleReject(e) {
    e.preventDefault();
    dispatch(EditBudget({
      amount:price, date, due_date:dueDate, status:"Rejected", budgetId:id
    }))
  }

  function handleApprove(e) {
    e.preventDefault();
    dispatch(EditBudget({
      amount:price, date, due_date:dueDate, status:"Approved", budgetId:id
    }))
  }

  return (
    <>
      <Modal
        isOpen={isModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add & Edit Modal"
        ariaHideApp={false}
      >
        <div className="w-full h-auto">
          <form className="mt-5">
            <div className="w-full mb-3 space-y-2 text-xs">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="py-2 font-semibold text-gray-600">
                  Budget Name
                </label>
                <input
                  type="text"
                  placeholder="Budget Name"
                  defaultValue={name}
                  className="block w-full h-10 px-4 border rounded-lg appearance-none bg-gray-300 text-grey-darker border-grey-lighter"
                  readOnly
                />
              </div>
            </div>

            <div className="flex-row w-full text-xs md:flex md:space-x-4">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 font-semibold text-gray-600">
                  Budget Amount Request
                </label>
                <input
                  type="number"
                  defaultValue={amount}
                  placeholder="1000000"
                  className="w-1/2 h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  onChange={(e) => priceHandler(e.target.value)}
                />
                <label className="py-2 ml-2 font-semibold text-gray-600">
                  {namePrice}
                </label>
              </div>
            </div>

            <div className="flex-row w-full text-xs md:flex md:space-x-4">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 font-semibold text-gray-600">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  placeholder=""
                  min={date}
                  className="w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-row w-full text-xs md:flex md:space-x-4">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 font-semibold text-gray-600">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  placeholder=""
                  min={date}
                  className="w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
              <button
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-red-400 border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-red-500"
                onClick={e=>handleReject(e)}
              >
                Reject
              </button>
              <button
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-green-500"
                onClick={e=>handleApprove(e)}
              >
                Approve
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
