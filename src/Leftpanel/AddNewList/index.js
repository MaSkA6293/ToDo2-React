import React, { useState, Fragment } from 'react';
import './AddNewList.css';
import Marker from '../Marker'
import close from './close.svg'
function AddNewList({ items, db }) {
    let [OpenPanel, setOpenPanel] = useState(false);
    return (
        <Fragment>
            <ul>
                {items.map((item, index) => (
                    < li key={index} onClick={() => setOpenPanel(OpenPanel = true)} >
                        {item.icon ? <img src={item.icon} alt='img' className='icon' /> : <Marker color={item.color} />}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>

            {OpenPanel && <div className='addNewList'>
                <input type='text' placeholder='   Название списка'></input>
                <ul>
                    {db.colors.map((color) => (
                        <li key={color.id}><Marker addclass='markerAll' color={color.hex} /></li>
                    ))}
                </ul><img src={close} alt='close' onClick={() => setOpenPanel(OpenPanel = false)} />
                <div className='CloseAddNewList'> </div>
            </div>}
        </Fragment>
    )

}
export default AddNewList