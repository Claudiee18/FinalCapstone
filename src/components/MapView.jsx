import React, { useRef, useState, useCallback, useEffect } from 'react';
import L from 'leaflet';
import { markersData, routesData } from '../data/mapData.js';
import 'leaflet/dist/leaflet.css';
import CurrentLocIcon from '../images/CurrentLocIcon.gif';
import backgroundImage from '../images/FinalMapMap.jpg';
import FlagIcon from '../images/Flag.png';
import { useNavigate } from 'react-router-dom';
import './MapView.css';

function MapView() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false); // Hidden by default
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

  // Toggle navigation panel
  const toggleNavigation = () => {
    setIsNavigationVisible(!isNavigationVisible);
  };

  // Initialize icons
  const currentLocationIcon = L.icon({
    iconUrl: CurrentLocIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    className: 'green-icon',
  });

  const destinationIcon = L.icon({
    iconUrl: FlagIcon,
    iconSize: [20, 20],
    iconAnchor: [10, 12],
    className: 'destination-icon',
  });

  // Add marker function
  const addMarker = useCallback((coords, title, icon) => {
    if (!mapRef.current || !icon) {
      console.error('Map or icon is undefined for marker:', title);
      return;
    }
    const marker = L.marker(coords, { icon: icon })
      .addTo(mapRef.current)
      .bindPopup(title);
    return marker;
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = Object.keys(markersData).filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    const coords = markersData[location].position;
    const imageUrl = markersData[location].image;

    mapRef.current.setView(coords, 1);

    if (currentPopupMarkerRef.current) {
      currentPopupMarkerRef.current.remove();
      currentPopupMarkerRef.current = null;
    }

    const marker = L.marker(coords).addTo(mapRef.current);

    const popupContent = `
      <div style="text-align: center;">
        <h3>${location}</h3>
        <img src="${imageUrl}" alt="${location}" style="width: 150px; height: auto; border-radius: 8px;"/>
      </div>
    `;

    marker
      .bindPopup(popupContent, {
        closeOnClick: false,
        autoClose: false,
      })
      .openPopup();

    currentPopupMarkerRef.current = marker;

    setIsSearchOpen(false);
    setSearchTerm('');
    setSuggestions([]);
  };

  // Set location and destination
  const setLocationAndDestination = useCallback(() => {
    if (!currentLocation || !destination) {
      alert('Please select both current location and destination.');
      return;
    }

    if (currentLocationMarkerRef.current) {
      currentLocationMarkerRef.current.remove();
    }

    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
    }

    if (routeLineRef.current) {
      routeLineRef.current.remove();
      routeLineRef.current = null;
    }

    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }

    if (currentPopupMarkerRef.current) {
      currentPopupMarkerRef.current.closePopup();
      currentPopupMarkerRef.current.remove();
      currentPopupMarkerRef.current = null;
    }

    if (markersData[currentLocation]) {
      currentLocationMarkerRef.current = addMarker(
        markersData[currentLocation].position,
        'Current Location: ' + currentLocation,
        currentLocationIcon
      );
    }

    if (markersData[destination]) {
      destinationMarkerRef.current = addMarker(
        markersData[destination].position,
        'Destination: ' + destination,
        destinationIcon
      );
    }

    const routeKey = `${currentLocation} to ${destination}`;
    if (routesData[routeKey]) {
      const route = routesData[routeKey];
      let i = 1;

      routeLineRef.current = L.polyline([route[0]], {
        color: 'blue',
        weight: 8,
        opacity: 0.8,
        lineCap: 'round',
        lineJoin: 'round',
        className: 'animated-line',
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

      animationIntervalRef.current = animationInterval;
    }
  }, [currentLocation, destination, addMarker, currentLocationIcon, destinationIcon]);

  // Initialize map
  useEffect(() => {
    const map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 0.5,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      zoomControl: true,
    });

    mapRef.current = map;

    const bounds = [[0, 0], [1080, 1920]];
    L.imageOverlay(backgroundImage, bounds).addTo(map);

    const offsetX = 250;
    const adjustedBounds = [
      [0, offsetX],
      [1080, 1920 + offsetX],
    ];
    map.fitBounds(adjustedBounds);

    const defaultZoom = map.getZoom();
    map.setMinZoom(defaultZoom);

    markerGroupRef.current = L.layerGroup().addTo(map);

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Handle location change
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentLocation') {
      setCurrentLocation(value);
    } else if (name === 'destination') {
      setDestination(value);
    }
  };

  // Handle go back
  const handleGoBack = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      <div
        id="map"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: '#fff',
        }}
      />

      {/* Toggle Navigation Button */}
      <button
        onClick={toggleNavigation}
        className="toggle-navigation-button"
      >
        {isNavigationVisible ? '◄' : '►'}
      </button>

      {/* Navigation Panel */}
      <div
        className={`navigation-panel ${isNavigationVisible ? 'visible' : ''}`}
      >
        <h2
          style={{
            margin: '0 0 30px 0',
            color: '#333',
            fontSize: '24px',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            borderBottom: '2px solid #007BFF',
            paddingBottom: '15px',
          }}
        >
          Navigation Panel
        </h2>
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '12px',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
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
              cursor: 'pointer',
            }}
          >
            <option value="">Select Current Location</option>
            {Object.keys(markersData).map((location) => (
              <option key={location} value={location}>
                {markersData[location].name || location}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '12px',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
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
              marginBottom: '20px',
            }}
          >
            <option value="">Select Destination</option>
            {Object.keys(markersData).map((location) => (
              <option key={location} value={location}>
                {markersData[location].name || location}
              </option>
            ))}
          </select>
        </div>

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
            marginBottom: '15px',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
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
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.backgroundColor = '#007BFF';
            e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}
        >
          Go Back
        </button>
      </div>

      {/* Search Button */}
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="search-button"
      >
        🔍
      </button>

      {isSearchOpen && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            right: '80px',
            zIndex: 1000,
            backgroundColor: 'grey',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            width: '250px',
          }}
        >
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
              marginBottom: '10px',
            }}
            autoFocus
          />

          {suggestions.length > 0 && (
            <div
              style={{
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              {suggestions.map((location) => (
                <div
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                    transition: 'background-color 0.2s',
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

      {/* Loading Overlay */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default MapView;