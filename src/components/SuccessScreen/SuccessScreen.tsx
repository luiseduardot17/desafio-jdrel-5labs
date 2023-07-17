import { Link } from "react-router-dom"
import { BsFillCheckCircleFill } from "react-icons/bs";
import style from './SuccessScreen.module.css';

const SuccessScreen = () => {

    function generateOrder() {
        let randomNumbers = '';
        for (let i = 0; i < 6; i++) {
          const randomNumber = Math.floor(Math.random() * 10);
          randomNumbers += randomNumber;
        }
        return randomNumbers;
      }
      
      const sixNumbers = generateOrder();

    return (
        <div className={style.containerOrder}>
            <h3><BsFillCheckCircleFill /> Compra realizada com sucesso!</h3>
            <h3>Número do pedido: {sixNumbers}</h3>
            <div>
                <span>Após a confirmação do pagamento nossa equipe entrará em contato para retirada de seu novo veículo.</span>
            </div>
            <div>
                <Link to="/">
                    <button>VOLTAR AO INÍCIO</button>
                </Link>
            </div>
        </div>
    )
}

export default SuccessScreen