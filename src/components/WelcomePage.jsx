import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import backgroundImage from '../images/pwc_background.jpg';
import './WelcomePage.css';  // Make sure this import is present

function WelcomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGetDirection = () => {
    setLoading(true);  // Set loading to true
    setTimeout(() => {
      navigate('/map');
    }, 2000);  // Increased time to 2 seconds to see the loading
  };

  const handleGuideOverview = () => {
    setLoading(true);  // Set loading to true
    setTimeout(() => {
      navigate('/guide');
    }, 2000);  // Increased time to 2 seconds to see the loading
  };

  return (

    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        padding: '20px'
      }}>
        <h1>Welcome to the <br /> PWC Campus Map</h1>
        <p>Your guide to navigating the campus with ease.</p>
        <p>Explore the map to locate buildings, offices, and other points of interest across the campus.</p>
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={handleGetDirection}
            style={{
              margin: '10px',
              padding: '12px 24px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out'
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            Get Direction
          </button>
          <button 
            onClick={handleGuideOverview}
            style={{
              margin: '10px',
              padding: '12px 24px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out'
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            Guide Overview
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;