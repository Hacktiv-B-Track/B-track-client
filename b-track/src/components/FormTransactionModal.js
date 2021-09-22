import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  toggleModalFormDetail,
  fetchTransaction,
  fetchScanInvoice,
  postTransaction,
  editTransaction,
  fetchCategories,
} from "../store/action";
import { idrCurrency } from "../helpers/currency";
import { editFormDate } from "../helpers/getDate";

//TODO Refetch after add

const customStyles = {
  content: {
    top: "15%",
    left: "15%",
    right: "15%",
    bottom: "30%",
    marginRight: "10%",
    marginLeft: "10%",
    // transform: "translate(-50%, -50%)",
  },
};

export default function FormTransactionModal(props) {
  const dispatch = useDispatch();
  const { budgetId } = useParams();
  const isModal = useSelector((state) => state.isModalFormDetail);
  const [price, setPrice] = useState();
  const [namePrice, setNamePrice] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const categories = useSelector((state) => state.categories);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isScan, setIsScan] = useState("");

  useEffect(async () => {
    dispatch(fetchCategories());
    if (props.id) {
      dispatch(fetchTransaction(props.id))
        .then((res) => {
          setPrice(res.amount);
          setNamePrice(idrCurrency(res.amount));
          setName(res.name);
          setFile(res.invoice);
          setImageUrl(res.invoice);
          console.log(
            "🚀 ~ file: FormTransactionModal.js ~ line 55 ~ .then ~ res.invoice",
            res.invoice
          );
          setDate(editFormDate(res.date));
          setCategory(res.Category.id);
        })
        .catch((err) => console.log(err));
    }
  }, [props.id]);

  const closeModal = () => {
    dispatch(toggleModalFormDetail(false));
  };

  const priceHandler = (priceValue) => {
    setPrice(priceValue);
    setNamePrice(idrCurrency(priceValue));
  };

  const scanFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (file) {
      const formData = new FormData();
      formData.append("invoice-file", file);
      setLoading(true);
      setIsScan("disabled");
      dispatch(fetchScanInvoice(formData))
        .then((res) => {
          setPrice(res.totalInvoice);
          setNamePrice(idrCurrency(res.totalInvoice));
          setImageUrl(res.invoiceUrl);
          setLoading(false);
          setIsScan("");
        })
        .catch((err) => console.log(err));
    } else {
      toast.error(`Please choose file first`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let newDate;
    if (date) {
      newDate = new Date(date).toISOString();
    }

    let data = {
      name,
      date: newDate,
      amount: price,
      CategoryId: category,
      invoice: imageUrl,
      //! testing add, biar irit OCR
      // invoice:
      //   "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_pHFD1g4Hv.jpg",
    };
    if (props.id) {
      dispatch(editTransaction(data, props.id, budgetId));
    } else {
      dispatch(postTransaction(data, budgetId));
    }

    //TODO
    //* date edit not auto
    //* change select option getAll from category for add & edit
  };

  const lottiStyle = {
    width: "50px",
    height: "50px",
    marginLeft: "1.5rem",
  };

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
          <form className="mt-5" onSubmit={(e) => submitHandler(e)}>
            <div className="w-full mb-3 space-y-2 text-xs">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="py-2 text-lg font-semibold text-gray-600">
                  Transaction Name
                </label>
                <input
                  type="text"
                  placeholder="Alat kantor"
                  className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isScan}
                />
              </div>
            </div>

            <div className="flex-row w-full text-xs md:flex md:space-x-4">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 text-lg font-semibold text-gray-600">
                  Price Amount
                </label>
                <input
                  type="number"
                  placeholder="50000"
                  className="w-1/2 h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={price}
                  onChange={(e) => priceHandler(e.target.value)}
                  disabled={isScan}
                />
                <label className="py-2 ml-2 font-semibold text-gray-600">
                  {namePrice}
                </label>
              </div>
            </div>

            <div className="flex-row w-full text-xs md:flex md:space-x-4">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 text-lg font-semibold text-gray-600">
                  Date
                </label>
                <input
                  type="date"
                  placeholder=""
                  className="w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isScan}
                />
              </div>

              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 text-lg font-semibold text-gray-600">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isScan}
                >
                  <option value="" selected disabled>
                    Select Category
                  </option>

                  {categories.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Scan OCR */}
            <form>
              <div className="flex-row w-full text-xs md:flex md:space-x-4">
                <div className="w-full mb-3 space-y-2 text-xs">
                  <label className="py-2 text-lg font-semibold text-gray-600 ">
                    Invoice
                  </label>
                  <div className="relative flex flex-wrap items-stretch w-full mb-4">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      disabled={isScan}
                    />
                  </div>
                </div>

                <div className="w-full mb-3 space-y-2 text-xs">
                  <label className="py-2 text-lg font-semibold text-gray-600 ">
                    OCR
                  </label>
                  <div className="relative flex flex-wrap items-stretch w-full mb-4">
                    <button
                      className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100"
                      onClick={(e) => scanFile(e)}
                      disabled={isScan}
                    >
                      Scan File
                    </button>
                    {loading && (
                      <span>
                        <lottie-player
                          src="https://assets7.lottiefiles.com/packages/lf20_Hy2FuX.json"
                          style={lottiStyle}
                          background="transparent"
                          speed="1"
                          loop
                          autoplay
                        ></lottie-player>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>

            {/* Image */}
            <div className="w-full mb-3 space-y-2 text-xs">
              <img src={imageUrl} alt="invoice" id="invoice" />
            </div>

            <div className="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
              <button
                className="px-3 py-2 text-red-500 transition duration-300 border border-red-500 rounded hover:bg-red-700 hover:text-white focus:outline-none"
                onClick={closeModal}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-1 -ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Cancel</span>
                </div>
              </button>
              <button
                className="px-3 py-2 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                type="submit"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-1 -ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  <span>Save</span>
                </div>
              </button>
              {/* <button
                type="submit"
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-green-500"
              >
                Save
              </button> */}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
