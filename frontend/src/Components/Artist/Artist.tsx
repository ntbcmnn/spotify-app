import { IArtist } from '../../types';
import React from 'react';
import { Link } from 'react-router-dom';
import { api_URL } from '../../globalConstants.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../store/slices/usersSlice.ts';
import { deleteArtist, fetchArtists, publishArtist } from '../../store/thunks/artistsThunk.ts';
import { toast } from 'react-toastify';

interface Props {
  artist: IArtist;
}

const Artist: React.FC<Props> = ({artist}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const deleteEssence = async () => {
    if (confirm('Are you sure you want to delete this artist?')) {
      await dispatch(deleteArtist(artist._id));
      await dispatch(fetchArtists());
    } else {
      toast.info('You undo deleting artist');
    }
  };

  const changeStatus = async () => {
    if (confirm('Are you sure you want to publish this artist?')) {
      await dispatch(publishArtist(artist._id));
      await dispatch(fetchArtists());
    } else {
      toast.info('You undo publishing this artist');
    }
  };

  return (
    <div className="card w-25">
      <img
        src={`${api_URL}/${artist.image}`}
        className="card-img-top h-100 object-fit-cover"
        alt={artist.name}
      />

      <div className="card-body d-flex flex-column gap-3 align-items-center mt-3 mb-3">
        <h5 className="card-title m-0 p-0">{artist.name}</h5>

        {!artist.isPublished ?
          <p className="m-0 mb-2 p-0 fs-6 text-lowercase text-danger">
            {artist.isPublished ? null : 'unpublished'}
          </p>
          : null
        }

        {user && (user.role === 'admin' || (user._id === artist.user && !artist.isPublished)) ?
          <div className="d-flex gap-3 align-items-center">
            <Link to={`/albums/${artist._id}`} className="btn btn-dark text-decoration-none">View albums</Link>
            <button type="button" className="btn btn-danger" onClick={deleteEssence}>
              <i className="bi bi-trash"></i>
            </button>
          </div> :
          <Link to={`/albums/${artist._id}`} className="btn btn-dark text-decoration-none">View albums</Link>
        }

        {user?.role === 'admin' && !artist.isPublished ?
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

export default Artist;