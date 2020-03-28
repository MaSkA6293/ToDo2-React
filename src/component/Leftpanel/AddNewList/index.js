import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';

import './AddNewList.css';
import Marker from '../Marker'
import close from './close.svg'
import classNames from 'classnames';


const AddNewList = ({ items, add, colors }) => {
    let [OpenPanel, setOpenPanel] = useState(false);
    let [inputValue, setinputValue] = useState('');
    let [activColor, setActivColor] = useState(null);
    let [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setActivColor(colors[0].id)
        }
    }, [colors])

    const handlerinput = (e) => {
        setinputValue(inputValue = e.target.value)
    }
    const handlerCloseBtn = () => {
        setOpenPanel(OpenPanel = false);
        setinputValue(inputValue = '')
        setActivColor(colors[0].id)
    }
    const handlerAddItem = () => {
        if (inputValue !== '') {
            setisLoading(true);
            axios.post('http://localhost:3001/lists', { name: inputValue, colorId: activColor })
                .then(({ data }) => {
                    let color = colors.filter(color => color.id === activColor)[0];
                    const newitem = {
                        ...data, color
                    }
                    add(newitem);
                    setisLoading(false)
                    handlerCloseBtn()
                }).catch(() => alert('Ошибка при добавлении элемента списка'))
                .finally(() => setisLoading(false))
        }
        else { alert('Введите название списка') }
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
                    {colors.map((items, index) => (
                        <li key={index}><Marker addclass={classNames('markerAll', items.id === activColor ? 'active' : '')} color={items.hex} onClick={() => setActivColor(items.id)} /></li>
                    ))}
                </ul>
                <img className='CloseBtn' src={close} alt='close' onClick={handlerCloseBtn} />

                <button className='addListBtn' onClick={handlerAddItem}>{isLoading ? 'Добавление' : 'Добавить'}</button>
            </div>}
        </Fragment>
    )

}
export default AddNewList