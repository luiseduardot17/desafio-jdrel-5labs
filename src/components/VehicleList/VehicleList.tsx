import { useState, useEffect } from 'react'
import http from '../../services/swapi'
import IVehicle from '../../interfaces/IVehicles'
import VechicleItem from '../VehicleItem/VehicleItem'
import IApiResponse from '../../interfaces/IApiResponse'
import style from './VehicleList.module.css'
import Loader from '../Loader/Loader'

const VehicleList = () => {

    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const vehiclesPerPage = 10;

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await http.get<IApiResponse>('vehicles/', {
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
        <div className={style.Container}>
            <div className={style.Title}>
                <h2>Nossos Veículos</h2>
            </div>
            {vehicles.length == 0 && (
                <>
                <Loader/>
                </>
            )}

            {vehicles.length > 0  && (
                <>
                    <div className={style.vehicleContainer}>
                    <div className={style.ellipse}></div>
                        {vehicles.map((vehicle) => (
                            <VechicleItem key={vehicle.name} vehicle={vehicle} />
                        ))}
                    </div>
                    <div className={style.pagination}>
                        <button className={style.buttonPagination} onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Página Anterior
                        </button>
                        <button className={style.buttonPagination} onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Próxima Página
                        </button>
                    </div>
                </>
            )}

        </div>
    )
}

export default VehicleList