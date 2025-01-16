import React from 'react';
import { ITrack } from '../../types';

interface Props {
  track: ITrack;
}

const Track: React.FC<Props> = ({track}) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <p className="m-0 p-0 fs-5"><span className="fw-bold">{track.track_number}.</span> {track.name}</p>
      <p className="m-0 p-0 fw-bold">{track.duration}</p>
    </li>
  );
};

export default Track;