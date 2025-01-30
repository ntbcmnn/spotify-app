import Loader from '../../Components/UI/Loader/Loader.tsx';
import { IAlbum } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAlbumsLoading, selectAllAlbums } from '../../store/slices/albumsSlice.ts';
import Album from '../../Components/Album/Album.tsx';
import { useEffect } from 'react';
import { fetchAlbums } from '../../store/thunks/albumsThunk.ts';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../store/slices/usersSlice.ts';

const Albums = () => {
  const {artistId} = useParams();
  const dispatch = useAppDispatch();
  const albums: IAlbum[] = useAppSelector(selectAllAlbums);
  const isLoading: boolean = useAppSelector(selectAlbumsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));
    }
  }, [dispatch, artistId]);

  return (
    <>
      {
        isLoading ? <Loader/> :
          <>
            <h1 className="text-center mb-5">{albums.length > 0 ? albums[0].artist.name : 'No albums found'}</h1>
            <div className="container d-flex flex-wrap gap-4 justify-content-center">
              {
                albums.length > 0 ?
                  albums
                    .filter((album) => {
                      if (album.isPublished) return true;
                      if (!user) return false;
                      return user.role === 'admin' || user._id === album.user;
                    })
                    .map((album: IAlbum) => <Album album={album} key={album._id}/>)
                  : <h1>No albums found</h1>
              }
            </div>
          </>
      }
    </>
  );
};

export default Albums;