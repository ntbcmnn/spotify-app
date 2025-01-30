import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllArtists, selectArtistsLoading } from '../../store/slices/artistsSlice.ts';
import { IArtist } from '../../types';
import Artist from '../../Components/Artist/Artist.tsx';
import { fetchArtists } from '../../store/thunks/artistsThunk.ts';
import { useEffect } from 'react';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import { selectUser } from '../../store/slices/usersSlice.ts';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists: IArtist[] = useAppSelector(selectAllArtists);
  const isLoading: boolean = useAppSelector(selectArtistsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div className="d-flex gap-4 flex-wrap justify-content-center">
      {
        isLoading ?
          <Loader/>
          :
          <>
            {
              artists.length > 0 ?
                artists
                  .filter((artist) => {
                    if (artist.isPublished) return true;
                    if (!user) return false;
                    return user.role === 'admin' || user._id === artist.user;
                  })
                  .map((artist: IArtist) => <Artist artist={artist} key={artist._id}/>)
                :
                <h1>No artists found</h1>
            }
          </>
      }
    </div>
  );

};

export default Artists;