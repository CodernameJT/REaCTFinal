import React from 'react';
import Swal from 'sweetalert2';
import { useAppContext } from './Context';

const Cart = () => {
    const { carrito, agregarAlCarrito, removeFromCart, clearCart } = useAppContext();

    // Aggregate products by ID
    const aggregatedCart = carrito.reduce((acc, item) => {
        const found = acc.find(product => product.id === item.id);
        if (found) {
            found.cantidad += item.cantidad || 1;
        } else {
            acc.push({ ...item, cantidad: item.cantidad || 1 });
        }
        return acc;
    }, []);

    const handleClearCart = () => {
        if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            clearCart();
            Swal.fire('¡Carrito vaciado!', '', 'success');
        }
    };

    const handleFinishPurchase = () => {
        if (aggregatedCart.length === 0) {
            Swal.fire({
                title: 'Carrito vacío',
                text: 'No puedes finalizar la compra porque tu carrito está vacío.',
                icon: 'warning',
            });
            return;
        }

        Swal.fire('¡Compra realizada con éxito!', '', 'success').then(() => {
            clearCart();
        });
    };

    const handleAddToCart = (item) => {
        if (item.cantidad < 10) {
            agregarAlCarrito(item.id);
        } else {
            Swal.fire('No puedes agregar más de 10 unidades por producto', '', 'warning');
        }
    };

    const handleRemoveFromCart = (item) => {
        removeFromCart(item.id);
    };

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {aggregatedCart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <ul>
                    {aggregatedCart.map((item, index) => (
                        <li key={item.id + '-' + index}>
                            {item.nombre} - Cantidad: {item.cantidad}
                            <button onClick={() => handleRemoveFromCart(item)}>-</button>
                            <button onClick={() => handleAddToCart(item)}>+</button>
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
