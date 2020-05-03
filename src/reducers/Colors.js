
const state = null;

export default function (store = state, action) {
    switch (action.type) {
        case "SET_COLORS_LIST":
            return [...action.payload];
        default:
            return store;
    }
}