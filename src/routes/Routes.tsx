import { BrowserRouter, Route, Routes as Switch } from "react-router-dom"
import { Element } from 'react-scroll';
import Home from "../pages/Home/Home"
import Cart from "../pages/Cart/Cart"
import Checkout from "../pages/Checkout/Checkout"
import Success from "../pages/Success/Success"
import VehicleDetails from "../components/VehicleDetails/VehicleDetails"
import Navbar from "../components/Navbar/Navbar"
import VehicleList from "../components/VehicleList/VehicleList";


const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Element name="top">
                <Switch>
                    <Route path="/" element={<Home />} />
                    <Route path="/vehicles" element={<VehicleList />} />
                    <Route path="vehicles/:id" element={<VehicleDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<Success />} />
                </Switch>
            </Element>
        </BrowserRouter>
    )
}

export default Routes
