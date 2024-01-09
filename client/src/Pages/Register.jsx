import React, {useState} from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


const Register = () => {
    const [registerData, setRegisterData] = useState({
        email:'',
        password:''
    });


    const registerUser = async e => {
        try{
            e.preventDefault();
            const res = await axios.post('http://127.0.0.1:8000/api/auth/register', registerData);
            alert('Your account have been created. login now');
            setRegisterData({email:'', password:''});
        }catch(err){
            console.log(err);
        }
    }


    return(
        <div className='w-75 m-auto mt-3'>
            <h3 className='mb-4'>Register</h3>
            <form onSubmit={e=>registerUser(e)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> setRegisterData({...registerData, email: e.target.value}) } />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=> setRegisterData({...registerData, password: e.target.value}) } />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p className='mt-3'>
                Already have an account? <NavLink to='/login' className='text-primary' role='button'>Login</NavLink>
            </p>
        </div>
    )
}


export default Register;