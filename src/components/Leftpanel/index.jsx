import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './LeftPanel.scss';
import Lists from '../../containers/List';
import iconList from '../../assets/img/list.svg';
import iconPlus from '../../assets/img/plus.svg';
import AddNewList from '../../containers/AddNewList';
import classnames from 'classnames';
import { useState } from 'react';



const Leftpanel = ({ list, colors, onActivItem }) => {
    const [isopem, setisopen] = useState(false);
    const toggleMobyleMenu = (e) => {
        e.stopPropagation()
        setisopen(!isopem);
    }
    return (
        <Fragment>
            <div className={classnames('leftpanel', isopem ? 'leftpanel_openPanel' : '')}>
                <Lists items={[{ icon: iconList, name: 'Все задачи' }]} allListTask={true} buttonMobyle toggleMobyleMenu={toggleMobyleMenu} />
                {list ? (<Lists items={list} btn onactivItem={onActivItem} />) : ('Загрузка...')}
                {list ? (<AddNewList colors={colors} items={[{ icon: iconPlus, name: 'Добавить список' }]} />) : ('Загрузка Add...')}
            </div >
        </Fragment>
    );
}

Leftpanel.propTypes = {
    list: PropTypes.array,
    colors: PropTypes.array,
    onActivItem: PropTypes.func,
};


export default Leftpanel;

