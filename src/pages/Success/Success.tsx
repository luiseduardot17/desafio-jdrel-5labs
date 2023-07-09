import { Link } from "react-router-dom"

const Success = () => {
  return (
    <div>
      <h3>Compra realizada com sucesso!</h3>
      <span>O prazo de entrega começa a contar após a confirmação do pagamento.</span>
      <div>
        <Link to="/">
          <button>CONTINUAR COMPRANDO</button>
        </Link>
      </div>
    </div>
  )
}

export default Success