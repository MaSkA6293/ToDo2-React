import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';

import './AddNewList.css';
import Marker from '../Marker'
import close from './close.svg'
import classNames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { addNewList } from '../../../actions';

const AddNewList = ({ items, colors, addNewList }) => {

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

            axios.post('http://5e82e1d178337f00160ae6e7.mockapi.io/lists', { name: inputValue, colorId: activColor })
                .then(({ data }) => {
                    let color = colors.filter(color => color.id === activColor)[0];
                    let tasks = [];
                    const newitem = {
                        ...data, color, tasks
                    }

                    addNewList(newitem);
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
                <input type='text' placeholder='   Название списка' onChange={handlerinput} value={inputValue} autoFocus={true}></input>
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
function mapStateToProps(state) {
    return {
        lists: state.lists,
        colors: state.colors,
        tasks: state.tasks,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addNewList: addNewList,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewList);
