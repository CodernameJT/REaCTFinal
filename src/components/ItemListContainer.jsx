import React, { useEffect } from 'react'
import ItemList from './ItemList';
import Loader from './Loader';
import { useAppContext } from './Context';

const ItemListContainer = () => {

    const { cargarData, productos } = useAppContext();

    useEffect(() => {
        cargarData();
    });

    return (
        <>
            {
                productos.length === 0 ?
                    <Loader />
                    :
                    <>
                        <h2 style={{ padding: "2rem" }}>Bienvenidos a la tienda de chupi pupi</h2>
                        <ItemList productos={productos} />
                    </>
            }
        </>
    );
};

export default ItemListContainer;