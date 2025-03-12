
import L from 'leaflet';
import { markersData, routesData } from '../data/mapData';
import 'leaflet/dist/leaflet.css';

function CampusMap() {
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');

  // Initialize icons
  const currentLocationIcon = L.icon({
    iconUrl: 'greenmarker.png',
    iconSize: [18, 18],
    iconAnchor: [10, 12],
  });

  const destinationIcon = L.icon({
    iconUrl: 'Flag.png',
    iconSize: [15, 15],
    iconAnchor: [10, 12]
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

  const handleLocationChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'currentLocation') {
      setCurrentLocation(value);
    } else if (name === 'destination') {
      setDestination(value);
    }
  }, []);

  const setLocationAndDestination = useCallback(() => {
    if (!currentLocation || !destination) {
      alert("Please select both current location and destination.");
      return;
    }

    // Clear existing markers
    if (currentLocationMarkerRef.current) {
      currentLocationMarkerRef.current.remove();
    }
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
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
      if (routeLineRef.current) {
        routeLineRef.current.remove();
      }
      routeLineRef.current = L.polyline(routesData[routeKey], {
        color: 'blue',
        weight: 3
      }).addTo(mapRef.current);
    }
  }, [currentLocation, destination, addMarker, currentLocationIcon, destinationIcon]);

  useEffect(() => {
    // Initialize map
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
    const image = L.imageOverlay('FinalMapMap.jpg', bounds).addTo(map);
    map.fitBounds(bounds);

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

  return (
    <div className="campus-map">
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      <div className="controls">
        <select 
          name="currentLocation" 
          value={currentLocation} 
          onChange={handleLocationChange}
        >
          <option value="">Select Current Location</option>
          {Object.keys(markersData).map(location => (
            <option key={location} value={location}>
              {markersData[location].name || location}
            </option>
          ))}
        </select>

        <select 
          name="destination" 
          value={destination} 
          onChange={handleLocationChange}
        >
          <option value="">Select Destination</option>
          {Object.keys(markersData).map(location => (
            <option key={location} value={location}>
              {markersData[location].name || location}
            </option>
          ))}
        </select>

        <button onClick={setLocationAndDestination}>
          Set Route
        </button>
      </div>
    </div>
  );
}

export default CampusMap; 