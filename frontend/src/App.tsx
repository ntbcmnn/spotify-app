import './App.css';
import { Route, Routes } from 'react-router-dom';
import Artists from './Containers/Artists/Artists.tsx';
import Toolbar from './Components/UI/Toolbar/Toolbar.tsx';
import Albums from './Containers/Albums/Albums.tsx';
import Tracks from './Containers/Tracks/Tracks.tsx';

const App = () => <>
  <Toolbar/>
  <div className="container m-5">
    <Routes>
      <Route path="/" element={<Artists/>}/>
      <Route path="/artists" element={<Artists/>}/>
      <Route path="/albums/:artistId" element={<Albums />} />
      <Route path="/tracks/:albumId" element={<Tracks />} />
      <Route path="*" element={<h3 className="text-center">Page not found</h3>}/>
    </Routes>
  </div>
</>;

export default App;
