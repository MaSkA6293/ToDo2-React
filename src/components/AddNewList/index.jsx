import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './AddNewList.scss';

import Marker from '../Marker'
import close from '../../assets/img/close.svg'


const AddNewList = ({ items, colors, addNewList, isOpenPanelAddList, openPanelAddList }) => {

    let [inputValue, setinputValue] = useState('');
    const [activColor, setActivColor] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setActivColor(colors[0].id)
        }
    }, [colors])

    const handlerinput = (e) => setinputValue(inputValue = e.target.value)

    const handlerCloseBtn = () => {
        openPanelAddList(false);
        setinputValue(inputValue = '')
        setActivColor(colors[0].id)
    }

    const handlerAddItem = () => {
        if (inputValue !== '') {
            setisLoading(true);
            axios.post('http://5e82e1d178337f00160ae6e7.mockapi.io/lists', { name: inputValue, colorId: activColor })
                .then(({ data }) => {
                    let color = colors.filter(color => color.id === activColor)[0];
                    let tasks = [];
                    const newitem = { ...data, color, tasks }
                    addNewList(newitem);
                    setisLoading(false)
                    handlerCloseBtn()
                }).catch(() => alert('Ошибка при добавлении элемента списка'))
                .finally(() => setisLoading(false))
        }
        else alert('Введите название списка')
    }

    const onopenPanelAddList = (e) => {

        openPanelAddList(true);

    }
    return (
        <Fragment>
            <ul className='list addListBtn '>
                {items.map((item, index) => (
                    < li key={index} onClick={() => onopenPanelAddList()} >
                        <div className='addListBtn__icon'>
                            <img src={item.icon} alt='img' />
                        </div>
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
            {isOpenPanelAddList && <div className='addNewList list'>
                <input type='text' placeholder='    Название списка' onChange={handlerinput} value={inputValue} autoFocus={true}></input>
                <ul>
                    {colors.map((items, index) => (
                        <li
                            key={index}>
                            <Marker addclass={classNames('markerAll', items.id === activColor ? 'active' : '')} color={items.hex} onClick={() => setActivColor(items.id)} />
                        </li>
                    ))}
                </ul>
                <div className='addNewList__close'>
                    <img src={close} alt='close' onClick={handlerCloseBtn} />
                </div>
                <button className='addNewList__btn button' onClick={handlerAddItem}>{isLoading ? 'Добавление' : 'Добавить'}</button>
            </div>}
        </Fragment>
    )
}


AddNewList.propTypes = {
    addNewList: PropTypes.func,
    colors: PropTypes.array,
    items: PropTypes.array,
    isOpenPanelAddList: PropTypes.bool,
    openPanelAddList: PropTypes.func,
};


export default AddNewList;
