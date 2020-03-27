import React, { useState, Fragment } from 'react';
import './AddNewList.css';
import Marker from '../Marker'
import close from './close.svg'
import classNames from 'classnames';
const AddNewList = ({ items, colors, add }) => {
    let [OpenPanel, setOpenPanel] = useState(false);
    let [inputValue, setinputValue] = useState('');
    let [activColor, setActivColor] = useState(colors[0].id);
    const handlerinput = (e) => {
        setinputValue(inputValue = e.target.value)
    }
    const handlerCloseBtn = () => {
        setOpenPanel(OpenPanel = false);
        setinputValue(inputValue = '')
    }
    const handlerAddItem = () => {
        if (inputValue !== '') {
            const newitem = { id: Math.random(), name: inputValue, colorId: activColor }
            add(newitem);
        }

    }


    return (
        <Fragment>
            <ul>
                {items.map((item, index) => (
                    < li key={index} onClick={() => setOpenPanel(OpenPanel = true)} >
                        <img src={item.icon} alt='img' className='icon' />
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>

            {OpenPanel && <div className='addNewList'>
                <input type='text' placeholder='   Название списка' onChange={handlerinput} value={inputValue}></input>
                <ul>
                    {colors.map((color, index) => (
                        <li key={index}><Marker addclass={classNames('markerAll', { 'active': color.id === activColor })} color={color.hex} onClick={() => setActivColor(color.id)} /></li>
                    ))}
                </ul><img src={close} alt='close' onClick={handlerCloseBtn} />
                <div className='CloseAddNewList'> </div>
                <button onClick={handlerAddItem}>Добавить</button>
            </div>}
        </Fragment>
    )

}
export default AddNewList