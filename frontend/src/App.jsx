import AppRouter from "./router/AppRouters";
import Toastify from "./components/toastify/Toastify"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "../src/store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter future={{ v7_startTransition: true }}>
                    <AppRouter />
                    <Toastify />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App;
