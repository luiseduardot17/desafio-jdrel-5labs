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
            <RiDeleteBin6Line /> REMOVER
          </button>
        </div>
      ))}

      {cartVehicles.length > 0 && (
        <div>
          <Link to="/checkout">
            <button>FECHAR PEDIDO</button>
          </Link>
        </div>
      )}

      {cartVehicles.length == 0 && (
        <div>
          <b>O seu carrinho está vazio.</b>
          <span>Deseja olhar outros veículos similares?</span>
        </div>
      )}

      <div>
        <Link to="/">
          <button>CONTINUAR COMPRANDO</button>
        </Link>
      </div>
    </div>
  )
}

export default observer(Cart)