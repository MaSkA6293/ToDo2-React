import React, { useState, useEffect, Fragment } from 'react';
import './index.css';
import List from './List';
import iconList from './list.svg';
import iconPlus from './plus.svg';
import AddNewList from './AddNewList';
import axios from 'axios';
import Contentpanel from '../Contentpanel'
const Leftpanel = ({ listfull, colorsfull }) => {
    const [list, setlist] = useState(null);
    const [colors, setcolors] = useState(null);
    useEffect(() => {
        axios
            .get('http://localhost:3001/lists?_expand=color')
            .then(({ data }) => {
                setlist(data)
            });
        axios.get('http://localhost:3001/colors').then(({ data }) => {
            setcolors(data);
        });
    }, []);



    const deletItem = (id) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            axios.delete('http://localhost:3001/lists/' + id)
            setlist(list.filter(item => item.id !== +id))
        }
    }

    const addNewItem = (obj) => {
        const newList = [...list, obj];
        setlist(newList)
    }

    return (
        <Fragment>
            <div className='leftpanel'>
                <List items={[{ icon: iconList, name: 'Все задачи' }]} />
                {list ? (<List items={list} addclass='marker' btn delet={deletItem} />) : ('Загрузка...')}
                {list ? (<AddNewList colors={colors} items={[{ icon: iconPlus, name: 'Добавить список' }]} add={addNewItem} />) : ('Загрузка Add...')}
            </div >
            <Contentpanel />
        </Fragment>
    );
}

export default Leftpanel;
