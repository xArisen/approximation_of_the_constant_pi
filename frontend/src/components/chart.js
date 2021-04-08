import React,{ useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';

import '../styles/Chart.css';

const Chart = (props) => {
    const [chartData, setChartData] = useState({});
    const [options, setChartOptions] = useState({});

    useEffect(()=>{
        chart(props);
    },[props.data])
    
    const chart = (props) =>{
        setChartData({
            labels:props.data.samples,
            datasets:[{
                label:props.type==='Bar'?'Błąd bezwzględny oszacowania':'f(x)',
                data:props.data.values,
                backgroundColor:'#282C34',
                borderColor:'#282C34',
                borderWidth:5,
                barPercentage:1.0,
                categoryPercentage:1.0,
                tension:0
            }],
        })

        setChartOptions({
            layout:{
                padding:25,
            },
            scales:{
                yAxes:[
                    {
                        fontSize:8,
                        ticks:{
                            beginAtZero:true,
                        },
                        title:'Tytul?'
                    }
                ]
            }
        })
    }
     
    return(
        <>
        {props.type==='Bar'?<Bar data={chartData} options={options} redraw/>:<Line data={chartData} options={options} redraw/>}
        </>
    )
}

export default Chart;
