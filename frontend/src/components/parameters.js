import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/Parameters.css'

const ParametersCard = (props) => {
    const [minSamples, setMinSamples] = useState(0);
    const [maxSamples, setMaxSamples] = useState(0);
    const [difference, setDifference] = useState(0);

    /** Get data from Bartek's API */
    const submitParameters = async () => {

      if(minSamples<=0 || maxSamples > 1_000_000 || difference>1_000_000 || minSamples>maxSamples){return;};

      props.setComputing(true);  
      let samples = [];
      let errorValues = [];
        for(var it = minSamples; it<=maxSamples; it+=difference)
        {
          await axios.get(`http://localhost:5000/monte_carlo?runs=${it}`)
          .then((res)=>{
            errorValues.push(calculateError(res.data));
            console.log(res.data);
          })
          .catch(e=>{console.log(e)});
          samples.push(it);
        }      
      props.setComputing(false);  
      props.setChartData({samples:samples, values:errorValues});

    }
    
    const calculateError = (value) =>{
      const pi = 3.14159265
      return Math.abs(value - pi);
    }

    return(
        <div className="Parameters-card">
          <h1>Parametry</h1>
          <div className="Parameters-container">
            <div className="Parameter-field">
              <h3 className="Parameter-name">Minimalna liczba próbek</h3>
              <input className="Text-input"  placeholder={minSamples} onChange={e=>setMinSamples(parseInt(e.target.value))}/>
            </div>
            <div className="Parameter-field">
              <h3 className="Parameter-name">Maksymalna liczba próbek</h3>
              <input className="Text-input"  placeholder={maxSamples} onChange={e=>setMaxSamples(parseInt(e.target.value))}/>
            </div>
            <div className="Parameter-field">
              <h3 className="Parameter-name">Odstęp między próbkami</h3>
              <input className="Text-input"  placeholder={difference} onChange={e=>setDifference(parseInt(e.target.value))}/>
            </div>
          <button className="Button" onClick={submitParameters}> SYMULUJ </button>
          </div>
        </div>
    )
}

export default ParametersCard