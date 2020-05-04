import React from 'react';
import './Contentpanel.scss';
import PropTypes from 'prop-types';
import classnames from 'classnames'

import edit from '../../assets/img/edit.svg'
import iconPlus from '../../assets/img/plus.svg';
import iconDelet from '../../assets/img/delet.svg';
import { ReactComponent as CheckBox } from '../../assets/img/checkbox.svg';

import NewTask from '../NewTask';

import { Link } from 'react-router-dom';


const Contentpanel = ({
    item,
    empty,
    stateApp,
    openPanelAddTask,
    addNewTask,
    closePanelAddNewTask,
    toggleCompleted,
    oneditTaskText,
    onEditNameList,
    ondeletTask,
    onActivItem
}) => {
    return (
        <div className='main'>
            <div className='main__title title-main'>
                <Link to={`/lists/${item.id}`}

                    className='title-main__link' onClick={() => onActivItem(item)}>
                    <h2 className='title-main__title' style={{ color: item.color.hex }}>{item.name}</h2>
                </Link>
                <img className='title-main__picture' src={edit} alt='edit' onClick={() => onEditNameList(item)} />
            </div>
            {!item.tasks.length && !stateApp.isOpenPanel && !empty && <div className='main__noTask'>Задачи отсутствуют</div>}
            <ul className='main__list list-main' >
                {item.tasks.map((task, index) => (
                    <li key={index} className='list-main__item'> <CheckBox onClick={() => toggleCompleted(task.id, task.listId, task.completed)}
                        className={classnames('list-main__iconMarker', task.completed === true ? 'list-main__completed' : '')} />
                        <span className='list-main__textTask'>{task.text}</span><img className='list-main__edit' src={edit} alt='edit' onClick={() => oneditTaskText(task)} />
                        <img className='list-main__delet' src={iconDelet} alt='edit' onClick={() => ondeletTask(task.id, task.listId)} />
                    </li>
                ))}
            </ul>
            {stateApp.activitem && <div className='main__addNewTask' onClick={openPanelAddTask}> <img src={iconPlus} alt='plus' />Добавить новую задачу</div>}
            {stateApp.isOpenPanel && <NewTask addNewTask={addNewTask} stateApp={stateApp} item={item} closePanelAddNewTask={closePanelAddNewTask} />}
        </div >
    )
}


Contentpanel.propTypes = {
    item: PropTypes.object,
    empty: PropTypes.bool,
    stateApp: PropTypes.object,
    openPanelAddTask: PropTypes.func,
    closePanelAddNewTask: PropTypes.func,
    addNewTask: PropTypes.func,
    toggleCompleted: PropTypes.func,
    oneditTaskText: PropTypes.func,
    onEditNameList: PropTypes.func,
    ondeletTask: PropTypes.func
};


export default Contentpanel;
