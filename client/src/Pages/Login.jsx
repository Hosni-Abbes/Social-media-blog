import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    });
    const navigate = useNavigate();


    const loginUser = async e => {
        try{
            e.preventDefault();
            const res = await axios.post('http://127.0.0.1:8000/api/auth/login', loginData);
            sessionStorage.setItem('token', res.data.accesstoken);
            sessionStorage.setItem('user', res.data.id);
            navigate('/');
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className='w-75 m-auto mt-3'>
            <h3 className='mb-4'>Login</h3>
            <form onSubmit={e => loginUser(e) }>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> setLoginData({...loginData, email: e.target.value}) } />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=> setLoginData({...loginData, password: e.target.value}) } />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}


export default Login;