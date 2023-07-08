import { Link } from 'react-scroll';
import VehicleList from '../../components/VehicleList/VehicleList'
import { FaCircleArrowUp } from 'react-icons/fa6';

const Home = () => {
  return (
    <div>
      <VehicleList/>
      <Link to="top" smooth={true} duration={500}>
        <button><FaCircleArrowUp/> Voltar ao topo</button>
      </Link>
    </div>
  )
}

export default Home