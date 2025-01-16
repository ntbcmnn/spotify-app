import { IAlbum } from '../../types';
import { api_URL } from '../../globalConstants.ts';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  album: IAlbum;
}

const Album: React.FC<Props> = ({album}) => {
  return (
    <div className="card w-25">
      <>
        {album.image ?
          (
            <img src={`${api_URL}/${album.image}`} className="card-img-top" alt={album.name}/>
          )
          : null
        }
      </>
      <div className="card-body d-flex flex-column align-items-center">
        <h5 className="card-title">{album.name}</h5>
        <p className="card-text fw-bold">{album.release_year}</p>
        <div className="mt-auto">
          <Link to={`/tracks/${album._id}`} className="btn btn-dark mb-3">View tracks</Link>
        </div>
      </div>
    </div>
  );
};

export default Album;