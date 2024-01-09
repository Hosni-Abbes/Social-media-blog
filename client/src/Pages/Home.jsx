import React, { useState, useEffect } from 'react';
// Import AXIOS
import axios from 'axios';


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoadAction, setIsLoadAction] = useState(false)
    const [createPost, setCreatePost] = useState(false);
    const [renderUpdatePostForm, setRenderUpdatePostForm] = useState('');
    const [postData, setPostData] = useState({
        title:'',
        content:''
    });
    const userId = sessionStorage.getItem('user');
    


    const fetchAllPosts = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/posts/');
            setPosts(response.data);
            setLoading(false);
        }catch(err){
            setLoading(false);
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchAllPosts();
    }, [createPost]);

    // Create Post Function
    const createNewPost = async e => {
        try{
            e.preventDefault();
            setIsLoadAction(true);
            const headers = {'Authorization': `Bearer ${sessionStorage.getItem('token')}`};
            const res = await axios.post('http://127.0.0.1:8000/api/posts/create', postData, {headers});
            alert('Your post has been created!');
            setPosts([...posts, res.data]);
            setPostData({title:'', content:''});
            setCreatePost(false);
            setIsLoadAction(false);
        }catch(err){
            console.log(err);
        }
    }

    // Render Create OR Update Post Form
    const renderCreateUpdatePostForm = () => {
        if(renderUpdatePostForm !== ''){
            return(
                <>
                    <div className='z-99 position-absolute top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-10' 
                    onClick={()=>setCreatePost(false) }></div>
                    <div className='create-post z-1000 position-absolute top-50 start-50 translate-middle bg-white p-3 w-75 m-auto'>
                        <span className='position-absolute top-0 end-0' role='button' onClick={()=>setCreatePost(false) } >x</span>
                        <h4>Update Post</h4>
                        <form onSubmit={e=>updatePost(renderUpdatePostForm, e)}>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='Title' value={postData.title} onChange={e => setPostData({...postData, title: e.target.value}) } />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" cols='5' rows='10'placeholder='Content' style={{resize: 'none'}}
                                    onChange={e => setPostData({...postData, content: e.target.value}) } value={postData.content} ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isLoadAction}>{isLoadAction ? 'Loading' : 'Update'}</button>
                        </form>
                    </div>
                </>
            )
        }else{
            return(
                <>
                    <div className='z-99 position-absolute top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-10' 
                    onClick={()=>setCreatePost(false) }></div>
                    <div className='create-post z-1000 position-absolute top-50 start-50 translate-middle bg-white p-3 w-75 m-auto'>
                        <span className='position-absolute top-0 end-0' role='button' onClick={()=>setCreatePost(false) } >x</span>
                        <h4>Create Post</h4>
                        <form onSubmit={e=>createNewPost(e)}>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='Title' onChange={e => setPostData({...postData, title: e.target.value}) } />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" cols='5' rows='10'placeholder='Content' style={{resize: 'none'}}
                                    onChange={e => setPostData({...postData, content: e.target.value}) } ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={isLoadAction}>{isLoadAction ? 'Loading...' : 'Create'}</button>
                        </form>
                    </div>
                </>
            )
        }
    }

    // Delete Post
    const deletePost = async postId => {
        try{
            const headers = {'Authorization': `Bearer ${sessionStorage.getItem('token')}`};
            const res = await axios.delete(`http://127.0.0.1:8000/api/posts/post/${postId}`,{headers});
            alert('Post have been deleted!');
            setPosts(posts.filter(post=>post.id !== postId) );
        }catch(err){
            console.log(err);
        }
    }

    // Update post 
    const updatePost = async (postId, e) => {
        try{
            e.preventDefault();
            setIsLoadAction(true);
            const headers = {'Authorization': `Bearer ${sessionStorage.getItem('token')}`};
            const res = await axios.put(`http://127.0.0.1:8000/api/posts/post/${postId}`, postData, {headers} );
            alert('Post have been updated');
            const allPosts = posts.filter(post => post.id !== postId);
            setPosts(allPosts.concat(...[res.data]));
            setPostData({title:'', content:''});
            setCreatePost(false);
            setIsLoadAction(false);
            setRenderUpdatePostForm('');
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className='mt-3'>

        {/* Add create post Button */}
        { !loading && sessionStorage.getItem('user') ? 
            <button className='btn bg-secondary text-white' onClick={()=> setCreatePost(true) }>Create post</button>
            : null
        }

            <div className='row posts'>
                {
                    loading ?
                    <div className='text-center'>Loading...</div>
                    :
                    posts.length > 0 ? 
                    posts.map(post => (
                        <div key={post.id} className='col-md-3 col-lg-4 mb-3 p-2'>
                            <div className='bg-light py-2 px-3 '>
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-content">{post.content}</p>
                                {
                                    post.user_id == userId ? 
                                    <>
                                        <span role='button' className='text-danger' onClick={()=>deletePost(post.id)}>Delete</span> 
                                        <span role='button' className='text-info' onClick={()=>{setRenderUpdatePostForm(post.id); setPostData({title:post.title, content:post.content}); setCreatePost(true)} }>Update</span> 
                                    </>
                                    : null
                                }
                            </div>
                        </div>
                    ))
                    :
                    <div>No posts found.</div>
                }

                {
                    createPost && renderCreateUpdatePostForm()
                }
    

            </div>
        </div>
    )
}


export default Home;