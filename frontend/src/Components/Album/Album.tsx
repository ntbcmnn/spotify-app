import { IAlbum } from '../../types';
import { api_URL } from '../../globalConstants.ts';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { deleteAlbum, fetchAlbums, publishAlbum } from '../../store/thunks/albumsThunk.ts';
import { selectUser } from '../../store/slices/usersSlice.ts';

interface Props {
  album: IAlbum;
}

const Album: React.FC<Props> = ({album}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const deleteEssence = async () => {
    if (confirm('Are you sure you want to delete this album?')) {
      await dispatch(deleteAlbum(album._id));
      await dispatch(fetchAlbums(album.artist._id));
    } else {
      toast.info('You undo deleting album');
    }
  };

  const changeStatus = async () => {
    if (confirm('Are you sure you want to publish this album?')) {
      await dispatch(publishAlbum(album._id));
      await dispatch(fetchAlbums(album.artist._id));
    } else {
      toast.info('You undo publishing this album');
    }
  };

  return (
    <div className="card w-25">
      <>
        <img src={`${api_URL}/${album.image}`} className="card-img-top h-100 object-fit-cover" alt={album.name}/>
      </>
      <div className="card-body d-flex flex-column align-items-center">
        <h5 className="card-title">{album.name}</h5>
        <p className="card-text fw-bold mt-0 mb-3 p-0">{album.release_year}</p>

        {
          !album.isPublished ?
            <p className="mt-0 mb-3 p-0 fs-6 text-lowercase text-danger">
              {album.isPublished ? null : 'unpublished'}
            </p>
            : null
        }

        {user && (user.role === 'admin' || (user._id === album.user && !album.isPublished)) ?
          <div className="mt-auto d-flex gap-3 justify-content-center align-items-center mb-3">
            <Link to={`/tracks/${album._id}`} className="btn btn-dark">View tracks</Link>
            <button type="button" className="btn btn-danger" onClick={deleteEssence}>
              <i className="bi bi-trash"></i>
            </button>
          </div> : <Link to={`/tracks/${album._id}`} className="btn btn-dark mb-3">View tracks</Link>
        }

        {
          user?.role === 'admin' && !album.isPublished ?
            <div className="d-flex justify-content-center border-top pt-3 w-75">
              <button
                type="button"
                className="btn btn-outline-dark d-inline-flex align-items-center gap-2"
                onClick={changeStatus}
              >
                Publish
                <i className="bi bi-box-arrow-in-up fs-5"></i>
              </button>
            </div>
            : null
        }
      </div>
    </div>
  );
};

export default Album;