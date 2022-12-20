import "./Graph.css"
import {useEffect, useState, useRef} from 'react'
import { Line } from "react-chartjs-2";

// importamos la librería de chart.js y sus funciones

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import moment from "moment/moment";

// se registran los plugins a utilizar en el gráfico. para todos los 
//gráficos, si lo queremos para uno solo hay que 
// ponerlos en options en el componente line  


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)
// propiedades que recibe el gráfico. 
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "#04D99D"}){
    const chartStyle = {
        border: {
            display: false
        },
        grid:{
            display: false,  
        },
        ticks: {
            display: false
        }
    }
    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    // definimos las dos variables    
    let data , options
    const [prices, setPrices] = useState()
    const [dates, setDates] = useState()
    const [gradient, setGradient] = useState()
    async function getData(){
        try{
            const response = await fetch(url)
            const json = await response.json()
            setPrices(json.prices.map(item => Math.round(item[1])))
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
        }catch(e){
            console.log("error:",e)
        }
    }
    const chartRef = useRef(null);
    
    useEffect(_ => {
        getData()
        const canvas = chartRef.current.firstChild
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
        BGgradient.addColorStop(0, '#764bbf');   
        BGgradient.addColorStop(1, 'rgba(4, 191, 157, 0)')
        setGradient(BGgradient)
    },[])
    
    
// Cambiamos el tipo de gráfico dependiendo de si es un cero o un 
//uno con switch con dos casos. 


    
    switch(type){
        case 0:  //para las card principal 

            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x:{
                        grid:{
                            display: false
                        }
                    },
                    y:{
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
              }
              // definimos las etiquetas del gráfico los valores 
              //del gráfico son dados por los precios de las criptos en data
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient,
                    tension: .4,
                    pointRadius: 0,
                    fill: true
                  }
                ]
              }
              break
        case 1:// para las card secundarias 
          // hacemos el grafico responsivo 
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x: chartStyle,
                    y: chartStyle
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    tension: .4,
                    pointRadius: 0,
                  }
                ]
              }
            break
    }
   
//     el div es el contenedor del gráfico
// dentro colocamos el componente de la librería Line, el cual recibe las 2 propiedades 

    return (
        <div ref={chartRef} className="graph">
            <Line data={data} options={options}/>
        </div> 
    )
}