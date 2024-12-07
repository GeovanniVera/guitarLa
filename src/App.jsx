import { useState , useEffect} from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import {db} from "./data/db"

function App() {
  //State
  const [ data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  //funciones descriptivas
  function addToCart(item){
    const itemExist = cart.findIndex(guitar=>guitar.id===item.id);
    
    if(itemExist >= 0){
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart[updateCart]
    }else{
      item.quantity = 1;
      
      setCart([...cart, item])      
    }
  }

  useEffect(()=>{
    setData(db)
   },[])
  //ap js tiene una serie de instrucciones
  //statements una instruccion para hacer algo

  //expresion algoque produce un valor 

  return (
    <>
      <div>
    {/* Se renderiza el componente header */}
    <Header 
      cart={cart}
    />    
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=>{
              return (
                <Guitar
                  key={guitar.id}
                  guitar={guitar}
                  setCart ={setCart}
                  addToCart={addToCart}
                />
              )
            })}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
      </div>
    </>
  )
}

export default App
