import React, {useState, useRef} from "react";
import "./Convert.css";
import {deleteDec} from './App'

export default function InputConvert({ coin,  sel = "btc", fun, other,text, type = 1, result = 0}) {
  const selRef = useRef(null)
  const [selVal, setSelVal] = useState(sel)

  return (
    <>
    {/* onChange hace que cada vez que ingresemos un nuevo valor en el
    formulario se vuelva a ejecutar la función. y convertimos el valor
    obtenido con el target del input a un número flotante  */}

      <div className="input">
        {(type === 0) ? <input type="number" placeholder="0" onChange={e => {text(parseFloat(e.target.value))}}/>
        : <input type="number" placeholder="0" value={deleteDec(result, 4)} readOnly={true}/>}
        
        <div className="select">
          <img src="" alt="" />
          <select value={selVal} ref={selRef} onChange={() => {
              setSelVal(selRef.current.value)
              fun(selRef.current.value)
            }}>
            {coin.map((co) => {
              // Si el símbolo es igual al valor seleccionado obtenemos la imagen que es el hermano anterior de select. 
              if(co.symbol === selVal){
                selRef.current.previousSibling.src = co.image
                // si es la seleccionada necesito que me muestre el símbolo, ya que existen nombres muy largos 
                return <option value={co.symbol} key={co.id}>{co.symbol}</option>
                // Si es diferente entonces en las opciones si dibuja el nombre, el parámetro 
                // other dentro del else if hace que la modela seleccionada en el primer input 
                // ya no me aparezca en el segundo 
              }else if(co.symbol != other){
                return <option value={co.symbol} key={co.id}>{co.name}</option>
              }
            })}
          </select>
        </div>
      </div>
    </>
  );
}
