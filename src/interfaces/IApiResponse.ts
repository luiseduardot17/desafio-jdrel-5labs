import IVehicle from "./IVehicles";

export default interface IApiResponse {
    count: number,
    results: IVehicle[];
}