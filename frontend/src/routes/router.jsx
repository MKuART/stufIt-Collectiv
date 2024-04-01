import {createBrowserRouter } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar.jsx';
import Join from '../components/join/Join.jsx';
import Login from '../components/login/Login.jsx';
import Dashboard from '../components/dashboard/Dashboard.jsx';
import Registry from '../components/registry/Registry.jsx';
import Gast from '../components/gast/Gast.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/registry',
                element: <Registry/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/gast',
                element: <Gast/>
            }
        ]
    }
])