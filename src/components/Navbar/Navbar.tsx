import { Link } from 'react-router-dom';
import { RiShoppingCartLine } from 'react-icons/ri';

const Navbar = () => {
    return (
        <header>
            <h1>Star Wars Vehicle Explorer</h1>
            <Link to="/cart">
                <RiShoppingCartLine />
            </Link>
        </header>
    );
};

export default Navbar;
