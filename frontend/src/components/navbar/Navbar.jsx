import { useState } from 'react';
import './navbar.css';
import { NavLink, useNavigate, Routes, Route } from 'react-router-dom';
import Join from '../join/Join.jsx';
import Login from '../login/Login.jsx';
import Dashboard from '../dashboard/Dashboard.jsx';
import Registry from '../registry/Registry.jsx';
import Gast from '../gast/Gast.jsx';

function Navbar() {
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);


    const handleLogin = () => {
        const defaultUserId = '123';
        setUserId(defaultUserId);
        navigate('/profile'); 
    };

    const handleLogout = () => {
        setUserId(null);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    return (
        <>
            <nav style={{ border: '1px solid red', height: '90px', display:'flex' }}>
                <div className='logo-container'>
                    <div className='cards-container'>
                        <div className='card a-card'></div>
                        <div className='card b-card'></div>
                        <div className='card c-card'>0930934827349</div>
                        <div className='card d-card'></div>
                        <div className='card f-card'></div>
                        <div className='card g-card'></div>
                    </div>
                    <h2 className='logo-text'>Stuffit</h2>
                </div>
                <button onClick={userId ? handleLogout : handleLogin}>
                    {userId ? 'Logout' : 'Login'}
                </button>
                <div
                    onClick={ toggleDropdown } 
                    className='drop-down-container' 
                    style={{ border: '1px solid red', height: '90px', width: '200px'}} >
                {showDropdown && (
                <ul>
                    {userId && (
                        <li>
                            <NavLink to='/dashboard'>Dashboard</NavLink>
                        </li>
                    )}
                    {userId && (
                        <li>
                            <NavLink to='/profile'>Profile</NavLink>
                        </li>
                    )}
                    {userId && (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                    {!userId && (
                        <li>
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                    )}
                    {!userId && (
                        <li>
                            <NavLink to='/registry'>Registry</NavLink>
                        </li>
                    )}
                    {!userId && (
                        <li>
                            <NavLink to='/gast'>Gast</NavLink>
                        </li>
                    )}
                </ul>

                )}
                </div>
            </nav>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/registry" element={<Registry onLogin={handleLogin} />} />
                <Route path="/gast" element={<Gast onLogin={handleLogin} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Join />} />
            </Routes>
        </>
    );
}

export default Navbar;