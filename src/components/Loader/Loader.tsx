import style from './Loader.module.css'
import loadingImage from '../../assets/cloud-car-v2.png'

const Loader = () => {
    return (
        <div className={style.loader}>
            <span className={style.texto}>Carregando ...</span>
            <img src={loadingImage} alt="Loading" />
        </div>
    )
}

export default Loader