import axios from 'axios';
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
    baseURL: GITHUB_URL
})

export const searchUsers = async (username) => {
    console.log('in here');
    const params = new URLSearchParams({
        q: username
    })
    console.log(params);
    const res = await github.get(`/search/users?${params}`)
    console.log(res);

    return res.data.items;
}

export const getUserAndRepos = async (username) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const [user, repos] = await Promise.all([
        github.get(`/users/${username}`),
        github.get(`/users/${username}/repos?${params}`),
    ])

    return {user: user.data, repos: repos.data}
}

export const getUser = async (username) => {
    const res = await fetch(`${GITHUB_URL}/users/${username}`);

    if(res.status === 404){
        window.location = '/notfound'
    }else{
        const data = await res.json();
        return data
    }
}

export const getUserRepos = async (username) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const res = await fetch(`${GITHUB_URL}/users/${username}/repos?${params}`);
    const data = await res.json();
    return data;
}

export const fetchUsers = async () => {
    const res = await fetch(`${GITHUB_URL}/users`);
    const data = await res.json();

    return data
}