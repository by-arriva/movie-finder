import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const initialState = {
    loading: false,
    search: "",
    page: 1,
    list: null,
    film: null
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));

export function reducer(state, action) {
    switch(action.type) {
        case "LOADING": return {...state, loading: action.payload};
        case "SEARCH": return {...state, search: action.payload};
        case "SEARCH_OK": return {...state, list: action.list, page: action.page, loading: false};
        case "FILM_OK": return {...state, film: action.payload, loading: false};
        default: return state;
    }
}

export function sendRequest(key, value, page, season) {
    return (dispatch, getState) => {
        dispatch({type: "LOADING", payload: true})
        if(key === "s") {
            if(!value) {
                value = getState().search
            }
            dispatch({type: "SEARCH", payload: value})
        }
        return fetch(`http://www.omdbapi.com/?${key}=${value}&apikey=ce762116${page ? "&page="+page : ""}${season ? "&season="+season : ""}${key==="i" ? "&plot=full" : ""}`)
        .then(resp => resp.json())
        .then(res => {
            if(res.Response === "False") {
                throw new Error("False response")
            }
            if(res.Search) {
                dispatch({type: "SEARCH_OK", list: res, page: (page || 1)})
            } else {
                dispatch({type: "FILM_OK", payload: res})
            }
            console.log(res)
        })
        .catch(e => {
            dispatch({type: "LOADING", payload: false})
        })
    };
}

export function randomId() {
    const id = Math.floor((Math.random() * 2155529) + 1).toString()
    return "tt0000000".slice(0, -id.length)+id
}