import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import MapView from './components/MapView';
import Guide from './components/WelcomePage';
import GuideOverview from './components/GuideOverview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/guide" element={<GuideOverview />} />
      </Routes>
    </Router>
  );
}

export default App; 