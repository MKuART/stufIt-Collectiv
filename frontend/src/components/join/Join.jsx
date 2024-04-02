import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Join() {
  return (
    <div style={{}}>
      <div className='title' style={{ marginTop: '100px' }}>
        <h2>Stuff It</h2>
      </div>
      <div className='join-container' style={{ height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight:'5%', marginLeft:'5%', marginTop:'100px' }}>
        <Link to="/login" className='btn' variant="primary" style={{ height: '5vh', width: '50%', maxWidth: '300px',  minWidth: '150px', marginBottom: '50px' }}>Login</Link>
        <Button className='btn' variant="primary" style={{ height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px', marginBottom: '50px' }}>Registrierung</Button>
        <Button className='btn' variant="primary" style={{ height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px'}}>Anmelden</Button>
      </div>
    </div>
  )
}

export default Join;
