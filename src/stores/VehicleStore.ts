import { makeAutoObservable, runInAction } from "mobx";
import http from "../services/swapi";
import IVehicle from "../interfaces/IVehicles";

export class VehicleStore {
  vehicles: IVehicle[] = [];
  vehicle: IVehicle | null = null; // Propriedade vehicle para armazenar os detalhes do veículo
  cartVehicles: IVehicle[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchVehicleDetails = async (id: string) => {
    try {
      const response = await http.get(`vehicles/${id}`);
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
      this.cartVehicles.push(vehicle); // Adiciona o veículo ao carrinho
    });
  };

  removeFromCart = (vehicleId: string) => {
    this.cartVehicles = this.cartVehicles.filter(
      (vehicle) => vehicle.id !== vehicleId
    );
  };
}

const vehicleStore = new VehicleStore();
export default vehicleStore;
