import React from 'react'
import IVehicle from '../../interfaces/IVehicles';

interface IVehicleItemProps {
    vehicle: IVehicle;
  }
  
  const VehicleItem: React.FC<IVehicleItemProps> = ({ vehicle }) => {
    return (
      <div>
        <h3>{vehicle.name}</h3>
        <p>Modelo: {vehicle.model}</p>
        <p>Fabricante: {vehicle.manufacturer}</p>
        <p>Classe: {vehicle.vehicle_class}</p>
      </div>
    );
  };

export default VehicleItem