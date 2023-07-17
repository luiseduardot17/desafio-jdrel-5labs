import vehicleStore from "../../stores/VehicleStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { observer } from "mobx-react-lite";
import { formatValue } from "../../utils/utils";
import { BsCart3 } from "react-icons/bs";
import style from './Cart.module.css'

const Cart = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { cartVehicles } = vehicleStore;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRemoveFromCart = (vehicleId: string) => {
    vehicleStore.removeFromCart(vehicleId);
  };

  return (
    <div className={style.Container}>
      <div className={style.Order}>
        <div className={style.ellipse}></div>
        {cartVehicles.length > 0 && (

          <div className={style.Descritivo}>
            <h3>Veículo</h3>
            <h3>Créditos Galácticos</h3>
            <h3>Ação</h3>
          </div>
        )}
        {cartVehicles.map((vehicle) => (
          <div key={vehicle.id} className={style.Produto}>

            <div className={style.Item}>
              <div><h3>{vehicle.name}</h3></div>
              <div>
                <span className={style.Creditos}>{formatValue(vehicle.cost_in_credits)}</span>
              </div>
              {windowWidth <= 428 ? (
                <>
                  <div className={style.ContainerButton}><button onClick={() => handleRemoveFromCart(vehicle.id)}>
                    <RiDeleteBin6Line />
                  </button></div>
                </>
              ) : (
                <>
                  <div className={style.ContainerButton}><button onClick={() => handleRemoveFromCart(vehicle.id)}>
                    <RiDeleteBin6Line /> REMOVER
                  </button></div>
                </>
              )}
            </div>
          </div>
        ))}
        {cartVehicles.length > 0 && (
          <div>
            <Link to="/checkout">
              <button className={style.ButtonFecharPedido}>FECHAR PEDIDO</button>
            </Link>
          </div>
        )}

        {cartVehicles.length == 0 && (
          <div>
            <div className={style.TextoVazio}>
              <b>O seu carrinho está vazio</b>
            </div>
            <div className={style.image}></div>
          </div>
        )}

        <div>
          <Link to="/vehicles">
            <button className={style.ButtonContinuar}><BsCart3 /> CONTINUAR COMPRANDO</button>
          </Link>
        </div>
      </div>
    </div >
  )
}

export default observer(Cart)