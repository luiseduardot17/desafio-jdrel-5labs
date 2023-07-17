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
        <section className={style.containerOrder}>
            <div className={style.ellipse}></div>
            <div className={style.pedido}>
                <h3><BsFillCheckCircleFill className={style.icone} /> Compra realizada com sucesso!</h3>
                <h3>Número do pedido: {sixNumbers}</h3>
                <div>
                    <span>Após a confirmação do pagamento nossa equipe entrará em contato para retirada de seu novo veículo.</span>
                </div>
                <div>
                    <Link to="/">
                        <button className={style.ButtonInicio}>VOLTAR AO INÍCIO</button>
                    </Link>
                </div>
            </div>

        </section>
    )
}

export default SuccessScreen