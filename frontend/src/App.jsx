import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { router } from './routes/router.jsx'

function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
