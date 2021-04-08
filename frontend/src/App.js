import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/Chart.css';

/** Components imports */
import BarChart from './components/chart';
import ParametersCard from './components/parameters';
import FunctionCard from './components/functionParameters';

function App() {
  const [task, setTask] = useState(1);
  const [chartData, setChartData] = useState({});
  const [computing, setComputing] = useState(false);
  const [field, setField] = useState();
  const [expected, setExpected] = useState();

  const renderChart = (chartData) =>{
    if (Object.keys(chartData).length===0 && computing===false)
    {
      return(
      <div style={{color:'black', fontSize:22}}>
        <p>Wybierz parametry i kliknij <b>SYMULUJ</b> aby wygenerować wykres</p>
      </div>
      )
    }
    else if(Object.keys(chartData).length===0 && computing === true){
      return(
        <div className='Spinner-container'>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )
    }else if(Object.keys(chartData).length!==0){
      return(
        <BarChart type={task===1?'Bar':'Line'} data={chartData}/>
      )
    }
  }

  console.log(expected)
  return (
    <div className="App">
      <header className="App-header">
        Monte Carlo
        <div className="App-header-menu-container">
          <div  className="App-header-menu-item" onClick={()=>{setTask(1)}} style={task===1?{backgroundColor:'#282C34', color:'#FFF8F0', boxShadow:'0px 15px 0px 0px rgba(40,44,52,1)'}:{backgroundColor:'#FFF8F0', color:'#282C34'}}>
            Zadanie 1
          </div>
          <div  className="App-header-menu-item" onClick={()=>{setTask(2)}} style={task===2?{backgroundColor:'#282C34', color:'#FFF8F0',  boxShadow:'0px 15px 0px 0px rgba(40,44,52,1)'}:{backgroundColor:'#FFF8F0', color:'#282C34'}}>
            Zadanie 2
          </div>
        </div>
      </header>

      <main className="Main-container">
        
        {task===1?<ParametersCard setChartData={setChartData} setComputing={setComputing}/>:<FunctionCard setChartData={setChartData} expected={setExpected} field={setField}/>}
        <div className="Chart-card">
          {task===1?
          <div className="Chart-header">
            <h1 style={{marginTop:5}}>Przybliżenie PI</h1>
          </div>
          :
          <div className="Chart-header">
            <h1 style={{marginTop:5}}>Pole figury</h1>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              {expected!==undefined?<h3 style={{fontWeight:'normal', marginRight:5}}>Oczekiwane: <b>{expected}</b></h3>:null} 
              {field!==undefined?<h3 style={{fontWeight:'normal'}}> Obliczone: <b>{field}</b> Błąd: <b>{Math.abs(field-expected).toFixed(5)}</b></h3>:null}
            </div>
          </div>
          }
          {renderChart(chartData)}
        </div>
      </main>

      <footer>
        &#x00a9; J.Pawlowski, B.Czapiewski 
      </footer>
    </div>
  );
}

export default App;
