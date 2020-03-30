import React, { Fragment, useContext } from 'react';
import './index.css';
import List from './List';
import iconList from '../../assets/img/list.svg';
import iconPlus from '../../assets/img/plus.svg';
import AddNewList from './AddNewList';
import contextToDo from '../context'

const Leftpanel = () => {
    const context = useContext(contextToDo);

    const { list, colors, delet, add, activ } = context;

    return (
        <Fragment>
            <div className='leftpanel'>
                <List items={[{ icon: iconList, name: 'Все задачи' }]} onactivItem={activ} allListTask={true} />
                {list ? (<List items={list} addclass='marker' btn delet={delet} onactivItem={activ} />) : ('Загрузка...')}
                {list ? (<AddNewList colors={colors} items={[{ icon: iconPlus, name: 'Добавить список' }]} add={add} />) : ('Загрузка Add...')}
            </div >
        </Fragment>
    );
}

export default Leftpanel;
