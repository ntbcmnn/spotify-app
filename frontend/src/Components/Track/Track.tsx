import React, { useState } from 'react';
import { ITrack, IUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../store/slices/usersSlice.ts';
import { addTrackToHistory } from '../../store/thunks/trackHistoryThunk.ts';
import Modal from '../UI/Modal/Modal.tsx';
import { toast } from 'react-toastify';
import { deleteTrack, fetchTracks, publishTrack } from '../../store/thunks/tracksThunk.ts';

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

  const deleteEssence = async () => {
    if (confirm('Are you sure you want to delete this track?')) {
      await dispatch(deleteTrack(track._id));
      await dispatch(fetchTracks(track.album._id));
    } else {
      toast.info('You undo deleting this track');
    }
  };

  const changeStatus = async () => {
    if (confirm('Are you sure you want to publish this track?')) {
      await dispatch(publishTrack(track._id));
      await dispatch(fetchTracks(track.album._id));
    } else {
      toast.info('You undo publishing this track');
    }
  };

  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <p className="m-0 p-0 fs-5"><span className="fw-bold">{track.track_number}.</span> {track.name}</p>
        <div className="d-flex justify-content-end gap-3 align-items-center">
          {
            !track.isPublished ?
              <p className="m-0 p-0 fs-6 text-lowercase text-danger">
                {track.isPublished ? null : 'unpublished'}
              </p>
              : null
          }

          {
            user?.role === 'admin' && !track.isPublished ?
              <div className="d-flex justify-content-center w-75">
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

          {user && (user.role === 'admin' || (user._id === track.user && !track.isPublished)) ?
            <div className="mt-auto d-flex gap-3 justify-content-center align-items-center">
              <button type="button" className="btn btn-danger" onClick={deleteEssence}>
                <i className="bi bi-trash"></i>
              </button>
            </div> : null
          }

          <p
            className={track.isPublished ? 'm-0 p-0 fw-bold' : 'm-0 p-0 fw-bold border-start ps-4'}>
            {track.duration}
          </p>

          {user && track.youtubeLink ?
            <button className="btn btn-outline-dark" onClick={playTrack}><i className="bi bi-play-fill"></i>
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