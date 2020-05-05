import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './NewTask.scss';

const NewTask = ({ addNewTask, stateApp, item, closePanelAddNewTask }) => {

    const [addTaskinput, setaddTaskinput] = useState('');

    const handlerInput = (e) => setaddTaskinput(e.target.value)

    const onaddNewTask = (item) => {
        if (addTaskinput) {
            const obj = {
                listId: item.id,
                text: addTaskinput,
                completed: false,
            }
            setaddTaskinput('')

            //   axios.post('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks', obj)
            axios.post('http://localhost:3001/tasks/', obj)
                .then(({ data }) => addNewTask(data))
                .catch(() => alert('Ошибка при добавлении элемента списка'))
                .finally()
        }
        else alert('Введите название списка')
    }

    return (
        <div className='addTask'>
            <input className='addTask__input' type='text' placeholder='Название задачи' value={addTaskinput} onChange={handlerInput} autoFocus={true} />
            <div className='addTask-contaner'>
                <button className='addTask__add button' type='submit' onClick={() => onaddNewTask(item)}>
                    {!stateApp.isLoading ? 'Добавить задачу' : 'Добавление'}
                </button>
                <button className='addTask__close button' onClick={() => { closePanelAddNewTask(); setaddTaskinput('') }}>Отмена</button>
            </div>
        </div>
    )

}

NewTask.propTypes = {
    addNewTask: PropTypes.func,
    stateApp: PropTypes.object,
    item: PropTypes.object,
    closePanelAddNewTask: PropTypes.func,
};

export default NewTask
