import React from 'react';
// Import Routes from react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Import Header
import Header from './Components/Header';
// Import Pages
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
    return (
        <BrowserRouter>
            <>
                <Header />
                <div className='container'>
                    <Routes>
                        <Route exact='true' path='/' element={ <Home /> } />
                        <Route path='/login' element={ sessionStorage.getItem('user') ? <Navigate to='/' /> : <Login /> } />
                        <Route path='/register' element={ sessionStorage.getItem('user') ? <Navigate to='/' /> : <Register /> } />
                        
                        <Route path='/:any' element={ <Home /> } />
                    </Routes>
                </div>
            </>
        </BrowserRouter>
        
    );
}

export default App;
