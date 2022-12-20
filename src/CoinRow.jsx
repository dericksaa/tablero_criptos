import React from "react";
import "./coinRow.css"
import Graph from './Graph'
import {deleteDec, colorDec, numberF} from './App'

// en este componente se crea la estructura de una fila de la tabla de criptos que aparece al final de la página 

// se podría desestructurar a coin con sus propiedades en las props de la función 
// para no anteponer la palabra coins. cada vez que llamemos una de sus propiedades 

export default function CoinRow({ coin, index }) {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
            <img src={coin.image} title={coin.name} alt={coin.name} />
        </div>
      </td>
      <td>{numberF.format(coin.current_price)}US$</td>
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 3)}%</td>
      <td>{numberF.format(coin.total_volume)}US$</td>
      <td>{numberF.format(coin.market_cap)}US$</td>
      {/* este gráfico a diferencia de los demás que es solo para un mes, este es para los 7 días  */}
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td>
    </tr>
  );
}
