import * as api from "../api/index.js";

//Action creators
export const getPosts = () => async (dispatch) => {
    try
    {
        const {data} = await api.fetchPosts();
        dispatch({type:'FETCH_ALL', payload:[]})
    }
    catch(err)
    {
        console.log(err.message)
    }
}

export const createPost = (post) => async (dispatch) =>
{
    try
    {
        const {data} = await api.createPosts(post);
        dispatch({type:"CREATE", payload:data})
    }
    catch(err)
    {
        console.log(err.message)
    }
}