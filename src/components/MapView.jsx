import CurrentLocIcon from '../images/CurrentLocIcon.gif'
import L from 'leaflet';
import { markersData, routesData } from '../data/mapData';
import 'leaflet/dist/leaflet.css';
import { useRef, useState, useCallback, useEffect } from 'react';
import backgroundImage from '../images/FinalMapMap.jpg';  // Add this import at
import './MapView.css';
import FlagIcon from '../images/Flag.png'
import { useNavigate } from 'react-router-dom'; 



function MapView() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentPopupMarkerRef = useRef(null);

  // Initialize icons
  const currentLocationIcon = L.icon({
    iconUrl: CurrentLocIcon,
    iconSize: [25, 25],        // Increased size from 18 to 25
    iconAnchor: [12, 12],      // Adjusted anchor point for new size
    className: 'green-icon'
  });

  const destinationIcon = L.icon({
    iconUrl: FlagIcon,
    iconSize: [20, 20],
    iconAnchor: [10, 12],
    className: 'destination-icon'
  });

  const addMarker = useCallback((coords, title, icon) => {
    if (!mapRef.current || !icon) {
      console.error("Map or icon is undefined for marker:", title);
      return;
    }
    const marker = L.marker(coords, { icon: icon })
      .addTo(mapRef.current)
      .bindPopup(title);
    return marker;
  }, []);



  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = Object.keys(markersData).filter(location =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  // Add this function to handle location selection
  const handleLocationSelect = (location) => {
    const coords = markersData[location].position;
    const imageUrl = markersData[location].image; // Get image URL from markersData


    mapRef.current.setView(coords, 1);  // Adjust zoom level as needed


    if (currentPopupMarkerRef.current) {
      currentPopupMarkerRef.current.remove();
      currentPopupMarkerRef.current = null; // Clear the reference
    }
  

    const marker = L.marker(coords).addTo(mapRef.current);

     // Create a popup with the image and location name
  const popupContent = `
  <div style="text-align: center;">
    <h3>${location}</h3>
    <img src="${imageUrl}" alt="${location}" style="width: 150px; height: auto; border-radius: 8px;"/>
  </div>
`;


marker.bindPopup(popupContent, {
  closeOnClick: false, // Prevent closing when map is clicked
  autoClose: false,    // Prevent closing when another popup is opened
}).openPopup();


currentPopupMarkerRef.current = marker;

  
    setIsSearchOpen(false);
    setSearchTerm('');
    setSuggestions([]);
  };



  

  const setLocationAndDestination = useCallback(() => {
    if (!currentLocation || !destination) {
      alert("Please select both current location and destination.");
      return;
    }

      // Clear existing markers and route (your existing code)
  if (currentLocationMarkerRef.current) {
    currentLocationMarkerRef.current.remove();
  }
    
    
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
    }
    if (routeLineRef.current) {
      routeLineRef.current.remove();
      routeLineRef.current = null;  // Ensure it's reset
    }
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;  // Stop previous animation
  }


   // Close the current popup if it exists
   if (currentPopupMarkerRef.current) {
    currentPopupMarkerRef.current.closePopup();
    currentPopupMarkerRef.current.remove();
    currentPopupMarkerRef.current = null;  // Clear the reference
  }

    // Add new markers
    if (markersData[currentLocation]) {
      currentLocationMarkerRef.current = addMarker(
        markersData[currentLocation].position,
        "Current Location: " + currentLocation,
        currentLocationIcon
      );
    }

    if (markersData[destination]) {
      destinationMarkerRef.current = addMarker(
        markersData[destination].position,
        "Destination: " + destination,
        destinationIcon
      );
    }

    // Draw route
    const routeKey = `${currentLocation} to ${destination}`;
    if (routesData[routeKey]) {
      const route = routesData[routeKey];
      let i = 1;  // Declare i here

      routeLineRef.current = L.polyline([route[0]], {
        color: 'blue',
        weight: 8,
        opacity: 0.8,
        lineCap: 'round',  // Rounded ends
        lineJoin: 'round', // Rounded corners
        className: 'animated-line'
      }).addTo(mapRef.current);

      const animationInterval = setInterval(() => {
        if (i < route.length) {
          const currentPath = routeLineRef.current.getLatLngs();
          currentPath.push(route[i]);
          routeLineRef.current.setLatLngs(currentPath);
          i++;
        } else {
          routeLineRef.current.setLatLngs([route[0]]);
          i = 1;
        }
      }, 500);
    // Adjust speed by changing this value (milliseconds)

    // Store interval reference for cleanup
    animationIntervalRef.current = animationInterval;
    }

  }, [currentLocation, destination, addMarker, currentLocationIcon, destinationIcon]);

  useEffect(() => {
    // Initialize map with full screen container
    const map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: .5,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      zoomControl: true
    });
    
    mapRef.current = map;

    // Set image bounds and overlay
    const bounds = [[0, 0], [1080, 1920]];
    L.imageOverlay(backgroundImage, bounds).addTo(map);

      // Adjust the map view to move it more to the left
  const offsetX = 250; // Adjust this value to move the map left
  const adjustedBounds = [
    [0, offsetX], // Top-left corner (shifted left)
    [1080, 1920 + offsetX] // Bottom-right corner (shifted left)
  ];
    map.fitBounds(adjustedBounds);

    // Set initial zoom level
    const defaultZoom = map.getZoom();
    map.setMinZoom(defaultZoom); 

    // Initialize marker group
    markerGroupRef.current = L.layerGroup().addTo(map);

    // Cleanup function
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentLocation') {
      setCurrentLocation(value);
    } else if (name === 'destination') {
      setDestination(value);
    }
  };

  const handleGoBack = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: '#fff'
    }}>
      <div 
        id="map" 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: '#fff'
        }}
      />
      <div style={{
        position: 'absolute',
        right: '0',
        top: '0',
        height: '100%', 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '30px 20px',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
        zIndex: 2,
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
         <h2 style={{
          margin: '0 0 30px 0',
          color: '#333',
          fontSize: '24px',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          borderBottom: '2px solid #007BFF',
          paddingBottom: '15px'
        }}>
          Navigation Panel
        </h2>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px',
            color: '#333',
            fontWeight: 'bold',
            fontSize: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Current Location:
          </label>
          <select
            name="currentLocation"
            value={currentLocation}
            onChange={handleLocationChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              backgroundColor: '#f8f9fa',
              color: '#495057',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            <option value="">Select Current Location</option>
            {Object.keys(markersData).map(location => (
              <option key={location} value={location}>
                {markersData[location].name || location}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px',
            color: '#333',
            fontWeight: 'bold',
            fontSize: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Destination:
          </label>
          <select
            name="destination"
            value={destination}
            onChange={handleLocationChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              backgroundColor: '#f8f9fa',
              color: '#495057',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            <option value="">Select Destination</option>
            {Object.keys(markersData).map(location => (
              <option key={location} value={location}>
                {markersData[location].name || location}
              </option>
            ))}
          </select>
        </div>



        <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '350px',
          zIndex: 1000,
          width: '45px',
          height: '45px',
          backgroundColor: 'white',
          border: '2px solid rgba(0,0,0,0.2)',
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={e => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}
      >
        <span style={{ fontSize: '20px' }}>🔍</span>
      </button>

      {isSearchOpen && (
        <div style={{
          position: 'absolute',
          top: '70px',
          right: '350px',
          zIndex: 1000,
          backgroundColor: 'grey',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          width: '250px'
        }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search locations..."
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              marginBottom: '10px'
            }}
            autoFocus  // Added to focus input when search opens
          />
          
          {suggestions.length > 0 && (
            <div style={{
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {suggestions.map(location => (
                <div
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>
      )}


       


        <button
  onClick={setLocationAndDestination}
  style={{
    width: '100%',
    padding: '15px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    fontWeight: 'bold',
    fontSize: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
     marginBottom: '15px'
  }}
  onMouseEnter={e => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.backgroundColor = '#0056b3';
    e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.2)';
  }}
  onMouseLeave={e => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.backgroundColor = '#007BFF';
    e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  }}
>
  Find Route
</button>

<button
            onClick={handleGoBack}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.backgroundColor = '#0056b3';
              e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.backgroundColor = '#007BFF';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            Go Back 
          </button>

      </div>
        {/* Loading Overlay */}
        {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}
  

export default MapView; 