import './App.css';
import { Route, Routes } from 'react-router-dom';
import Artists from './Containers/Artists/Artists.tsx';
import Toolbar from './Components/UI/Toolbar/Toolbar.tsx';
import Albums from './Containers/Albums/Albums.tsx';
import Tracks from './Containers/Tracks/Tracks.tsx';
import LoginPage from './Containers/LoginPage/LoginPage.tsx';
import RegisterPage from './Containers/RegisterPage/RegisterPage.tsx';
import History from './Containers/History/History.tsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.tsx';
import AddArtist from './Containers/AddArtist/AddArtist.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectUser } from './store/slices/usersSlice.ts';
import AddAlbum from './Containers/AddAlbum/AddAlbum.tsx';
import AddTrack from './Containers/AddTrack/AddTrack.tsx';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Toolbar/>
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<Artists/>}/>
          <Route path="/artists" element={<Artists/>}/>
          <Route
            path="/artists/new"
            element={
              <ProtectedRoute
                isAllowed={user && (user.role === 'admin' || user.role === 'user')}
              >
                <AddArtist/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/albums/new"
            element={
              <ProtectedRoute
                isAllowed={user && (user.role === 'admin' || user.role === 'user')}
              >
                <AddAlbum/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tracks/new"
            element={
              <ProtectedRoute
                isAllowed={user && (user.role === 'admin' || user.role === 'user')}
              >
                <AddTrack/>
              </ProtectedRoute>
            }
          />

          <Route path="/albums/:artistId" element={<Albums/>}/>
          <Route path="/tracks/:albumId" element={<Tracks/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="*" element={<h3 className="text-center">Page not found</h3>}/>
        </Routes>
      </div>
    </>

  );
};

export default App;
