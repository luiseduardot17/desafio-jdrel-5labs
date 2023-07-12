import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsCart3, BsXLg } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi'
import style from './Navbar.module.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      <div className={style.ellipse}></div>
      <div className={style.navbar}>
        <div className={style.image}></div>
        {windowWidth <= 425 ? (
          <>
            <span className={`${style.hamburgerButton} ${isMenuOpen ? style.open : ''}`} onClick={toggleMenu}>
              {isMenuOpen ? <BsXLg size={30}/> : <GiHamburgerMenu size={30}/>}
            </span>
            {isMenuOpen && (
              <nav className={style.menuOpen}>
                <Link to="/" onClick={toggleMenu}>
                  Início
                </Link>
                <Link to="/vehicles" onClick={toggleMenu}>
                  Veículos
                </Link>
                <Link to="/" onClick={toggleMenu}>
                  Sobre
                </Link>
                <Link to="/cart">
                  <button className={style.buttonCart}>
                    <BsCart3 /> Carrinho
                  </button>
                </Link>
              </nav>
            )}
          </>
        ) : (
          <>
            <nav className={style.nav}>
              <Link to="/">Início</Link>
              <Link to="/vehicles">Veículos</Link>
              <Link to="/">Sobre</Link>
            </nav>
            <div className={style.divButton}>
              <Link to="/cart">
                <button className={style.buttonCart}>
                  <BsCart3 /> Carrinho
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
