import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('URL_DES_BACKEND_ENDPOINTS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful login
        console.log('Erfolgreich eingeloggt');
      } else {
        // Handle login error
        console.error('Fehler beim Einloggen:', response.statusText);
      }
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  return (
    <div style={{}}>
      <div className='title' style={{ marginTop: '100px' }}>
        <h2>Stuff It</h2>
      </div>
      <div className='join-container' style={{ height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight:'5%', marginLeft:'5%', marginTop:'100px' }}>
        <h3>Login</h3>
        <form className='form' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input type="email" placeholder="E-Mail" value={email} onChange={handleEmailChange} style={{ marginBottom: '30px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px',  minWidth: '150px' }} required />
          <input type="password" placeholder="Passwort" value={password} onChange={handlePasswordChange} style={{ marginBottom: '40px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px',  minWidth: '150px' }} required />
          <Button type="submit" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px',  minWidth: '150px', marginBottom: '10px' }}>Login</Button>
          <Link to="/" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px',  minWidth: '150px' }}>Zurück</Link>
        </form>
      </div>
    </div>
  )
}

export default Login;
