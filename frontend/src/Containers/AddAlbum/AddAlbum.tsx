import React, { useEffect, useState } from 'react';
import { IAlbumMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectAlbumCreating, selectAlbumError } from '../../store/slices/albumsSlice.ts';
import { selectAllArtists } from '../../store/slices/artistsSlice.ts';
import { addAlbum } from '../../store/thunks/albumsThunk.ts';
import FileInput from '../../Components/UI/FileInput/FileInput.tsx';
import ButtonLoading from '../../Components/UI/ButtonLoading/ButtonLoading.tsx';
import { fetchArtists } from '../../store/thunks/artistsThunk.ts';

const initialState: IAlbumMutation = {
  name: '',
  artist: {
    _id: '',
    name: '',
  },
  release_year: '',
  image: null,
};

const AddAlbum = () => {
  const [form, setForm] = useState({...initialState});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCreating = useAppSelector(selectAlbumCreating);
  const creatingError = useAppSelector(selectAlbumError);
  const artists = useAppSelector(selectAllArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(addAlbum({albumMutation: form})).unwrap();
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
    setForm((prevState: IAlbumMutation) => ({...prevState, [name]: value}));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {name, files} = e.target;

    if (files) {
      setForm((prevState: IAlbumMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return creatingError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <div
        style={{maxWidth: '500px'}}
        className="container mt-5 bg-white p-4 shadow rounded"
      >
        <h3 className="text-center mb-5 mt-2">Add album</h3>

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
            <label htmlFor="name">Album name</label>
            {getFieldError('name') && (
              <div className="invalid-feedback">{getFieldError('name')}</div>
            )}
          </div>

          <div className="mb-3">
            <select
              name="artist"
              value={form.artist._id}
              onChange={onInputChange}
              className={`form-select ${getFieldError('artist') ? 'is-invalid' : ''}`}
            >
              <option value="" disabled className="bg-gray-25">
                Select artist
              </option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
            <label htmlFor="artist">Artist</label>
            {getFieldError('artist') && (
              <div className="invalid-feedback">{getFieldError('artist')}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="release_year"
              id="release_year"
              value={form.release_year}
              onChange={onInputChange}
              className={`form-control ${getFieldError('release_year') ? 'is-invalid' : ''}`}
            />
            <label htmlFor="release_year">Release year</label>
            {getFieldError('release_year') && (
              <div className="invalid-feedback">{getFieldError('release_year')}</div>
            )}
          </div>

          <div className="mb-3">
            <FileInput
              id="image"
              name="image"
              label="Image"
              onGetFile={onFileChange}
              file={form.image}
              className={`form-control ${getFieldError('image') ? 'is-invalid' : ''}`}
            />

            {getFieldError('image') && (
              <div className="invalid-feedback">{getFieldError('image')}</div>
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

export default AddAlbum;