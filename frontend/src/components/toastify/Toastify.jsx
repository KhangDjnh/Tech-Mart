import React from 'react';
import {ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Toastify() {
    return (
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    )
        ;
}

export default Toastify;