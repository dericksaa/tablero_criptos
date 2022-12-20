import { useEffect, useState } from "react";
import InputConvert from "./InputConvert"; // Componente
import { FaExchangeAlt } from "react-icons/fa"; // Icono
import "./Convert.css"; // Estilos
// import { object } from "prop-types";

export default function Convert() {
  const [coin, setCoin] = useState([])
  // el estado inicial de los inputs se define en btc y eth 
  const [selCoin1, setSelCoin1] = useState("btc")
  const [selCoin2, setSelCoin2] = useState("eth")
  const [mainTxt, setMainTxt] = useState(0)
  const [res, setRes] = useState(0)

  // Función asíncrona para obtener los datos de la API
  const getData = async () => {
    // Hacer petición a la API
    const result = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
    );

    const json = await result.json()

    // Establecer el valor de los datos obtenidos
    setCoin(json);

    // Mostrar datos obtenidos en consola
    // console.log(result.data)
  };
  // Obtener los datos cuando el componente cargue
  useEffect(() => {
    // Datos de la API
    getData()
  }, []);

  useEffect(_ => {
    let a,b
    coin.forEach(({symbol, current_price}) =>{
      if(symbol == selCoin1){
        a = (mainTxt * current_price) / 1
      }else if(symbol == selCoin2){
        b = current_price
      }
    })
    a ? setRes(a / b) : setRes(0)
  },[mainTxt,selCoin1,selCoin2])

  return (
    <div className="contenedor">
      <h2>Comparación de Monedas</h2>

      <div className="input-convert">
        <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />

        <FaExchangeAlt className="icono" />

        <InputConvert coin={coin} sel="eth" fun={setSelCoin2} other={selCoin1} result={res}/>
      </div>
    </div>
  );
}
