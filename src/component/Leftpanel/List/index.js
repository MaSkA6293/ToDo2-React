import React, { useContext } from 'react';
import './List.css';
import Marker from '../Marker'
import iconClose from './close.svg';
import contextToDo from '../../context';
const List = ({ items, btn, delet, onactivItem, allListTask }) => {
    const context = useContext(contextToDo);
    const { activItem, history, setactivItem } = context;
    return (
        <ul className='list'>
            {
                items.map((item, index) => (
                    < li key={index} className={activItem && activItem.id === item.id ? 'ActivTab' : ''} onClick={!allListTask ? () => onactivItem(item) : () => { history.push('/'); setactivItem(null) }} >
                        {item.icon ? <img src={item.icon} alt='img' className='icon' /> : <Marker addclass='marker' color={item.color.hex} />}
                        <span className='nameList'>{item.name}</span>{btn ? <span>[{item.tasks.length}]</span> : ''}
                        {btn ? <div className='btnX' onClick={() => delet(item.id)}><img src={iconClose} alt='close' /></div> : ''}
                    </li>
                ))
            }
        </ul>
    )
}
export default List