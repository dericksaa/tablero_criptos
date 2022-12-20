import "./Card.css"
import Graph from "./Graph"
import {colorDec} from './App'
// exportamos las propiedades del objeto dentro de la función a 
// los que se les aplicará el hook de usestate en app.js 

export default function Card({coinId, cur, porcentaje, price, img}){
    return (
        // Se arma la estructura de las card secundarias. llamando funcionalidades de graph y las funciones de color dec creada en App.js 
 

        <div className="card">
            <img src={img} alt=""/>
            <div className="con-main">
                <div className="con-title">
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                {/* dependiendo del porcentaje si es negativo o positivo se cambia el color del gráfico  */}
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}