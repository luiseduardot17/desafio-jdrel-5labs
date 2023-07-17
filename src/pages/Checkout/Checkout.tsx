import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { useNavigate } from 'react-router-dom';
import style from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className={style.Container}>
      {/* <div>
        <h3>Antes de finalizar seu pedido, vamos precisar dos seus dados:</h3>
      </div> */}
      <CheckoutForm navigate={navigate}/>
    </div>
  )
}

export default Checkout