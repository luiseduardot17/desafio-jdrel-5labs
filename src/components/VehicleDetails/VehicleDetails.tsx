import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import vehicleStore from '../../stores/VehicleStore';
import http from '../../services/swapi';
import { formatValue } from "../../utils/utils";
import style from './VehicleDetailse.module.css'
import Loader from '../Loader/Loader';

const fetchFilmName = async (url: string) => {
  const response = await http.get(url);
  const title = response.data?.title || "indisponível";
  return { data: { title } };
};

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [filmNames, setFilmNames] = useState<string[]>([]);

  const fetchFilmNames = async () => {
    if (!vehicleStore.vehicle) {
      return []; // Retorna um array vazio caso vehicleStore.vehicle seja nulo
    }

    const filmUrls = vehicleStore.vehicle.films;
    const filmPromises = filmUrls.map(fetchFilmName); // Array de promises das requisições

    const filmResponses = await Promise.all(filmPromises); // Aguarda todas as requisições

    const filmNames = filmResponses.map((response) => {
      return response.data?.title || ""; // Extrai o título do filme da resposta
    });

    return filmNames;
  };

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const vehicleId = id ? parseInt(id, 10) : 0; // Converte para número
        if (isNaN(vehicleId) || vehicleId <= 0) {
          throw new Error('Invalid vehicle ID');
        }
        await vehicleStore.fetchVehicleDetails(vehicleId.toString());
      } catch (error) {
        console.log(error);
        navigate('/'); // Redireciona para a página inicial em caso de erro
      }
    };

    fetchVehicleDetails();
  }, [id, navigate]);

  useEffect(() => {
    const getFilmNames = async () => {
      const names = await fetchFilmNames();
      setFilmNames(names);
    };

    getFilmNames();
  }, [id]);

  const handleAddToCart = () => {
    const { vehicle } = vehicleStore; // Obtem o veículo do vehicleStore
    if (vehicle) {
      const vehicleWithId = { ...vehicle, id: id! }; // Adicione o ID ao objeto do veículo
      vehicleStore.addToCart(vehicleWithId);
      navigate('/cart');
    }
  };

  if (!vehicleStore.hasVehicle) {
    return <Loader/>;
  }

  const { name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables, vehicle_class, image } = vehicleStore.vehicle!;


  return (
    <div className={style.Container}>
      <div className={style.ContainerImage}>
        <div className={style.Nome}>
          <h2>{name}</h2>
        </div>
        <img src={image} alt="image" />
      </div>

      <div className={style.Nome2}>
        <h3>Sobre o {name}</h3>
        <b>Créditos Galácticos: {formatValue(cost_in_credits)}</b>
        <div>
          <button className={style.ButtonAddCart} onClick={handleAddToCart}>Adicionar ao Carrinho</button>
        </div>
        <div>
          <Link to="/vehicles">
            <button className={style.ButtonBack}>Voltar</button>
          </Link>
        </div>
      </div>

      <section className={style.Sobre}>
        <div className={style.InfosPrincipais}>
          <div>
            <p>{model}</p>
            <b>Modelo</b>
          </div>
          <div>
            <p>{vehicle_class}</p>
            <b>Classe</b>
          </div>
          <div>
            <p>{manufacturer}</p>
            <b>Fabricante</b>
          </div>
          <div>
            <p>{max_atmosphering_speed} Km/h</p>
            <b>Velocidade Máxima</b>
          </div>
        </div>

        <div className={style.OutrasInfos}>
          <div>
            <b>Comprimento: </b>
            <p>{length} m</p>
          </div>
          <div>
            <b>Pessoas necessárias para operar ou pilotar este veículo: </b>
            <p>{crew}</p>
          </div>
          <div>
            <b>Passageiros que este veículo pode transportar: </b>
            <p>{passengers}</p>
          </div>
          <div>
            <b>Carga máxima: </b>
            <p>{cargo_capacity} Kg</p>
          </div>
          <div>
            <b>Tempo máximo que este veículo pode fornecer consumíveis para toda a sua tripulação sem ter que reabastecer: </b>
            <p>{consumables}</p>
          </div>
          <div>
            <b>Filmes em que este veículo apareceu:</b>
            <ul className={style.Filmes}>
              {filmNames.map((filmName, index) => (
                <li key={index}>{filmName}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default observer(VehicleDetails);

