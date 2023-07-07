import { useState, useEffect } from 'react'
import http from '../../services/swapi'
import IVehicle from '../../interfaces/IVehicles'
import VechicleItem from '../VehicleItem/VehicleItem'
import IApiResponse from '../../interfaces/IApiResponse'

const VehicleList = () => {

    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const vehiclesPerPage = 10; // Número de veículos por página

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await http.get<IApiResponse>('/', {
                    params: {
                        page: currentPage,
                    },
                });
                setVehicles(response.data.results);
                setTotalResults(response.data.count);
            } catch (error) {
                console.log(error);
            }
        };

        fetchVehicles();
    }, [currentPage]);

    const totalPages = Math.ceil(totalResults / vehiclesPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            <h2>Lista de Veiculos</h2>
            {vehicles.map((vehicle, index) => (
                <VechicleItem key={index} vehicle={vehicle} />
            ))}
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Página Anterior
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Próxima Página
                </button>
            </div>
        </div>
    )
}

export default VehicleList