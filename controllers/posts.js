import pkg from 'mongoose';
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res)=>
{
    try
    {
        console.log(req.body)
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    }
    catch(err)
    {
        res.status(404).json({message:err.message});
    }
 
}

export const createPost =  async (req, res)=>
{   const post = req.body;
    const newPost = new PostMessage(post);
    try
    {
       await newPost.save()
       res.status(201).json(newPost);
    }
    catch(err)
    {
        res.status(409).json(err.message)
    }
}

export const updatePost = async (req, res) => {
    const {id : _id} = req.params;
    const post = req.body;
    try
    {
        if(!pkg.Types.ObjectId.isValid(_id)) return res.status(404).send('No post found with that ID');
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true})
        res.json(updatedPost);
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }

}

export const deletePost = async (req, res) =>{
    const { id } = req.params;
    if(!pkg.Types.ObjectId.isValid(id)) return res.status(404).send('No post found with that ID');
    await PostMessage.findByIdAndRemove(id);
    res.json({message:"Post deleted successfully."})
}

export const likePost = async (req, res) =>{
    const {id} = req.params;
    try
    {
       
        if(!pkg.Types.ObjectId.isValid(id)) return res.status(404).send('No post found with that ID');

        const post = await PostMessage.findById(id);
        console.log(post)
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
        console.log(updatedPost)
        res.json(updatedPost);
        
    }
    catch(err)
    {
        res.status(500).json(err.message)
    }
}