import { Link } from 'react-scroll';
import { FaCircleArrowUp } from 'react-icons/fa6';
import style from './Home.module.css'
import FAQ from '../../components/Faq/Faq';

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

        <div className={style.paragrafo}>
          <p>Explore nossa coleção de veículos lendários, como a TIE/LN starfighter, ou mergulhe nas areias de Tatooine com os famosos speeders.
            Cada veículo é cuidadosamente selecionado para oferecer a você a experiência mais autêntica e emocionante possível.</p>
        </div>
        <div className={style.imageContainer2}>
          <div className={style.imageAnimation2}></div>
        </div>

        <div className={style.paragrafo}>
          <p>Nossos veículos são mais do que meras máquinas - eles são símbolos de poder, liberdade e heroísmo. Ao adquirir um desses veículos, você estará se conectando diretamente
            com a incrível história e mitologia de Star Wars.</p>
        </div>
        <div className={style.imageContainer2}>
          <div className={style.imageAnimation3}></div>
        </div>

        <div className={style.paragrafo}>
          <p>Não perca a oportunidade de possuir um pedaço desse universo mágico. Aventure-se pela nossa seleção, encontre o veículo dos seus sonhos e comece sua jornada épica hoje mesmo.</p>
        </div>

        <FAQ />
      </section>

      <div className={style.topButton}>
        <Link to="top" smooth={true} duration={500}>
          <button><FaCircleArrowUp className={style.icone} /></button>
        </Link>
      </div>
    </div>
  )
}

export default Home