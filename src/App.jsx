import { useState , useEffect} from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
  // State
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  // Funciones descriptivas
  function addToCart(item) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id);

    if (itemExist >= 0) {
      // Si el item ya existe, lo actualizamos
      const updateCart = [...cart]; // Creamos una copia del carrito
      updateCart[itemExist].quantity++; // Incrementamos la cantidad
      setCart(updateCart); // Actualizamos el estado con la copia modificada
    } else {
      // Si el item no existe, lo agregamos con una cantidad inicial de 1
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]); // Agregamos el nuevo item al carrito
    }
  }

  useEffect(() => {
    setData(db);
  }, []);

  return (
    <>
      <div>
        {/* Se renderiza el componente Header */}
        <Header cart={cart} />    

        <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar) => {
              return (
                <Guitar
                  key={guitar.id}
                  guitar={guitar}
                  setCart={setCart}
                  addToCart={addToCart}
                />
              );
            })}
          </div>
        </main>

        <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">
              GuitarLA - Todos los derechos Reservados
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
