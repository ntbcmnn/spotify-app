import React, { useEffect, useState } from 'react';
import { ITrackMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import ButtonLoading from '../../Components/UI/ButtonLoading/ButtonLoading.tsx';
import { selectTrackCreating, selectTrackError } from '../../store/slices/tracksSlice.ts';
import { selectAllAlbums } from '../../store/slices/albumsSlice.ts';
import { addTrack } from '../../store/thunks/tracksThunk.ts';
import { fetchAlbums } from '../../store/thunks/albumsThunk.ts';
import { fetchArtists } from '../../store/thunks/artistsThunk.ts';
import { selectAllArtists } from '../../store/slices/artistsSlice.ts';

const initialState: ITrackMutation = {
  name: '',
  artist: {
    _id: '',
    name: '',
  },
  album: {
    _id: '',
    name: ''
  },
  duration: '',
  track_number: 0,
  youtubeLink: '',
};

const AddTrack = () => {
  const [form, setForm] = useState({...initialState});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCreating = useAppSelector(selectTrackCreating);
  const creatingError = useAppSelector(selectTrackError);
  const albums = useAppSelector(selectAllAlbums);
  const artists = useAppSelector(selectAllArtists);

  useEffect(() => {
    dispatch(fetchArtists);

    if (form.artist._id) {
      dispatch(fetchAlbums(form.artist._id));
    }
  }, [dispatch, form.artist._id]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(fetchArtists());
      await dispatch(fetchAlbums(form.artist._id));
      await dispatch(addTrack({trackMutation: form})).unwrap();
      setForm({...initialState});
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    setForm((prevState: ITrackMutation) => ({...prevState, [name]: value}));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return creatingError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const artistId = e.target.value;
    const selectedArtist = artists.find(artist => artist._id === artistId);

    setForm((prevState: ITrackMutation) => ({
      ...prevState,
      album: {_id: '', name: ''},
      artist: selectedArtist ? selectedArtist : {_id: '', name: ''},
    }));

    if (artistId) {
      dispatch(fetchAlbums(artistId));
    }
  };

  return (
    <>
      <div
        style={{maxWidth: '500px'}}
        className="container mt-5 bg-white p-4 shadow rounded"
      >
        <h3 className="text-center mb-5 mt-2">Add track</h3>

        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={onInputChange}
              className={`form-control ${getFieldError('name') ? 'is-invalid' : ''}`}
            />
            <label htmlFor="name">Track name</label>
            {getFieldError('name') && (
              <div className="invalid-feedback">{getFieldError('name')}</div>
            )}
          </div>

          <div className="mb-3">
            <select
              name="artist"
              value={form.artist._id}
              onChange={onArtistChange}
              className={`form-select ${getFieldError('artist') ? 'is-invalid' : ''}`}
            >
              <option value="" disabled>Select artist</option>
              {artists.map(artist => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
            <label htmlFor="artist">Artist</label>
            {getFieldError('artist') && <div className="invalid-feedback">{getFieldError('artist')}</div>}
          </div>

          <div className="mb-3">
            <select
              name="album"
              value={form.album._id}
              onChange={onInputChange}
              className={`form-select ${getFieldError('album') ? 'is-invalid' : ''}`}
              disabled={!form.artist._id}
            >
              <option value="" disabled>Select album</option>
              {albums.map(album => (
                <option key={album._id} value={album._id}>
                  {album.name}
                </option>
              ))}
            </select>
            <label htmlFor="album">Album</label>
            {getFieldError('album') && <div className="invalid-feedback">{getFieldError('album')}</div>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="duration"
              id="duration"
              placeholder="For example: 0:00"
              value={form.duration}
              onChange={onInputChange}
              className={`form-control ${getFieldError('duration') ? 'is-invalid' : ''}`}
            />
            <label htmlFor="duration">Duration</label>
            {getFieldError('duration') && (
              <div className="invalid-feedback">{getFieldError('duration')}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="track_number"
              id="track_number"
              value={form.track_number}
              onChange={onInputChange}
              className={`form-control ${getFieldError('track_number') ? 'is-invalid' : ''}`}
            />
            <label htmlFor="track_number">Track number</label>
            {getFieldError('track_number') && (
              <div className="invalid-feedback">{getFieldError('track_number')}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="url"
              name="youtubeLink"
              id="youtubeLink"
              placeholder="https://www.youtube.com/embed/example_track_id"
              value={form.youtubeLink}
              onChange={onInputChange}
              className={`form-control ${getFieldError('youtubeLink') ? 'is-invalid' : ''}`}
            />
            <label htmlFor="youtubeLink">Track link</label>
            {getFieldError('youtubeLink') && (
              <div className="invalid-feedback">{getFieldError('youtubeLink')}</div>
            )}
          </div>

          <div className="d-flex gap-3 justify-content-center mb-3">
            <ButtonLoading
              isLoading={isCreating}
              isDisabled={isCreating}
              text="Create"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTrack;