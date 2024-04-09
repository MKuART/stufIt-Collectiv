import  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom'; // Importiere useLocation

function Profile() {
  const [budget, setBudget] = useState('');
  const location = useLocation(); // Verwende useLocation, um den Standort zu erhalten
  const searchParams = new URLSearchParams(location.search); // Extrahiere die Abfrageparameter aus dem Standort

  const firstName = searchParams.get('firstName'); // Hole den Wert von 'firstName'
  const lastName = searchParams.get('lastName'); // Hole den Wert von 'lastName'

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  return (
    <div>
      <div className='title' style={{ marginTop: '100px' }}>
        <h2>Stuff It - Profil</h2>
      </div>
      <div className='join-container' style={{ height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight:'5%', marginLeft:'5%', marginTop:'100px' }}>
        <form className='form' onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '20px', width: '50%', maxWidth: '300px', minWidth: '150px' }}>Vorname: {firstName}</div>
          <div style={{ marginBottom: '20px', width: '50%', maxWidth: '300px', minWidth: '150px' }}>Nachname: {lastName}</div>
          <div style={{ marginBottom: '20px', width: '50%', maxWidth: '300px', minWidth: '150px' }}>E-Mail: </div>
          <div style={{ marginBottom: '20px', width: '50%', maxWidth: '300px', minWidth: '150px' }}>Passwort: </div>
          <div style={{ marginBottom: '20px', width: '50%', maxWidth: '300px', minWidth: '150px' }}>Befugnis: </div>
          <input type="number" placeholder="Budget" value={budget} onChange={handleBudgetChange} style={{ marginBottom: '40px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <Button type="submit" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px', minWidth: '150px', marginBottom: '10px' }}>Bearbeiten</Button>
          <Link to="/" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px', minWidth: '150px' }}>Zurück</Link>
        </form>
      </div>
    </div>
  );
}

export default Profile;
