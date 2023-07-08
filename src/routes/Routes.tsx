import { BrowserRouter, Route, Routes as Switch } from "react-router-dom"
import Home from "../pages/Home/Home"
import Cart from "../pages/Cart/Cart"
import Checkout from "../pages/Checkout/Checkout"
import Success from "../pages/Success/Success"
import VehicleDetails from "../components/VehicleDetails/VehicleDetails"


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path="vehicles/:id" element={<VehicleDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
