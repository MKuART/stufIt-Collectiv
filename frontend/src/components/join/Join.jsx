import { Link } from 'react-router-dom';


function Join() {
  return (
    <div style={{}}>
      <div className='title' style={{ marginTop: '100px' }}>
        <h2>Stuff It</h2>
      </div>
      <div className='join-container' style={{ height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight:'5%', marginLeft:'5%', marginTop:'100px' }}>
        <Link to="/login" className='btn' variant="primary" style={{ height: '5vh', width: '50%', maxWidth: '300px',  minWidth: '150px', marginBottom: '50px' }}>Login</Link>
        <Link to="/registry" className='btn' variant="primary" style={{ height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px', marginBottom: '50px' }}>Registrierung</Link>
        <Link to='/gast' className='btn' variant="primary" style={{ height: '5vh', width: '50%', maxWidth: '300px', minWidth: '150px'}}>Gast</Link>
      </div>
    </div>
  )
}

export default Join;
