export default interface IVehicle {
    id: string;
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: [];
    films: [string, string];
    created: string;
    edited: string;
    url: string;
    image: string;
}
