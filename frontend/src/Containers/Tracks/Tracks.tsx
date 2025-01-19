import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchTracks } from '../../store/thunks/tracksThunk.ts';
import { selectAllTracks, selectTracksLoading } from '../../store/slices/tracksSlice.ts';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import Track from '../../Components/Track/Track.tsx';
import { ITrack } from '../../types';
import { api_URL } from '../../globalConstants.ts';

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

  const artistName: string = tracks.length > 0 ? tracks[0].album.artist.name : 'No artists found';
  const albumName: string = tracks.length > 0 ? tracks[0].album.name : 'No albums found';
  const albumImage: string | undefined | null = tracks.length > 0 ? tracks[0]?.album?.image : undefined;

  return (
    <div className="container">
      {isLoading ? <Loader/> :
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-4">{artistName}</h1>
              <h2 className="mb-4">{albumName}</h2>
            </div>
            {albumImage && (
              <img src={`${api_URL}/${albumImage}`} alt={albumName} className="mb-5 w-25 h-auto"/>
            )}
          </div>

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
