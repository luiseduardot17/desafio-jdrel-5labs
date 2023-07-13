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
      const vehicleWithImage = {
        ...response.data,
        image: `/vehicles/${id}.jpg`,
      }
      runInAction(() => {
        this.vehicle = vehicleWithImage;
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
    this.cartVehicles = this.cartVehicles.filter( // remove o veículo do carrinho
      (vehicle) => vehicle.id !== vehicleId
    );
  };

  clearCart() {
    this.cartVehicles = []; // limpa o carrinho após a compra
  }
}

const vehicleStore = new VehicleStore();
export default vehicleStore;
