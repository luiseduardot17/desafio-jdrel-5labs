import React from "react";
import IVehicle from "../../interfaces/IVehicles";
import { Link } from "react-router-dom"
import style from "./VehicleItem.module.css"
import { formatValue } from "../../utils/utils";
import { observer } from "mobx-react-lite";

interface IVehicleItemProps {
  vehicle: IVehicle;
}

const VehicleItem: React.FC<IVehicleItemProps> = ({ vehicle }) => {
  const extractIdFromUrl = (url: string): string => {
    const parts = url.split("/");  // aqui eu extraio o id do final da url do item dividindo em partes
    const id = parts[5]
    return id || "";

  };

  const id = extractIdFromUrl(vehicle.url);

  return (
    <div className={style.vehicleCard}>
      <div className={style.conteudo}>
        <div className={style.vehicleImage}>
          <img src={`/vehicles/${id}.jpg`} alt={vehicle.name} />
        </div>
        <div className={style.vehicleInfos}>
          <h3>{vehicle.name}</h3>
          <p><b>Modelo:</b> {vehicle.model}</p>
          <p><b>Fabricante:</b> {vehicle.manufacturer}</p>
          <p><b>Classe:</b> {vehicle.vehicle_class}</p>
          <div>
            <span>A PARTIR DE {formatValue(vehicle.cost_in_credits)} *</span>
          </div>
          <div>
            <Link to={`/vehicles/${id}`}>
              <button className={style.Link}>Ver detalhes</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(VehicleItem);
