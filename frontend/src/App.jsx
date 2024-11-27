import { BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import './output.css';
import AppRouter from "./router/AppRouters";
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
