import React from 'react';
import './List.css';
import Marker from '../Marker'
import iconClose from './close.svg';
const List = ({ items, btn, delet }) => {

    return (
        <ul className='list'>
            {
                items.map((item, index) => (
                    < li key={index} >
                        {item.icon ? <img src={item.icon} alt='img' className='icon' /> : <Marker addclass='marker' color={item.color.hex} />}
                        <span>{item.name}</span>
                        {btn ? <div className='btnX' onClick={() => delet(item.id)}><img src={iconClose} alt='close' /></div> : ''}
                    </li>
                ))
            }
        </ul>
    )
}
export default List