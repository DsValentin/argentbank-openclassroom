import { createStore } from "redux";

const initialState = {
    token: null,
    userData: null
}

export const setConnexionToken = (e) => {
    console.log(e, "connexionToken")
    return {
        type: "connexionToken",
        payload: e
    }
}

export const setUserData = (e) => {
    return {
        type: "userData",
        payload: e
    }
}

export const signOut = () => {
    return {
        type: "signOut",
        payload: null
    }
}

const storedState = sessionStorage.getItem("state");
const persistedState = storedState ? JSON.parse(storedState) : initialState;

const reducer = (state = persistedState, action) => {
    switch (action.type) {
        case "connexionToken":
            return { 
                ...state,
                token: action.payload
            }
        case "userData":
            return { 
                ...state,
                userData: action.payload
            }
        case "signOut":
            return initialState
        default:
            return state;
    }
}

export const store = createStore(reducer);

store.subscribe(() => {
    sessionStorage.setItem("state", JSON.stringify(store.getState()));
});