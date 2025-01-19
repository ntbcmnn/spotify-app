import React, { useState } from 'react';
import { ITrack, IUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../store/slices/usersSlice.ts';
import { addTrackToHistory } from '../../store/thunks/trackHistoryThunk.ts';
import Modal from '../UI/Modal/Modal.tsx';

interface Props {
  track: ITrack;
}

const Track: React.FC<Props> = ({track}) => {
  const user: IUser | null = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  const onModalClick = (): void => {
    setShowModal((prevState) => !prevState);
  };

  const playTrack = async () => {
    try {
      if (track.youtubeLink) {
        onModalClick();
      }
      await dispatch(addTrackToHistory(track._id)).unwrap();
    } catch (error) {
      console.error('Failed to add track to history:', error);
    }
  };

  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <p className="m-0 p-0 fs-5"><span className="fw-bold">{track.track_number}.</span> {track.name}</p>
        <div className="d-flex justify-content-end gap-3 align-items-center">
          <p className="m-0 p-0 fw-bold">{track.duration}</p>
          {user ? <button className="btn btn-outline-dark" onClick={playTrack}><i className="bi bi-play-fill"></i>
          </button> : null}
        </div>
      </li>

      {track.youtubeLink && (
        <Modal show={showModal} onModalClick={onModalClick} title={track.name}>
          <iframe
            width="100%"
            height="315"
            src={showModal ? `${track.youtubeLink}?autoplay=1` : undefined}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal>
      )}
    </>
  );
};

export default Track;