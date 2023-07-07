import React from "react";
import IVehicle from "../../interfaces/IVehicles";

interface IVehicleItemProps {
  vehicle: IVehicle;
}

const VehicleItem: React.FC<IVehicleItemProps> = ({ vehicle }) => {
  const formatValue = (value: string | number): string => {
    if (value === "unknown") {
      return "$ 20.000";
    }

    return `$ ${Number(value).toLocaleString()}`;
  };

  return (
    <div>
      <h3>{vehicle.name}</h3>
      <p>Modelo: {vehicle.model}</p>
      <p>Fabricante: {vehicle.manufacturer}</p>
      <p>Classe: {vehicle.vehicle_class}</p>
      <div>
        <p>Créditos Galácticos: {formatValue(vehicle.cost_in_credits)}</p>
      </div>
    </div>
  );
};

export default VehicleItem;
