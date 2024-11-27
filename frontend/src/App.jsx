import { BrowserRouter, Routes, Route} from "react-router-dom"
import AppRouter from "./router/AppRouters";
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
