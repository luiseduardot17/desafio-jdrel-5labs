import { Link } from "react-router-dom"
import { BsFillCheckCircleFill } from "react-icons/bs";

const SuccessScreen = () => {
    return (
        <div>
            <h3><BsFillCheckCircleFill /> Compra realizada com sucesso!</h3>
            <div>
                <span>O prazo de entrega começa a contar após a confirmação do pagamento.</span>
            </div>
            <div>
                <Link to="/">
                    <button>CONTINUAR COMPRANDO</button>
                </Link>
            </div>
        </div>
    )
}

export default SuccessScreen