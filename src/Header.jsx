import React from 'react';
import './Header.css';
import { useTheme } from './Context/ThemeProvider';

export default function Header({currencys, fun, cur}){
  const {theme, toggleTheme} = useTheme();
  // definimos la estructura del header y el selector de la moneda respecto a la 
  // cual queremos conocer la valorización de las criptos mostradas en las cards 
  return (
    <header className='app-header'>
      <p>Crypto Stadistics</p>
      <div className='select-button'>
      <select value={cur} name="coinSelect" id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      <button className='toogleMode' onClick={toggleTheme}>
        {theme.img}
      </button>
      </div>
    </header>
  )
}