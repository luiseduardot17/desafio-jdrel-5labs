import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import vehicleStore from '../../stores/VehicleStore';
import http from '../../services/swapi';

const fetchFilmName = async (url: string) => {
  const response = await http.get(url);
  const title = response.data?.title || "";
  return { data: { title } };
};

const formatValue = (value: string | number): string => {
  if (value === "unknown") {
    return "$ 20.000";
  }
  return `$ ${Number(value).toLocaleString()}`;
};

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [filmNames, setFilmNames] = useState<string[]>([]);

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
  }, []);

  const handleAddToCart = () => {
    const { vehicle } = vehicleStore; // Obtem o veículo do vehicleStore
    if (vehicle) {
      vehicleStore.addToCart(vehicle); // Adiciona o veículo ao carrinho
      navigate('/cart');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (!vehicleStore.hasVehicle) {
    return <div>Carregando informações do veículo...</div>;
  }

  const { name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables, vehicle_class} = vehicleStore.vehicle!;

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

  return (
    <div>
      <h2>Detalhes do Veículo - ID {id}</h2>
      <p>Nome: {name}</p>
      <p>Modelo: {model}</p>
      <p>Classe: {vehicle_class}</p>
      <p>Fabricante: {manufacturer}</p>
      <p>Comprimento em metros: {length}</p>
      <p>Velocidade máxima deste veículo na atmosfera: {max_atmosphering_speed}</p>
      <p>Pessoas necessárias para operar ou pilotar este veículo: {crew}</p>
      <p>Passageiros que este veículo pode transportar: {passengers}</p>
      <p>Carga máxima em quilogramas: {cargo_capacity}</p>
      <p>Tempo máximo que este veículo pode fornecer consumíveis para toda a sua tripulação sem ter que reabastecer: {consumables}</p>
      <p>Filmes em que este veículo apareceu:</p>
      <ul>
        {filmNames.map((filmName, index) => (
          <li key={index}>{filmName}</li>
        ))}
      </ul>
      
      <p>Créditos Galácticos: {formatValue(cost_in_credits)}</p>
      
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
      <button onClick={handleGoBack}>Voltar</button>
    </div>
  );
};

export default observer(VehicleDetails);

