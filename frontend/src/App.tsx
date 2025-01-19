import './App.css';
import { Route, Routes } from 'react-router-dom';
import Artists from './Containers/Artists/Artists.tsx';
import Toolbar from './Components/UI/Toolbar/Toolbar.tsx';
import Albums from './Containers/Albums/Albums.tsx';
import Tracks from './Containers/Tracks/Tracks.tsx';
import LoginPage from './Containers/LoginPage/LoginPage.tsx';
import RegisterPage from './Containers/RegisterPage/RegisterPage.tsx';
import History from './Containers/History/History.tsx';

const App = () => <>
  <Toolbar/>
  <div className="container m-5">
    <Routes>
      <Route path="/" element={<Artists/>}/>
      <Route path="/artists" element={<Artists/>}/>
      <Route path="/albums/:artistId" element={<Albums/>}/>
      <Route path="/tracks/:albumId" element={<Tracks/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/history" element={<History/>}/>
      <Route path="*" element={<h3 className="text-center">Page not found</h3>}/>
    </Routes>
  </div>
</>;

export default App;
