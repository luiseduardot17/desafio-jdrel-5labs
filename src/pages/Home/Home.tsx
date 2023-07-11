import { Link } from 'react-scroll';
import { FaCircleArrowUp } from 'react-icons/fa6';
import style from './Home.module.css'

const Home = () => {
  return (
    <div className={style.Container}>
      <section>
        <h1>Star Wars Vehicle Explorer</h1>
        <div className={style.paragrafo}>
          <p>Se você é um verdadeiro fã de Star Wars e sempre sonhou em pilotar uma das icônicas naves ou veículos que habitam essa galáxia distante, você está no lugar certo. 
            Aqui, você encontrará uma vasta seleção de veículos incríveis, prontos para transportá-lo para aventuras intergalácticas.</p>
        </div>
        <div className={style.imageAnimation}></div>
        <div className={style.ellipse2}></div>
      </section>
      <div className={style.topButton}>
        <Link to="top" smooth={true} duration={500}>
          <button><FaCircleArrowUp /> Voltar ao topo</button>
        </Link>
      </div>
    </div>
  )
}

export default Home