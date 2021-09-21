import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
    bottom: "15%",
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

  useEffect(async () => {
    dispatch(fetchCategories());
    if (props.id) {
      dispatch(fetchTransaction(props.id))
        .then((res) => {
          setPrice(res.amount);
          setNamePrice(idrCurrency(res.amount));
          setName(res.name);
          setFile(res.invoice);
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
    const formData = new FormData();
    formData.append("invoice-file", file);
    setLoading(true);
    dispatch(fetchScanInvoice(formData))
      .then((res) => {
        setPrice(res.totalInvoice);
        setNamePrice(idrCurrency(res.totalInvoice));
        setImageUrl(res.invoiceUrl);
        setLoading(false);
      })
      .catch((err) => console.log(err));
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
      // invoice: imageUrl,
      //! testing add, biar irit OCR
      invoice:
        "https://ik.imagekit.io/ddtyiwgu4rm/invoice-kledo-1_pHFD1g4Hv.jpg",
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

  // if (isLoading) {
  //   return (
  //     <lottie-player
  //       src="https://assets2.lottiefiles.com/packages/lf20_YMim6w.json"
  //       className="w-2/3 mx-auto h-2/3"
  //       background="transparent"
  //       speed="1"
  //       loop
  //       autoplay
  //     ></lottie-player>
  //   );
  // }

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
                <label className="py-2 font-semibold text-gray-600">
                  Transaction Name
                </label>
                <input
                  type="text"
                  placeholder="Alat kantor"
                  className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-row w-full text-xs md:flex md:space-x-4">
              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 font-semibold text-gray-600">
                  Price Amount
                </label>
                <input
                  type="number"
                  placeholder="50000"
                  className="w-1/2 h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={price}
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
                  placeholder=""
                  className="w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="w-full mb-3 space-y-2 text-xs">
                <label className="block py-2 font-semibold text-gray-600">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" selected disabled>
                    --SELECT CATEGORY--
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
                  <label className="py-2 font-semibold text-gray-600 ">
                    Invoice
                  </label>
                  <div className="relative flex flex-wrap items-stretch w-full mb-4">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="w-full mb-3 space-y-2 text-xs">
                  <label className="py-2 font-semibold text-gray-600 ">
                    OCR
                  </label>
                  <div className="relative flex flex-wrap items-stretch w-full mb-4">
                    <button
                      className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100"
                      onClick={(e) => scanFile(e)}
                    >
                      Scan File
                    </button>
                  </div>

                  {loading && <p>Please wait</p>}
                </div>
              </div>
            </form>

            {/* Image */}
            <div className="w-full mb-3 space-y-2 text-xs">
              <img src={imageUrl} alt="invoice" id="invoice" />
            </div>

            <div className="flex flex-col-reverse mt-5 text-right md:space-x-3 md:block">
              <button
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-green-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
