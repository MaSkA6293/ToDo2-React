export const setLists = (action) => {
    return {
        type: "SET_LISTS",
        data: action,
    }
}


export const addNewList = (obj) => {
    return {
        type: "ADD_NEW_LIST",
        data: obj,
    }
}


export const setActivColor = (colorId, colors) => {
    return {
        type: "SET_ACTIV_COLOR",
        colorId: colorId,
        colors: colors
    }
}



export const del = (id) => {
    return {
        type: "DELET_LIST_ITEM",
        data: id,
    }
}

export const onActivItem = (obj) => {
    return {
        type: "SET_ACTIV_LIST",
        data: obj,
    }
}


export const EditNameList = (id, newName) => {
    return {
        type: "SET_NEW_NAME_LIST",
        id: id,
        name: newName
    }
}




export const editTaskText = (id, newName, listId) => {
    return {
        type: "SET_NEW_NAME_TASKS",
        id: id,
        text: newName,
        listId: listId
    }
}



export const deletTask = (id, listId) => {
    return {
        type: "DELET_TASK",
        id: id,
        listId: listId
    }
}



export const complitToDo = (id, listId, completed) => {
    return {
        type: "TOGGLE_COMPLIT_TODO",
        id,
        listId,
        completed
    }
}




export const editTaskName = (action) => {
    return {
        type: "SET_TASKS",
        data: action,
    }
}






export const openPanelAddTask = () => {
    return {
        type: "OPEN_PANEL_ADD_TASK"
    }
}

export const closePanelAddNewTask = () => {
    return {
        type: "CLOSE_PANEL_ADD_TASK"
    }
}



export const addNewTask = (obj) => {
    return {
        type: "ADD_NEW_TASK",
        data: obj,
    }
}

export const toggleLoadingList = (action) => {
    return {
        type: "LOADING_LIST",
        payload: action,
    }
}





