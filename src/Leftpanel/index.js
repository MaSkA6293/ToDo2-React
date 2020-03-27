import React, { useState } from 'react';
import './index.css';
import List from './List';
import iconList from './list.svg';
import iconPlus from './plus.svg';
import AddNewList from './AddNewList';
import db from '../assets/db.json';
const Leftpanel = () => {
    let [list, setlist] = useState(db.lists.map(item => {
        item.color = db.colors.filter(color => color.id === item.colorId)[0].hex;
        return item;
    }));

    const deletItem = (id) => {
        console.log(id);
        setlist(list.filter(item => item.id !== +id))

    }

    const addNewItem = (obj) => {
        const newList = [...list, obj];
        setlist(newList.map(item => {
            item.color = db.colors.filter(color => color.id === item.colorId)[0].hex;
            return item;
        }))
    }

    return (
        <div className='leftpanel'>
            <List items={[{ icon: iconList, name: 'Все задачи' }]} />
            <List items={list} addclass='marker' btn delet={deletItem} />
            <AddNewList items={[{ icon: iconPlus, name: 'Добавить список' }]} colors={db.colors} add={addNewItem} />
        </div >
    );
}

export default Leftpanel;
