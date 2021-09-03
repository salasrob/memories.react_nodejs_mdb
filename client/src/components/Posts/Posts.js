import React from 'react';
import Post from "./Post/Post";
import { useSelector } from 'react-redux';

import useStyles from "./styles.js";
const Posts = () => {
    const posts = useSelector((state)=>state.posts)
    const classes = useStyles();

    console.log(posts)
    return (
        <>
        <Post/>
        </>
    )
}

export default Posts