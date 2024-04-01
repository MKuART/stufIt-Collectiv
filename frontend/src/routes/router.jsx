import {createBrowserRouter } from 'react-router-dom';
import Navbar from '../components/nabar/Navbar.jsx';
/* import Join from '../components/join/Join.jsx'; */
import Login from '../components/login/Login.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            }
        ]
        
    }
    
])