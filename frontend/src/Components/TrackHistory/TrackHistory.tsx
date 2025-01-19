import React from 'react';
import { ITrackHistory } from '../../types';
import { api_URL } from '../../globalConstants.ts';

interface Props {
  trackHistory: ITrackHistory;
}

const TrackHistory: React.FC<Props> = ({trackHistory}) => {
  const albumImg = trackHistory.track.album.image;

  return (
    <li className="list-group-item d-flex flex-column gap-2">
      <div className="d-flex align-items-center gap-3 pt-2">
        {albumImg && (
          <img
            src={`${api_URL}/${albumImg}`}
            alt={trackHistory.track.album.name}
            className="album-img"
          />
        )}

        <div className="track-info">
          <h6 className="mb-1">{trackHistory.track.album.artist.name}</h6>
          <p className="mb-1">{trackHistory.track.name}</p>
        </div>
      </div>

      <p className="text-body-tertiary my-2 mx-0 p-0 text-start">{new Date(trackHistory.datetime).toLocaleString()}</p>
    </li>
  );
};

export default TrackHistory;