import React, { useState } from 'react';
import './Contentpanel.css';
import classnames from 'classnames'
import edit from '../../assets/img/edit.svg'
import iconPlus from '../../assets/img/plus.svg';
import iconDelet from '../../assets/img/delet.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { complitToDo, editTaskText, deletTask, openPanelAddTask, addNewTask, closePanelAddNewTask, setLists, EditNameList } from '../../actions';



const Contentpanel = ({ editTaskText, EditNameList, item, empty, complitToDo, stateApp, deletTask, openPanelAddTask, addNewTask, closePanelAddNewTask }) => {

    const [addTaskinput, setaddTaskinput] = useState('');
    const handlerInput = (e) => {
        setaddTaskinput(e.target.value);
    }


    const oneditTaskText = (curentTask) => {

        const newName = window.prompt('Введите новое значение', curentTask.text)

        if (newName) {
            editTaskText(curentTask.id, newName, curentTask.listId);


            axios.put('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks/' + curentTask.id, { text: newName, completed: false }).catch(() => {
                alert('Не удалось обновить название списка');
            })
        }

    }


    const onEditNameList = (item) => {
        const newName = window.prompt('Введите новое значение', item.name)
        if (newName) {

            EditNameList(item.id, newName);
            axios.put('http://5e82e1d178337f00160ae6e7.mockapi.io/lists/' + item.id, { name: newName }).catch(() => {
                alert('Не удалось обновить название списка');
            })
        }
    }

    const onaddNewTask = (item) => {
        if (addTaskinput) {
            const obj = {
                listId: item.id,
                text: addTaskinput,
                completed: false,
            }
            setaddTaskinput('')

            axios.post('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks', obj)
                .then(({ data }) => {
                    addNewTask(data)
                }).catch(() => alert('Ошибка при добавлении элемента списка'))
                .finally()
        }
        else alert('Введите название списка')

    }


    return (
        <div className='content'>
            <div className='nameItem'>
                <Link to={`/lists/${Number(item.id)}`} > <h2 style={{ color: item.color.hex }}>{item.name}</h2></Link>
                <img src={edit} alt='edit' onClick={() => onEditNameList(item)} /></div>
            {!item.tasks.length && !stateApp.isOpenPanel && !empty && <div className='noTask'>Задачи отсутствуют </div>}
            <ul>
                {item.tasks.map((task, index) => (
                    <li key={index}  > <svg onClick={() => complitToDo(task.id, task.listId, task.completed)} className="iconMarker"
                        width='30'
                        version="1.1"
                        viewBox="0 0 128 128"
                        xmlns="http://www.w3.org/2000/svg">
                        <g><circle className={classnames(task.completed === true ? 'stcompleted' : 'st0')} cx="64" cy="64" r="64" /></g>
                        <g><path
                            className="st1"
                            d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   
                        c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z" />
                        </g></svg>
                        <span className='TextTask'>{task.text}</span><img src={edit} alt='edit' onClick={() => oneditTaskText(task)} />
                        <img src={iconDelet} alt='edit' onClick={() => deletTask(task.id, task.listId)} />
                    </li>
                ))}
            </ul>

            <div className='addNewTask' onClick={openPanelAddTask}> <img src={iconPlus} alt='plus' />Добавить новую задачу</div>
            {stateApp.isOpenPanel && <div className='addTask'> <input type='text' placeholder='Название задачи' value={addTaskinput} onChange={handlerInput} autoFocus={true} />
                <button className='btnAddTask' type='submit' onClick={() => onaddNewTask(item)}>{!stateApp.isLoading ? 'Добавить задачу' : 'Добавление'} </button>
                <button className='btnClosePanel' onClick={() => { closePanelAddNewTask(); setaddTaskinput('') }}>Отмена</button> </div>}

        </div >
    )
}




function mapStateToProps(state) {
    return {
        stateApp: state.stateApp,
        lists: state.lists,
        activitem: state.stateApp.activitem
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

        complitToDo: complitToDo,
        editTaskText: editTaskText,
        deletTask: deletTask,
        openPanelAddTask: openPanelAddTask,
        addNewTask: addNewTask,
        closePanelAddNewTask: closePanelAddNewTask,
        setLists: setLists,
        EditNameList: EditNameList,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Contentpanel);
