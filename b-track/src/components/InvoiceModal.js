import Modal from "react-modal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModalImage } from "../store/action";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function InvoiceModal(props) {
  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.isModalImage);
  const [image] = useState(props.image);

  const closeModal = () => {
    dispatch(toggleModalImage(false));
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
        <div className="w-auto h-auto">
          <div className="flex justify-end">
            <button onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-w-8"
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
            </button>
          </div>
          <img className="mt-5 rounded " src={image} alt="invoice" />
        </div>
      </Modal>
    </>
  );
}
