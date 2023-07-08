import vehicleStore from "../../stores/VehicleStore";
import { Link } from "react-router-dom";

const Cart = () => {

  const cartVehicles = vehicleStore.cartVehicles;


  return (
    <div>
      {cartVehicles.map((vehicle, index) => (
        <div key={index}>
          <h3>{vehicle.name}</h3>
          <p>Valor: {vehicle.cost_in_credits}</p>

          <div>
            <button>
              <Link to="/checkout">Ir para o Checkout</Link>
            </button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Cart