import React, { useContext, useState } from 'react';
import './Contentpanel.css';
import classnames from 'classnames'
import axios from 'axios';
import edit from '../../assets/img/edit.svg'
import iconPlus from '../../assets/img/plus.svg';
import iconDelet from '../../assets/img/delet.svg';
import contextToDo from '../context';
import { Link } from 'react-router-dom';


const Contentpanel = ({ activItem, empty }) => {

    const [addTaskinput, setaddTaskinput] = useState('');



    const context = useContext(contextToDo);

    const { setNewItemName, setNewStatus, addTask, isOpenPanel, setisOpenPanel, isLoading, list, setlist } = context;

    const complitToDo = (task) => {
        const taskchange = !task.completed
        setNewStatus(task.listId, task.id, taskchange)
    }
    const editItemName = (item) => {
        const newName = window.prompt('Введите новое значение', item.name)
        if (newName) {
            setNewItemName(item.id, newName);

        }
    }
    const openPanelAddItem = () => {
        setisOpenPanel(true)
    }

    const addNewTask = () => {
        if (addTaskinput) {
            const obj = {
                listId: activItem.id,
                text: addTaskinput,
                completed: false,
            }
            setaddTaskinput('')

            addTask(obj)
        }


    }
    const handlerInput = (e) => {
        setaddTaskinput(e.target.value);

    }

    const editItemNameTask = (curentTask) => {
        const newName = window.prompt('Введите новое значение', curentTask.text)

        if (newName) {
            const newList = list.map(item => {
                if (item.id === activItem.id) {
                    item.tasks.map(task => {
                        if (task.id === curentTask.id) {
                            task.text = newName;
                            task.completed = false;
                        }
                        return task
                    })
                }
                return item
            })
            setlist(newList)
            axios.patch('http://localhost:3001/tasks/' + curentTask.id, { text: newName, completed: false }).catch(() => {
                alert('Не удалось обновить название списка');
            })
        }

    }


    const deletItemNameTask = (curenttask) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            axios.delete('http://localhost:3001/tasks/' + curenttask.id)
            const newList = list.map(item => {
                console.log(item)
                if (item.id === curenttask.listId) {
                    item.tasks = item.tasks.filter(task => task.id !== curenttask.id)
                }
                return item
            })
            setlist(newList)
        }





    }


    return (
        <div className='content'>
            <div className='nameItem'>
                <Link to={`/lists/${activItem.id}`} > <h2 style={{ color: activItem.color.hex }}>{activItem.name}</h2></Link>
                <img src={edit} alt='edit' onClick={() => editItemName(activItem)} /></div>
            {!activItem.tasks.length && !isOpenPanel && !empty && <div className='noTask'>Задачи отсутствуют </div>}
            <ul>
                {activItem.tasks.map((task, index) => (
                    <li key={index}  > <svg onClick={() => complitToDo(task)} className="iconMarker"
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
                        <span className='TextTask'>{task.text}</span><img src={edit} alt='edit' onClick={() => editItemNameTask(task)} />
                        <img src={iconDelet} alt='edit' onClick={() => deletItemNameTask(task)} />
                    </li>
                ))}
            </ul>

            <div className='addNewTask' onClick={openPanelAddItem}> <img src={iconPlus} alt='plus' />Добавить новую задачу</div>
            {isOpenPanel && <div className='addTask'> <input type='text' placeholder='Название задачи' value={addTaskinput} onChange={handlerInput} autoFocus={true} />
                <button className='btnAddTask' type='submit' onClick={() => addNewTask()}>{!isLoading ? 'Добавить задачу' : 'Добавление'} </button>
                <button className='btnClosePanel' onClick={() => { setisOpenPanel(false); setaddTaskinput('') }}>Отмена</button> </div>}

        </div >
    )
}


export default Contentpanel