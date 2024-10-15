import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/custom-toast.css";
import { ErrorContext } from "./ErrorContext";

function Message() {
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    if (errorMessage) {
      toast.dismiss();

      toast(errorMessage, {
        toastId: Date.now(),
      });

      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
  }, [errorMessage, setErrorMessage]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default Message;
