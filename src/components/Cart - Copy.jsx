import React from 'react';
import Sweetalert from 'sweetalert2'; // Asegúrate de instalar sweetalert

import { useAppContext } from './Context';

const Cart = () => {
    const { carrito, addToCart, removeFromCart, clearCart } = useAppContext();

    const handleClearCart = () => {
        if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            clearCart();
            Sweetalert('¡Carrito vaciado!', '', 'success');
        }
    };

    const handleFinishPurchase = () => {
        Sweetalert('¡Compra realizada con éxito!', '', 'success');
    };

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {carrito.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <ul>
                    {carrito.map(item => (
                        <li key={item.id}>
                            {item.nombre} - Cantidad: {item.cantidad}
                            <button onClick={() => removeFromCart(item.id)}>-</button>
                            <button onClick={() => addToCart(item.id)}>+</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleClearCart}>Vaciar Carrito</button>
            <button onClick={handleFinishPurchase}>Finalizar Compra</button>
        </div>
    );
};

export default Cart;


/*
import React from 'react';

import { useAppContext } from './Context'



En la vista de Cart además de lo que estamos mencionando (mostrar el carrito) podemos agregarle botones a los productos de modo tal que pueda:

-Quitar una unidad.
-Agregar una unidad.
-Limpiar el carrito.
-Quitar el producto tenga 1 o 10 unidades del mismo.
-Finalizar compra.

Entre otras cosas



const Cart = () => {
    const { carrito } = useAppContext();
    return (
        <div>Este es mi carrito
            <button onClick={() => console.log(carrito)}>
                Mostrar carrito
            </button>
        </div>
    );
};

export default Cart;
*/