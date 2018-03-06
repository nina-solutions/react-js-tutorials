import { createStore, combineReducers } from "redux";


const userReducer = function (state={}, action) {
    const newState = {...state};
    switch (action.type) {
        case "CHANGE_NAME": {
            state = {...state, name: action.payload };
            break;
        }
        case "CHANGE_AGE": {
            state = {...state, age: action.payload };
            break;
        }
    }
    return state;
};

const defaultValues = {};
const tweetsReducer = function (state={}, action) {

    return state;
};

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetsReducer
});

const store = createStore(reducers, {
    user: {
        name: 'KAroly',
        age: 33,
    },
    tweets: []
});

store.subscribe(() => {
    console.log("store changed", store.getState())
});

store.dispatch({type: "CHANGE_NAME", payload: "Karoly Albert"});
store.dispatch({type: "CHANGE_AGE", payload: 25});


