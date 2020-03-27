import React from 'react';
import './List.css';
import Marker from '../Marker'
import iconClose from './close.svg';
function List({ items, btn, delet }) {
    return (
        <ul>
            {items.map((item, index) => (
                < li key={index} >
                    {item.icon ? <img src={item.icon} alt='img' className='icon' /> : <Marker addclass='marker' color={item.color} />}
                    <span>{item.name}</span>
                    {btn ? <div className='btnX' onClick={(e) => delet(e.target.dataset.id)}><img src={iconClose} data-id={item.id} alt='close' /></div> : ''}
                </li>
            ))}
        </ul>
    )
}
export default List