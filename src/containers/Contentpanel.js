import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { complitToDo, editTaskText, deletTask, addNewTask, setLists, EditNameList } from '../actions/actionLists';
import { closePanelAddNewTask, openPanelAddTask, onActivItem } from '../actions/actionStateApp'

import Contentpanel from '../components/Contentpanel'


const Contentpanels = ({
    editTaskText,
    EditNameList,
    item,
    empty,
    complitToDo,
    stateApp,
    deletTask,
    openPanelAddTask,
    addNewTask,
    closePanelAddNewTask }) => {

    const toggleCompleted = (id, listId, completed) => {
        axios.put('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks/' + id, { completed: !completed })
            .catch(() => {
                alert('Не удалось обновить статус задачи не удалось')
            })
        complitToDo(id, listId, completed)
    }

    const oneditTaskText = (curentTask) => {
        const newName = window.prompt('Введите новое значение', curentTask.text)
        if (newName) {
            editTaskText(curentTask.id, newName, curentTask.listId);
            axios.put('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks/' + curentTask.id, { text: newName, completed: false })
                .catch(() => alert('Не удалось обновить название списка'))
        }
    }

    const onEditNameList = (item) => {
        const newName = global.prompt('Введите новое значение', item.name)
        if (newName) {
            axios.put('http://5e82e1d178337f00160ae6e7.mockapi.io/lists/' + item.id, { name: newName })
                .catch(() => alert('Не удалось обновить название списка'))
            EditNameList(item.id, newName);
        }
    }

    const ondeletTask = (id, listId) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            axios.delete('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks/' + id).catch(() => alert('Ошибка удаления'));
            deletTask(id, listId);
        }
    }


    return (
        <Contentpanel
            item={item}
            empty={empty}
            stateApp={stateApp}
            openPanelAddTask={openPanelAddTask}
            addNewTask={addNewTask}
            closePanelAddNewTask={closePanelAddNewTask}
            toggleCompleted={toggleCompleted}
            oneditTaskText={oneditTaskText}
            onEditNameList={onEditNameList}
            ondeletTask={ondeletTask}
            onActivItem={onActivItem} />
    )


}





function mapStateToProps({ stateApp, lists }) {
    return {
        stateApp,
        lists,
        activitem: stateApp.activitem
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        complitToDo,
        editTaskText,
        deletTask,
        openPanelAddTask,
        addNewTask,
        closePanelAddNewTask,
        setLists,
        EditNameList,
        onActivItem,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Contentpanels);
