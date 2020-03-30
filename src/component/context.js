import React from 'react';
export default React.createContext({
    list: [],
    colors: [],
    activItem: null,
    delet: () => { },
    add: () => { },
    activ: () => { },
    setNewItemName: () => { },
    setNewStatus: () => { },
    addTask: () => { },
    isOpenPanel: () => { },
    setisOpenPanel: () => { },
    isLoading: () => { },
    setisLoading: () => { },
    setlist: () => { },
    history: () => { },
    setactivItem: () => { }
})