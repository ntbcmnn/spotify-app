import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllArtists, selectArtistsLoading } from '../../store/slices/artistsSlice.ts';
import { IArtist } from '../../types';
import Artist from '../../Components/Artist/Artist.tsx';
import { fetchArtists } from '../../store/thunks/artistsThunk.ts';
import { useEffect } from 'react';
import Loader from '../../Components/UI/Loader/Loader.tsx';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists: IArtist[] = useAppSelector(selectAllArtists);
  const isLoading: boolean = useAppSelector(selectArtistsLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div className="container d-flex gap-4 justify-content-center">
      {isLoading ? <Loader/> :
        <>
          {
            artists.length > 0 ?
              artists.map((artist: IArtist) => (
                <Artist artist={artist} key={artist._id}/>
              )) : <p>No artists found</p>
          }
        </>
      }
    </div>
  );
};

export default Artists;