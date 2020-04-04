import axios from 'axios';
const state = null;

const deletItem = (id, store) => {
    if (window.confirm('Вы действительно хотите удалить?')) {

        axios.delete('http://5e82e1d178337f00160ae6e7.mockapi.io/lists/' + id)
            .catch(() => alert('Ошибка удаления'));

        const task = store.filter(item => Number(item.id) === Number(id))[0].tasks
        console.log(task)
        task.map(task => axios.delete('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks/' + task.id)
            .catch(() => alert('Ошибка удаления')))

        return true
    }
    return false
}
const deletTask = (id) => {
    if (window.confirm('Вы действительно хотите удалить?')) {
        axios.delete('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks/' + id).catch(() => alert('Ошибка удаления'));
        return true
    }
    return false
}
const toggleCompleted = (id, completed) => {
    axios.put('http://5e82e1d178337f00160ae6e7.mockapi.io/tasks/' + id, { completed: !completed })
        .catch(() => {
            alert('Не удалось обновить статус задачи не удалось')
            return false
        })
    return true
}


export default function (store = state, action) {
    switch (action.type) {
        case "SET_LISTS":
            return [...action.data];

        case "DELET_LIST_ITEM":
            return deletItem(action.data, store) ? store.filter(item => Number(item.id) !== action.data) : store


        case "ADD_NEW_LIST":
            return [...store, action.data]


        case "SET_NEW_NAME_LIST":
            return store.map(item => {
                return item.id === action.id ? { ...item, name: action.name } : item
            })

        case "SET_NEW_NAME_TASKS":
            return store.map(item => Number(item.id) === Number(action.listId) ? item = { ...item, tasks: item.tasks.map(task => Number(task.id) === Number(action.id) ? task = { ...task, text: action.text, completed: false } : task) } : item)

        case "ADD_NEW_TASK":
            return store.map(item => item.id === action.data.listId ? item = { ...item, tasks: [...item.tasks, action.data] } : item)

        case "DELET_TASK":
            return deletTask(action.id) ? store.map(item => item.id === action.listId ? item = { ...item, tasks: item.tasks.filter(task => task.id !== action.id) } : item) : store
        case "TOGGLE_COMPLIT_TODO":
            console.log(action)
            return toggleCompleted(action.id, action.completed) ? store.map(item => Number(item.id) === Number(action.listId) ? item = { ...item, tasks: item.tasks.map(task => Number(task.id) === Number(action.id) ? task = { ...task, completed: !task.completed } : task) } : item) : store
        default:
            return store;
    }
}