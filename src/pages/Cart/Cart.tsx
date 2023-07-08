import vehicleStore from "../../stores/VehicleStore";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { observer } from "mobx-react-lite";
import { formatValue } from "../../utils/utils";

const Cart = () => {
  const { cartVehicles } = vehicleStore;

  const handleRemoveFromCart = (vehicleId: string) => {
    vehicleStore.removeFromCart(vehicleId);
  };

  return (
    <div>
      {cartVehicles.map((vehicle) => (
        <div key={vehicle.id}>
          <h3>{vehicle.name}</h3>
          <p>Valor: {formatValue(vehicle.cost_in_credits)}</p>
          <button onClick={() => handleRemoveFromCart(vehicle.id)}>
            <RiDeleteBin6Line />
          </button>
        </div>
      ))}

      {cartVehicles.length > 0 && (
        <div>
          <button>
            <Link to="/checkout">Ir para o Checkout</Link>
          </button>
        </div>
      )}

      <div>
        <button>
          <Link to="/">Voltar à lista de veículos</Link>
        </button>
      </div>
    </div>
  )
}

export default observer(Cart)