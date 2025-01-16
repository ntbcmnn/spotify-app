import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchTracks } from '../../store/thunks/tracksThunk.ts';
import { selectAllTracks, selectTracksLoading } from '../../store/slices/tracksSlice.ts';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import Track from '../../Components/Track/Track.tsx';
import { ITrack } from '../../types';

const Tracks = () => {
  const {albumId} = useParams();
  const dispatch = useAppDispatch();
  const tracks: ITrack[] = useAppSelector(selectAllTracks);
  const isLoading: boolean = useAppSelector(selectTracksLoading);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracks(albumId));
    }
  }, [dispatch, albumId]);

  const artistName: string = tracks.length > 0 ? tracks[0].album.artist.name : 'No tracks found';
  const albumName: string = tracks.length > 0 ? tracks[0].album.name : 'No tracks found';

  return (
    <div className="container">
      {isLoading ? <Loader/> :
        <>
          <h1 className="mb-4">{artistName}</h1>
          <h2 className="mb-5">{albumName}</h2>
          {tracks.length > 0 ?
            <ul className="list-group list-group-flush d-flex justify-content-center">
              {tracks.map((track: ITrack) => (
                <Track track={track} key={track._id}/>
              ))}
            </ul>
            : <p>No tracks found</p>}
        </>
      }
    </div>
  );
};

export default Tracks;
