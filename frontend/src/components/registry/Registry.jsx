import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Registry() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

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
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        // Erfolgreich registriert
        console.log('Erfolgreich registriert');
      } else {
        // Fehler bei der Registrierung
        console.error('Fehler bei der Registrierung:', response.statusText);
      }
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  return (
    <div>
      <div className='title' style={{ marginTop: '100px' }}>
        <h2>Stuff It</h2>
      </div>
      <div className='join-container' style={{ height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '5%', marginLeft: '5%', marginTop: '100px' }}>
        <h3>Registrieren</h3>
        <form className='form' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input type="text" placeholder="Vorname" value={firstName} onChange={handleFirstNameChange} style={{ marginBottom: '20px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <input type="text" placeholder="Nachname" value={lastName} onChange={handleLastNameChange} style={{ marginBottom: '20px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <input type="email" placeholder="E-Mail" value={email} onChange={handleEmailChange} style={{ marginBottom: '20px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <input type="password" placeholder="Passwort" value={password} onChange={handlePasswordChange} style={{ marginBottom: '40px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <Button type="submit" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px', minWidth: '150px', marginBottom: '10px' }}>Registrieren</Button>
          <Link to="/" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px', minWidth: '150px' }}>Zurück</Link>
        </form>
      </div>
    </div>
  )
}

export default Registry;
