import React from 'react';
import './List.css';
import Marker from '../Marker'
import iconClose from './close.svg';
function List({ items }) {
    return (
        <ul>
            {items.map((item, index) => (
                < li key={index} >
                    {item.icon ? <img src={item.icon} alt='img' className='icon' /> : <Marker addclass={item.addclass} color={item.color} />}
                    <span>{item.title}</span>
                    {item.btn ? <div className='btnX'><img src={iconClose} alt='close' /></div> : ''}
                </li>
            ))}
        </ul>
    )
}
export default List