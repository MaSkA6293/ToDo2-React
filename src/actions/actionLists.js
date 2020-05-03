export const setLists = (lists) => {
    return {
        type: "SET_LISTS",
        payload: lists,
    }
}

export const addNewList = (obj) => {
    return {
        type: "ADD_NEW_LIST",
        payload: obj,
    }
}


export const del = (id) => {
    return {
        type: "DELET_LIST_ITEM",
        payload: id,
    }
}



export const EditNameList = (id, newName) => {
    return {
        type: "SET_NEW_NAME_LIST",
        payload: {
            id,
            name: newName
        }
    }
}


export const editTaskText = (id, newName, listId) => {
    return {
        type: "SET_NEW_NAME_TASKS",
        payload: {
            id: id,
            text: newName,
            listId: listId
        }
    }
}



export const deletTask = (id, listId) => {
    return {
        type: "DELET_TASK",
        payload: {
            id: id,
            listId: listId
        }
    }
}


export const complitToDo = (id, listId, completed) => {
    return {
        type: "TOGGLE_COMPLIT_TODO",
        payload: {
            id,
            listId,
            completed
        }
    }
}

export const editTaskName = (action) => {
    return {
        type: "SET_TASKS",
        payload: action,
    }
}

export const addNewTask = (obj) => {
    return {
        type: "ADD_NEW_TASK",
        payload: obj,
    }
}