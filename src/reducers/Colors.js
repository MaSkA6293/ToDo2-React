
const state = null;

export default function (store = state, action) {
    switch (action.type) {
        case "SET_COLORS":
            console.log('red', action)
            return [...action.data];
        default:
            return store;
    }
}