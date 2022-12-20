import React from "react";
import "./tableCoins.css";
import CoinRow from "./CoinRow";

// Se importa a coinRaw donde tenemos la estructura de cada una de las fila de 
// la tabla de criptos, en la estructura definimos primero los títulos de cada columna. 

// solo recibe una prop que es las monedas con las que vamos a llenar la tabla 

function TableCoins({ coins }) {
  console.log(coins);
  return (
    <table className="table_coins">
      <thead>
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Ultimos 7 dias</td>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <CoinRow coin={coin} key={index} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
}

export default TableCoins;
