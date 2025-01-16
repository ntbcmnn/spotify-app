import { IArtist } from '../../types';
import React from 'react';
import { Link } from 'react-router-dom';
import { api_URL } from '../../globalConstants.ts';

interface Props {
  artist: IArtist;
}

const Artist: React.FC<Props> = ({artist}) => {
  return (
    <div className="card w-25">
      <>
        {artist.image ?
          (
            <img src={`${api_URL}/${artist.image}`} className="card-img-top" alt={artist.name}/>
          )
          : null

        }
      </>

      <div className="card-body d-flex flex-column gap-3 align-items-center mt-3 mb-3 ">
        <h5 className="card-title">{artist.name}</h5>
        <Link to={`/albums/${artist._id}`} className="btn btn-dark text-decoration-none">View albums</Link>
      </div>
    </div>
  );
};

export default Artist;