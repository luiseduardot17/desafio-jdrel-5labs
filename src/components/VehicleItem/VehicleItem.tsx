import React from "react";
import IVehicle from "../../interfaces/IVehicles";
import { Link } from "react-router-dom"
import style from "./VehicleItem.module.css"
import { formatValue } from "../../utils/utils";

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

  return (
    <div className={style.vehicleCard}>
      <div className={style.Container}>
            <div className={style.vehicleImage}>
              IMG
            </div>
            <div className={style.vehicleInfos}>
              <h3>{vehicle.name}</h3>
              <p>Modelo: {vehicle.model}</p>
              <p>Fabricante: {vehicle.manufacturer}</p>
              <p>Classe: {vehicle.vehicle_class}</p>
              <div>
                <span>Créditos Galácticos: {formatValue(vehicle.cost_in_credits)}</span>
              </div>
            </div>
      </div>
      <div className={style.Link}>
        <Link to={`/vehicles/${id}`}>
          <button>Ver detalhes</button>
        </Link>
      </div>
    </div>
  );
};

export default VehicleItem;
