import React from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import List from '../components/List'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { del } from '../actions/actionLists';
import { onActivItem } from '../actions/actionStateApp';




const Lists = ({ items, onActivItem, btn, allListTask, stateApp, delet, buttonMobyle, toggleMobyleMenu }) => {
    let history = useHistory();


    const deletItem = (id) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            // axios.delete('http://5e82e1d178337f00160ae6e7.mockapi.io/lists/' + id)
            //     .catch(() => alert('Ошибка удаления'));

            // const task = items.filter(item => Number(item.id) === Number(id))[0].tasks
            // task.map(task => axios.delete('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks/' + task.id)
            //     .catch(() => alert('Ошибка удаления')))
            console.log(id)
            axios.delete('http://localhost:3001/lists/' + Number(id))
                .catch(() => alert('Ошибка удаления'));

            // const task = items.filter(item => Number(item.id) === Number(id))[0].tasks
            // task.map(task => axios.delete('http://localhost:3001/tasks/' + task.id)
            //     .catch(() => alert('Ошибка удаления')))

            delet(Number(id))
        }
    }

    return (
        <List items={items} btn={btn} onActivItem={onActivItem} allListTask={allListTask} deletItem={deletItem} stateApp={stateApp} history={history} buttonMobyle={buttonMobyle} toggleMobyleMenu={toggleMobyleMenu} />
    )
}


function mapStateToProps({ colors, tasks, stateApp }) {
    return {
        colors,
        tasks,
        stateApp,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        delet: del,
        onActivItem
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Lists);