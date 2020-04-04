import React, { Fragment } from 'react';
import './index.css';
import List from './List';
import iconList from '../../assets/img/list.svg';
import iconPlus from '../../assets/img/plus.svg';
import AddNewList from './AddNewList';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { del, onActivItem } from '../../actions/index';

const Leftpanel = ({ list, colors }) => {
    return (
        <Fragment>
            <div className='leftpanel'>
                <List items={[{ icon: iconList, name: 'Все задачи' }]} allListTask={true} />
                {list ? (<List items={list} addclass='marker' btn onactivItem={onActivItem} />) : ('Загрузка...')}
                {list ? (<AddNewList colors={colors} items={[{ icon: iconPlus, name: 'Добавить список' }]} />) : ('Загрузка Add...')}
            </div >
        </Fragment>
    );
}



function mapStateToProps(state) {
    return {
        list: state.lists,
        colors: state.colors,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        del: del,
        onActivItem: onActivItem,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Leftpanel);

