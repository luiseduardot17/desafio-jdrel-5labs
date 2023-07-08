import React from "react";
import IVehicle from "../../interfaces/IVehicles";
import { Link } from "react-router-dom"

interface IVehicleItemProps {
  vehicle: IVehicle;
}

const VehicleItem: React.FC<IVehicleItemProps> = ({ vehicle }) => {
  const extractIdFromUrl = (url: string): string => {
    const parts = url.split("/");  // aqui eu extraio o id do final da url do item dividindo em partes
    const id = parts[5]
    return id || "";
    
  };
  
  const id = extractIdFromUrl(vehicle.url)
  
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
      <Link to={`/vehicles/${id}`}>Ver detalhes</Link>
      
    </div>
  );
};

export default VehicleItem;
