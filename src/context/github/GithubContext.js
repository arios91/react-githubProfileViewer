import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({children}) => {
    const inititalState = {
        users: [],
        isLoading: false
    }

    const [state, dispatch] = useReducer(githubReducer, inititalState);


    const searchUsers = async (username) => {
        setLoading();
        const params = new URLSearchParams({
            q: username
        })
        const res = await fetch(`${GITHUB_URL}/search/users?${params}`);
        const {items} = await res.json();

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }


    const fetchUsers = async () => {
        setLoading();
        const res = await fetch(`${GITHUB_URL}/users`);
        const data = await res.json();

        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    const clearUsers = () => {
        dispatch({
            type: 'GET_USERS',
            payload: []
        })
    }

    const setLoading = () => dispatch({type: 'SET_LOADING'});

    return <GithubContext.Provider value={{
        users: state.users,
        isLoading: state.isLoading,
        fetchUsers,
        searchUsers,
        clearUsers
    }}>
        {children}
    </GithubContext.Provider>
}



export default GithubContext;