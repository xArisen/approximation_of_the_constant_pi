import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/RangeElement.css'
import pencil from '../pencil.png';
import close from '../close.png';
import check from '../check.png';

const Element = (props) =>{

    const [edit, setEdit] = useState(false);
    const [point, setPoint] = useState(props.point);

    const enableEdit = () =>{
        setEdit(!edit);
    }
    const getArrayFromEvent = (event) =>{
        let value = event.target.value;
        let range = value.match(/()(\d+[,.]\d)()*/g)
        return range!==null?range[0].split(/[,.]/):null;
    }

    
    return(
        <div className="Function-list-element">

            <div className="Function-point-name">
                <p>{`${props.index+1}. Punkt: `}</p>
            </div>

            <div className="Function-point-value">
                (
                {edit?
                <input className="Function-text-input-edit" placeholder={`${props.point}`} onChange={e=>{setPoint(getArrayFromEvent(e))}}/>
                :<div>{props.point[0] + ',' + props.point[1]}</div>}
                )
            </div>

            <div className="Function-edit-buttons">
                <div className="Function-button-container" onClick={edit&&point!==null?()=>{props.save(props.index, point);enableEdit()}:enableEdit}>
                    <img className="Function-image" src={edit?check:pencil} />
                </div>
                <div className="Function-button-container" onClick={()=>{props.delete(props.index)}}>
                    <img className="Function-image" src={close} />
                </div>
            </div>

        </div>
    )
}

export default Element