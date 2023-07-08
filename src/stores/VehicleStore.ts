import { makeAutoObservable, runInAction } from "mobx";
import http from "../services/swapi";
import IVehicle from "../interfaces/IVehicles";

export class VehicleStore {
  vehicles: IVehicle[] = [];
  vehicle: IVehicle | null = null; // Propriedade vehicle para armazenar os detalhes do veículo

  constructor() {
    makeAutoObservable(this);
  }

  fetchVehicleDetails = async (id: string) => {
    try {
      const response = await http.get(`/${id}`);
      runInAction(() => {
        this.vehicle = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  get hasVehicle() {
    return this.vehicle !== null;
  }

  addToCart = (vehicle: IVehicle) => {
    runInAction(() => {
      this.vehicles.push(vehicle); // Adiciona o veículo ao carrinho
    });
  };
}

const vehicleStore = new VehicleStore();
export default vehicleStore;
