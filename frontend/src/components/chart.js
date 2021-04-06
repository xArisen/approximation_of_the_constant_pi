import React,{ useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';

import '../styles/Chart.css';

const Chart = (props) => {
    const [chartData, setChartData] = useState({});
    const [options, setChartOptions] = useState({});

    useEffect(()=>{
        chart(props);
    },[])
    
    const chart = (props) =>{
        setChartData({
            labels:props.data.samples,
            datasets:[{
                label:'Błąd bezwzględny oszacowania',
                data:props.data.values,
                backgroundColor:'#282C34',
                borderColor:'#282C34',
                borderWidth:5,
                barPercentage:1.0,
                categoryPercentage:1.0,
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
        <Bar data={chartData} options={options} redraw/>
        </>
    )
}

export default Chart;
