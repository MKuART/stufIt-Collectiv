import { Link, useNavigate } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const URIAccount = `http://localhost:1305/account/login`;
const URICustomer = `http://localhost:1305/customer/login`;

function Login() {
  const Navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const adminOrUser = () => {
    setIsLoggedIn((prevMode) => !prevMode);
  };
  
  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    try {
      const response = await fetch(isLoggedIn ? URIAccount : URICustomer, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
        Navigate("/dashboard")
        console.log('Erfolgreich eingeloggt');
      } else {
        alert(`${isLoggedIn ? "Admin" : "User"} not found`);
        console.error('Fehler beim Einloggen:', response.statusText);
      }
    } catch (error) {
      console.error('Fehler:', error);
    }
  }

  return (
    <div>
      <div className='title' style={{ marginTop: '100px' }}>
        <h2>Stuff It</h2>
      </div>
      <div className='join-container' style={{ height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight:'5%', marginLeft:'5%', marginTop:'100px' }}>
        <h3>Login</h3>
        <button onClick={adminOrUser}>Login as {isLoggedIn ? "Admin" : "User"}</button>
        <form className='form' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input name='email' type="email" placeholder="E-Mail" style={{ marginBottom: '30px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px',  minWidth: '150px' }} required />
          <input name='password' type="password" placeholder="Passwort" style={{ marginBottom: '40px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px',  minWidth: '150px' }} required />
          <Button type="submit" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px',  minWidth: '150px', marginBottom: '10px' }}>Login</Button>
          <Link to="/" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px',  minWidth: '150px' }}>Zurück</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
