import {useEffect, useState} from 'react'
import "./App.css"; 
import { Line } from "react-chartjs-2";
import CardPrincipal from './CardPrincipal';
import TableCoins from './TableCoins';
import Card from './Card'
import Convert from './Convert';
import Footer from './Footer'
import Header from './Header'
import {ThemeProvider} from "./Context/ThemeProvider";
// importamos todos los componentes para luego renderizarlos en el html.

// definimos los cambios de estado que vamos a utilizar a partir de los componentes importados 

export default function App() {
  const [coins, setCoins] = useState()
  const [currency, setCurrency] = useState()
  const [selCur, setSelCur] = useState("usd")
  const getData = async () =>{
    // importamos la api de coing geko, la cual actualiza la información de nuestra página web. en 
    // el link de la appi podemos modificar la currency con el estado que habíamos definido antes, 
    // en este link también se puede cambiar la cantidad de criptos que queremos que se nos muestre 
    // en las card principal (page=6) junto con las card secundarias. 
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=6&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    const json = await response.json()
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json()
    setCoins(json)
    setCurrency(cur)
  }
  useEffect(() => {
    getData()
  },[])
  useEffect(() => {
    getData()
  },[selCur])

  // en return se mostrará cargando hasta que las coins de la appi carguen a los componentes de nuestra
  // página. El contenedor app es el padre principal, luego ingresamos en orden los componentes.  


  return (
    !coins ? "Cargando..." :(
    <div className='App'>
       <ThemeProvider>
        <Header currencys={currency} fun={setSelCur} cur={selCur}/>
       </ThemeProvider>
      <main> 
        <div className='card_cont_pr'>
        {/* podemos colocar el número de card principal que queramos, solo duplicando a card principal. 
        en json = coins[ ] indicamos la posición de la moneda que queremos que se muestre en nuestras tarjetas.  */}
        <CardPrincipal json={coins[0]} cur={selCur}/>
        <CardPrincipal json={coins[1]} cur={selCur}/>
        </div>
        {/* .map, mapea las propiedades de las coins que queremos traer a nuestras cards secundarias. 
        El condicional if nos dice que va a mostrar la información en las card secundarias siempre 
        cuando el index es diferente de 0 y 1 para que no repita la información de las 2 card principales.  */}
        <div className="cards_con">
        {/* el return de esta función funciona con el index como key para que pueda cumpla la condición if  */}
          { coins.map(({id,symbol, image, current_price,price_change_percentage_30d_in_currency},index) =>{
            if(index != 0 && index != 1) {
             return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency,2)} img={image} coinId={id} cur={selCur}/>
            }
          })
          }
        </div>
      </main>
      {/* Fuera de main colocamos la tabla de criptos y el footer de nuestra página.  */}
      <Convert/>
      <TableCoins coins={coins}/>
      <Footer/>
    </div>
  )
  )

}

// con la primera función se formatea un número usando notación de punto fijo. 
// con la segunda imponemos la condicion de color para los indices mostrados en pantalla, 
// si la condicion cumple como mayor que cero seran verdes, si son menores seran rojos.
// por último habilitamos el formato numérico de acuerdo al idioma de la página. 

export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
export function colorDec(num){
  return num > 0 ? "green" : "red"
}
export const numberF = Intl.NumberFormat("es-ES")
