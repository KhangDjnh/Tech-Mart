import { BrowserRouter, Routes, Route} from "react-router-dom"
import SelllerHome from './pages/seller/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/seller" element={<SelllerHome />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
