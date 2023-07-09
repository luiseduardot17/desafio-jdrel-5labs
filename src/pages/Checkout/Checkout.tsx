import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h3>Antes de finalizar seu pedido, vamos precisar dos seus dados:</h3>
      </div>
      <CheckoutForm navigate={navigate}/>
    </div>
  )
}

export default Checkout