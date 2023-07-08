import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import vehicleStore from '../../stores/VehicleStore';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  const { name, model, manufacturer } = vehicleStore.vehicle!;

  return (
    <div>
      <h2>Detalhes do Veículo - ID {id}</h2>
      <p>Nome: {name}</p>
      <p>Modelo: {model}</p>
      <p>Fabricante: {manufacturer}</p>
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
      <button onClick={handleGoBack}>Voltar</button>
    </div>
  );
};

export default observer(VehicleDetails);

