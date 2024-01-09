import axios from 'axios';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();


    const logoutUser = async () => {
        try{
            const headers = {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
            await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {headers});
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            navigate('/login');
        }catch(err){
            console.log(err);
        }

    }

    return(
        <header>
            
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink to='/' className="navbar-brand">Home</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
 
                        <ul className="navbar-nav">
                        {
                            !sessionStorage.getItem('user') ?
                            <>
                                <li className="nav-item">
                                    <NavLink to='/login' className="nav-link">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/register' className="nav-link">Register</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <span className="nav-link" role='button' onClick={()=>logoutUser()}>Logout</span>
                                </li>
                            </>
                        }
                        </ul>
                    </div>
                </div>
            </nav>

        </header>
    )
}


export default Header;