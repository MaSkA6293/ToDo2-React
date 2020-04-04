import React from 'react';
import './List.css';
import Marker from '../Marker'
import iconClose from './close.svg';

import { useHistory } from "react-router-dom";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { del, onActivItem } from '../../../actions';

const List = ({ items, btn, onActivItem, allListTask, stateApp, delet }) => {
    let history = useHistory();
    return (
        <ul className='list'>
            {items.map((item, index) => (

                < li key={index} className={stateApp.activitem && stateApp.activitem.id === item.id ? 'ActivTab' : ''} onClick={!allListTask ? () => { onActivItem(item); history.push(`/lists/${Number(item.id)}`) } : () => { onActivItem(null); history.push('/') }} >
                    {item.icon ? <img src={item.icon} alt='img' className='icon' /> : <Marker addclass='marker' color={item.color.hex} />}
                    <span className='nameList'>{item.name}</span>{btn ? <span>[{item.tasks.length}]</span> : ''}
                    {btn ? <div className='btnX' onClick={() => delet(Number(item.id))}><img src={iconClose} alt='close' /></div> : ''}
                </li>
            ))
            }
        </ul>
    )
}


function mapStateToProps(state) {
    return {
        colors: state.colors,
        tasks: state.tasks,
        stateApp: state.stateApp,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        delet: del,
        onActivItem: onActivItem,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List);