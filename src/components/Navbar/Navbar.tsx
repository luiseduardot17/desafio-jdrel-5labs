import { Link } from 'react-router-dom';
import { RiShoppingCartLine } from 'react-icons/ri';
import style from './Navbar.module.css'

const Navbar = () => {
    return (
        <header>
            <div className={style.ellipse}></div>
            <div className={style.navbar}>
                <div className={style.image}></div>
                <nav>
                    <a href='/'>Início</a>
                    <a>Veículos</a>
                    <a>Sobre</a>
                </nav>
                <div className={style.divButton}>
                    <Link to="/cart">
                        <button className={style.buttonCart}><RiShoppingCartLine /> Carrinho</button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
