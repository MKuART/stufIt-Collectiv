import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const URI = `http://localhost:5000/account/create`

function Registry() {
const Navigate = useNavigate("")
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    })
    try {
      const response = await fetch(`${URI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
        console.log('Erfolgreich registriert');
        Navigate("/login")
      } else {
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
          <input name='firstname' type="text" placeholder="Vorname" style={{ marginBottom: '20px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <input name='lastname' type="text" placeholder="Nachname" style={{ marginBottom: '20px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <input name='email' type="email" placeholder="E-Mail"  style={{ marginBottom: '20px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required />
          <input name='password' type="password" placeholder="Passwort" style={{ marginBottom: '40px', padding: '5px', height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px' }} required minLength={8} />
          <Button type="submit" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px', minWidth: '150px', marginBottom: '10px' }}>Registrieren</Button>
          <Link to="/" className='btn' variant="primary" style={{ height: '5vh', width: '30%', maxWidth: '300px', minWidth: '150px' }}>Zurück</Link>
        </form>
      </div>
    </div>
  )
}

export default Registry;
