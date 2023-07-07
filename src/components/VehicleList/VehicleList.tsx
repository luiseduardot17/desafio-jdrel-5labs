import { useState, useEffect } from 'react'
import http from '../../services/swapi'
import IVehicle from '../../interfaces/IVehicles'
import VechicleItem from '../VehicleItem/VechicleItem'

const VehicleList = () => {

    const [vehicles, setVehicles] = useState<IVehicle[]>([])

    useEffect(() => {

        http.get<IVehicle[]>('vehicles')
            .then(resposta => setVehicles(resposta.data))

    }, [])

    return (

        <>
            <div>
                <VechicleItem />
            </div>
        </>
    )
}

export default VehicleList