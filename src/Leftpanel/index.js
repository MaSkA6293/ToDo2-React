import React from 'react';
import './index.css';
import List from './List';
import iconList from './list.svg';
import iconPlus from './plus.svg';
import AddNewList from './AddNewList';
import db from '../assets/db.json';
function Leftpanel() {
    const btn = true;
    return (
        <div className='leftpanel'>
            <List items={[{ icon: iconList, title: 'Все задачи' }]} />
            <List items={[{ title: 'Покупки', color: 'red', addclass: 'marker', btn }, { title: 'Фронтент', color: 'blue', btn, addclass: 'marker' }, { title: 'Фильмы', color: 'green', btn, addclass: 'marker' },]} />
            <AddNewList items={[{ icon: iconPlus, title: 'Добавить список' }]} db={db} />
        </div >
    );
}

export default Leftpanel;
