export const onActivItem = (obj) => {
    return {
        type: "SET_ACTIV_LIST",
        payload: obj,
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


export const toggleLoadingList = (action) => {
    return {
        type: "LOADING_LIST",
        payload: action,
    }
}

export const openPanelAddList = (action) => {
    return {
        type: "TOOGLE_OPEN_PANEL_LIST",
        payload: action,
    }
}