import { applyMiddleware, createStore, combineReducers } from "redux";

const logger = (store) => (next) => (action) => {
    console.log("action fired ", action);
    next(action)
};
const error = (store) => (next) => (action) => {
    try {
        next(action)
    } catch(e) {
        console.log("err ", e);
    }
};


const userReducer = function (state={}, action) {
    switch (action.type) {
        case "CHANGE_NAME": {
            state = {...state, name: action.payload };
            break;
        }
        case "CHANGE_AGE": {
            state = {...state, age: action.payload };
            break;
        }
        case "ulo": {
            throw new Error("unhandled action " + action.type)
        }
    }
    return state;
};

const tweetsReducer = function (state={}, action) {
    return state;
};

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetsReducer
});

const middleware = applyMiddleware(logger, error);

const store = createStore(reducers, {
    user: {
        name: 'KAroly',
        age: 33,
    },
    tweets: []
}, middleware);

store.subscribe(() => {
    console.log("store changed", store.getState())
});

store.dispatch({type: "CHANGE_NAME", payload: "Karoly Albert"});
store.dispatch({type: "CHANGE_AGE", payload: 25});
store.dispatch({type: "ulo", payload: 25});


