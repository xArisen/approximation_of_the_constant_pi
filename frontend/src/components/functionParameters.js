import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RangeListElement from './rangeElement';
import '../styles/Function.css'

const ParametersCard = (props) => {
    const [point, setPoint] = useState(null);
    const [ranges, setRanges] = useState([]);
    const [expected, setExpected] = useState();

    useEffect(()=>{
      let samples =  [];
      let values = [];

      ranges.forEach(point=>{
        samples.push(point[0]);
        values.push(point[1]);
      })
      
      props.setChartData({
        samples:samples,
        values:values,
      })
    },[ranges])

    /** Get data from Bartek's API */
    const submitParameters = async () => {
      
      if(ranges.length>0){
        try{
          const answer = await axios.get(`http://localhost:5000/monte_carlo/approximation_of_the_figure_field?runs=500000`,{
            params:{
              points_coordinates:{points_coordinates:[...ranges]},
            }
          })
          props.field(answer.data);

        }catch(e){
          console.log(e);
        }
      }
    }

    const addToRanges = (point) =>{
      if(point!==null)
      {
        setRanges([
          ...ranges,
          point
        ])
      }
    }
    
    const getArrayFromEvent = (event) =>{
      let value = event.target.value;
      let range = value.match(/()(\d+[,.]\d)()*/g);
      let numbers = [];
      if(range!==null){numbers=range[0].split(/[,.]/).map(x=>+x)};  
      return range!==null?numbers:null;
    }

    const changeElement = (index, value) => {
      let current = ranges;
      current.splice(index,1,value);
      setRanges([...current]);
    }

    const deleteElement = (index) => {
      let current = ranges;
      current.splice(index,1);
      setRanges([...current]);
    }

    return(
        <div className="Parameters-card">
          <h1>Przedziały funkcji</h1>

          <div className="Function-parameters-container" >
              {ranges.map((point,index) => (
                <RangeListElement key={index} point={point} index={index} save={changeElement} delete={deleteElement}/>
              ))}

            <div className="Function-parameter-field" >
              <div className="Function-input-container">
                <div className="Function-input-field">
                  <h3 className="Function-parameter-name">Dodaj punkt</h3>
                  <input className="Function-text-input"  
                    placeholder={'0,0'} 
                    onChange={e=>setPoint(getArrayFromEvent(e))} 
                    onFocus={(e) => {e.target.placeholder = ""; e.target.value=""}}
                    onBlur={(e) => e.target.placeholder = '0,0'}/>
                  <button className="Add-button" onClick={()=>{addToRanges(point)}}> Dodaj </button>
                </div>
                
                <div className="Function-input-field">
                  <h3 className="Function-parameter-name">Oczekiwane</h3>
                  <input className="Function-text-input"  
                    placeholder={'0,0'} 
                    onChange={e=>setExpected(parseFloat(e.target.value))} 
                    onFocus={(e) => {e.target.placeholder = ""; e.target.value=""}}
                    onBlur={(e) => e.target.placeholder = '0,0'}/>
                  <button className="Add-button" onClick={()=>{props.expected(expected)}}> Dodaj </button>
                </div>
              </div>
            </div>

          </div>
          <button className="Button" onClick={submitParameters}> SYMULUJ </button>

        </div>
    )
}

export default ParametersCard