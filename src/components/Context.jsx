import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import Swal from "sweetalert2";

const firebaseConfig = {
    apiKey: "AIzaSyA8WrLuEW2mNlEB2VmxoRmvWSKnsXlUpug",
    authDomain: "codernamejt-reactjs.firebaseapp.com",
    projectId: "codernamejt-reactjs",
    storageBucket: "codernamejt-reactjs.appspot.com",
    messagingSenderId: "317485687993",
    appId: "1:317485687993:web:e4a8e5e3d4f074035ce768"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productsCollection = collection(db, "productos");
const ordersCollection = collection(db, "ordenes");

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    function cargarData() {
        getDocs(productsCollection).then(snapshot => {
            let arrayProductos = snapshot.docs.map(el => el.data());
            setProductos(arrayProductos);
        }).catch(err => console.error(err));
    };

    function agregarAlCarrito(id) {
        const carritoAuxiliar = [...carrito];
        const productoEnCarrito = carritoAuxiliar.find(el => el.id === id);

        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad < 10) {
                productoEnCarrito.cantidad += 1;
            } else {
                Swal.fire('No puedes agregar más de 10 unidades por producto', '', 'warning');
            }
        } else {
            const productoAAgregar = productos.find(el => el.id === id);
            carritoAuxiliar.push({ ...productoAAgregar, cantidad: 1 });
        }

        setCarrito(carritoAuxiliar);
    };

    function crearOrden() {
        if (carrito.length > 0) {
            const nuevaOrden = {
                nombre: "Lucas Ruiz",
                telefono: 231231231,
                mail: "lucas@coder.com",
                productos: carrito,
            };

            addDoc(ordersCollection, nuevaOrden).then(response => {
                console.log("Orden creada correctamente con el id: " + response.id);
                setCarrito([]);
            }).catch(err => {
                alert("Algo falló, intente más tarde");
                console.error(err);
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Tu carrito está vacío!",
                icon: "error"
            });
        };
    };

    function removeFromCart(id) {
        const carritoAuxiliar = [...carrito];
        const productoEnCarrito = carritoAuxiliar.find(el => el.id === id);
    
        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad > 1) {
                productoEnCarrito.cantidad -= 1;
            } else {
                const index = carritoAuxiliar.indexOf(productoEnCarrito);
                carritoAuxiliar.splice(index, 1);
            }
        }
    
        setCarrito(carritoAuxiliar);
    }
    
    function clearCart() {
        setCarrito([]);
    }
    

    return (
        <AppContext.Provider value={{ productos, carrito, setCarrito, cargarData, agregarAlCarrito, removeFromCart, clearCart, crearOrden }}>
            {props.children}
        </AppContext.Provider>
    );
    
    
};
