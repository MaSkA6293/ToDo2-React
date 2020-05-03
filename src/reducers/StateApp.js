
const initialstate = {
    activitem: null,
    isOpenPanel: false,
    isOpenPanelAddList: false,
    loadingList: true,
};

export default function (store = initialstate, action) {
    switch (action.type) {
        case "SET_ACTIV_LIST":
            if (action.payload === null) {
                return { ...store, activitem: null, isOpenPanel: false, isOpenPanelAddList: false }
            }
            return { ...store, activitem: { ...action.payload }, isOpenPanel: false };

        case "OPEN_PANEL_ADD_TASK":
            return { ...store, isOpenPanel: true }

        case "CLOSE_PANEL_ADD_TASK":
            return { ...store, isOpenPanel: false }

        case "LOADING_LIST":
            return { ...store, loadingList: action.payload }

        case "TOOGLE_OPEN_PANEL_LIST":
            return { ...store, isOpenPanelAddList: action.payload }

        default:
            return store;
    }
}