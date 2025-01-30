import { IArtistMutation } from '../../types';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectCreating, selectCreatingError } from '../../store/slices/artistsSlice.ts';
import { addArtist } from '../../store/thunks/artistsThunk.ts';
import FileInput from '../../Components/UI/FileInput/FileInput.tsx';
import ButtonLoading from '../../Components/UI/ButtonLoading/ButtonLoading.tsx';

const initialState: IArtistMutation = {
  name: '',
  info: '',
  image: null,
};

const AddArtist = () => {
  const [form, setForm] = useState({...initialState});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const creatingError = useAppSelector(selectCreatingError);
  const isCreating = useAppSelector(selectCreating);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(addArtist({artistMutation: form})).unwrap();
      setForm({...initialState});
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setForm((prevState: IArtistMutation) => ({...prevState, [name]: value}));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {name, files} = e.target;

    if (files) {
      setForm((prevState: IArtistMutation) => ({
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
    <div>
      <>
        <div
          style={{maxWidth: '500px'}}
          className="container mt-5 bg-white p-4 shadow rounded"
        >
          <h3 className="text-center mb-5 mt-2">Add artist</h3>

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
              <label htmlFor="name">Artist's name</label>
              {getFieldError('name') && (
                <div className="invalid-feedback">{getFieldError('name')}</div>
              )}
            </div>

            <div className="mb-3">
            <textarea
              name="info"
              id="info"
              value={form.info}
              onChange={onInputChange}
              className={`form-control ${getFieldError('info') ? 'is-invalid' : ''}`}
            />
              <label htmlFor="info">Artist info</label>
              {getFieldError('info') && (
                <div className="invalid-feedback">
                  {getFieldError('info')}
                </div>
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
    </div>
  );
};

export default AddArtist;