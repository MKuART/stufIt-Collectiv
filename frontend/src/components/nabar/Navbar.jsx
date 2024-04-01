import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Join from '../join/Join.jsx';

function Navbar() {
    const [ login, setLogin ] = useState(false)
    const toggleLogin = () => {
        setLogin(prevLogin => !prevLogin);
    };

    return (
        <>
            <nav style={{ border: '1px solid red', height: '90px' }}>
            <button onClick={toggleLogin}>
                {login ? 'Logout' : 'Login'}
            </button>
                <ul>
                    <li>
                        <NavLink to='/login'>Anmeldung</NavLink>
                    </li>
                </ul>
            </nav>
            {login ? null : <Join />}
            <Outlet />
        </>
    );
}

export default Navbar