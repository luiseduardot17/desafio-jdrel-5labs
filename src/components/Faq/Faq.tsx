import { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import style from './Faq.module.css'

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            pergunta: 'Quais são os veículos mais populares de Star Wars disponíveis na loja?',
            resposta: 'Os veículos mais populares de Star Wars disponíveis em nossa loja incluem a Millennium Falcon, a X-Wing, a TIE Fighter e muito mais!',
        },
        {
            pergunta: 'Posso adquirir um modelo em escala da lendária Estrela da Morte?',
            resposta: 'Infelizmente, a Estrela da Morte não está disponível em escala para venda. Ela é uma construção única no universo Star Wars.',
        },
        {
            pergunta: 'Quais são as opções de veículos terrestres disponíveis?',
            resposta: 'Temos várias opções de veículos terrestres inspirados em Star Wars, incluindo landspeeders, speeder bikes e AT-ATs.',
        },
        {
            pergunta: 'É possível personalizar meu próprio droide astromecânico, como o R2-D2?',
            resposta: 'Sim, oferecemos kits de montagem e componentes para que você possa personalizar seu próprio droide astromecânico no estilo do R2-D2.',
        },
    ];

    return (
        <div className={style.faqContainer}>
            <h3>FAQ</h3>
            <ul>
                {faqData.map((item, index) => (
                    <li key={index}>
                        <p className={style.perguntas}>{item.pergunta}</p>
                        {activeIndex === index ? (
                            <>
                                <AiOutlineUp className={style.customIcon} onClick={() => toggleAnswer(index)} />
                                <p className={style.resposta}>{item.resposta}</p>
                            </>
                        ) : (
                            <AiOutlineDown className={style.customIcon} onClick={() => toggleAnswer(index)} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FAQ;
