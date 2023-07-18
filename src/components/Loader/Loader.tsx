import style from './Loader.module.css'
import loadingImage from '../../assets/cloud-car-v2.png'

const Loader = () => {
    return (
        <div className={style.loader}>
            <div>
                <span className={style.texto}>CARREGANDO...</span>
                <img src={loadingImage} alt="Loading" />
            </div>
        </div>
    )
}

export default Loader