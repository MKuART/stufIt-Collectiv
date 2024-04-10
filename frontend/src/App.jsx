import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { router } from './routes/router.jsx'
import GoToStart from './components/testCookie/goToStart.jsx';



function App() {


  return (
    <>
      <RouterProvider router={router}>
        <GoToStart />
      </RouterProvider>
    </>
  )
}

export default App
