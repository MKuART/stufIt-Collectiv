import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { router } from './routes/router.jsx'
import GoToStart from './components/testCookie/goToStart.jsx';
import UserData from './components/Context/UserData.jsx';
import Role from './components/Context/Role.jsx';
import { useState } from 'react';



function App() {

  const [userData, setUserData] = useState([])
  const [role, setRole] = useState([])
  return (
    <>
    <Role.Provider value={{role, setRole}}>
    <UserData.Provider value={{userData, setUserData}}>
      <RouterProvider router={router}>
        <GoToStart />
      </RouterProvider>
    </UserData.Provider>
      </Role.Provider>
    </>
  )
}

export default App
