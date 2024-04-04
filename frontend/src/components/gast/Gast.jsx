import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Gast() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleLogin = () => {
    // Hier könntest du die Gastanmeldung implementieren
    // Zum Beispiel: Speichern der Gastinformationen im lokalen Speicher oder in einem State-Management-Tool
    const guestInfo = { firstName, lastName };
    console.log('Gast angemeldet:', guestInfo);
    // Hier könnte eine Weiterleitung zu einer Seite erfolgen, auf die der Gast zugreifen darf
    // Beispiel: window.location.href = '/erlaubte-seite';
  };

  return (
    <div style={{}}>
      <div className='title' style={{ marginTop: '100px' }}>
        <h2>Stuff It</h2>
      </div>
      <div className='join-container' style={{ height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight:'5%', marginLeft:'5%', marginTop:'100px' }}>
        <h3>Gast Anmeldung</h3>
        <form className='form' onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input type="text" placeholder="Vorname" value={firstName} onChange={handleFirstNameChange} style={{ marginBottom: '20px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <input type="text" placeholder="Nachname" value={lastName} onChange={handleLastNameChange} style={{ marginBottom: '40px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <Button type="submit" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px', minWidth: '150px', marginBottom: '10px' }}>Als Gast anmelden</Button>
          <Link to="/" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px', minWidth: '150px' }}>Zurück</Link>
        </form>
      </div>
    </div>
  );
}

export default Gast;
