import { applyMiddleware, createStore, combineReducers } from "redux";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const error = (store) => (next) => (action) => {
    try {
        next(action)
    } catch(e) {
        console.log("err ", e.message);
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

const apiReducer = function (state={}, action) {
    switch (action.type) {
        case "FETCH_USERS_START": {
            state = {...state, fetching: true };
            break;
        }
        case "RECEIVE_USERS": {
            state = {...state, fetching: false, fetched: true, users: action.payload };
            break;
        }
        case "FETCH_USERS_ERR": {
            state = {...state, error: action.payload };
            break;
        }

        case "PROMISE_FETCH_PENDING": {
            state = {...state, fetching: true };
            break;
        }
        case "PROMISE_FETCH_FULFILLED": {
            state = {...state, fetching: false, fetched: true, users: action.payload };
            break;
        }
        case "PROMISE_FETCH_REJECTED": {
            state = {...state, error: action.payload };
        }
    }
    return state;
};

const reducers = combineReducers({
    user: userReducer,
    api: apiReducer
});

const middleware = applyMiddleware(promise(), thunk, logger(), error);

const store = createStore(reducers, {
    user: {
        name: 'KAroly',
        age: 33,
    },
    api: {
        fetching: false,
        fetched: false,
        error: null,
        users: []
    }
}, middleware);

store.subscribe(() => {
    console.log("store changed", store.getState())
});

store.dispatch({type: "CHANGE_NAME", payload: "Karoly Albert"});
store.dispatch({type: "CHANGE_AGE", payload: 25});
store.dispatch({type: "ulo", payload: 25});

store.dispatch((dispatch) => {
    dispatch({type: "FETCH_USERS_START"});
    axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => dispatch({type: "RECEIVE_USERS", payload: response.data}))
        .catch(err => dispatch({type: "FETCH_USERS_ERR", payload: err}));
    axios.get("https://jsonplaceholder.typicode.com/XXX")
        .then(response => dispatch({type: "RECEIVE_USERS", payload: response.data}))
        .catch(err => dispatch({type: "FETCH_USERS_ERR", payload: err}))
});

store.dispatch({
    type: "PROMISE_FETCH",
    payload: axios.get("https://jsonplaceholder.typicode.com/users")
});