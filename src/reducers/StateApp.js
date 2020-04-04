
const state = {
    activitem: {},
    isOpenPanel: false,



    activColor: false,

    loadingList: true,

};

export default function (store = state, action) {
    switch (action.type) {
        case "SET_ACTIV_LIST":
            return { ...store, activitem: { ...action.data } };
        case "SET_ACTIV_COLOR":
            return store;
        case "OPEN_PANEL_ADD_TASK":
            return { ...store, isOpenPanel: true }
        case "CLOSE_PANEL_ADD_TASK":
            return { ...store, isOpenPanel: false }
        case "LOADING_LIST":
            return { ...store, loadingList: action.payload }
        default:
            return store;
    }
}