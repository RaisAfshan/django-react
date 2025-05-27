import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/'

// axios.defaults.baseURL = BASE_URL;
// then just axios.get('postBlog/');


export const fetchPosts = createAsyncThunk('postBlog/fetch',async() => {
    const res = await axios.get(`${BASE_URL}postBlog/`);
    return res.data;
});

export const addPost = createAsyncThunk('postBlog/add', async(postData,{ rejectWithValue }) => {
    const formData = new FormData()
    const res = await axios.post(`${BASE_URL}postBlog/`,postData)
    return res.data;
});

export const editPost = createAsyncThunk('postBlog/edit', async({id,postData}) => {
    const res = await axios.put(`${BASE_URL}postBlog/${id}`,postData)
    return res.data;
});

export const deletePost = createAsyncThunk('postBlog/delete', async({id}) => {
    const res = await axios.delete(`${BASE_URL}postBlog/${id}`)
    return id;
});

// const PostSlice = createSlice({
//     name: 'Posts',
//     initialState{

//     }
//     builder
//     .addCase(fetchPosts.fulfilled,(state,))
// })



