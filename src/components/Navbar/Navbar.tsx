import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import style from './Navbar.module.css'

const Navbar = () => {
    return (
        <header>
            <div className={style.ellipse}></div>
            <div className={style.navbar}>
                <div className={style.image}></div>
                <nav>
                    <Link to='/'>Início</Link>
                    <Link to='/vehicles'>Veículos</Link>
                    <Link to='/'>Sobre</Link>
                </nav>
                <div className={style.divButton}>
                    <Link to="/cart">
                        <button className={style.buttonCart}><BsCart3/> Carrinho</button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
