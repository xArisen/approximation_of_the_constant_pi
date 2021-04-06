import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/Chart.css';

/** Components imports */
import BarChart from './components/chart';
import ParametersCard from './components/parameters';

function App() {
  const [chartData, setChartData] = useState({});
  const [computing, setComputing] = useState(false);

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
        <BarChart data={chartData}/>
      )
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        Monte Carlo
      </header>

      <main className="Main-container">
        <ParametersCard setChartData={setChartData} setComputing={setComputing}/>
        <div className="Chart-card">
          <div className="Chart-header">
            <h1 style={{marginTop:5}}>Wykres</h1>
          </div>
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
