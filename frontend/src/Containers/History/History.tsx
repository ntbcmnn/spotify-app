import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectHistoryLoading, selectTrackHistory } from '../../store/slices/trackHistorySlice.ts';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import TrackHistory from '../../Components/TrackHistory/TrackHistory.tsx';
import { useEffect } from 'react';
import { fetchTrackHistory } from '../../store/thunks/trackHistoryThunk.ts';
import { selectUser } from '../../store/slices/usersSlice.ts';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const trackHistory = useAppSelector(selectTrackHistory);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectHistoryLoading);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    dispatch(fetchTrackHistory());
  }, [dispatch]);

  return (
    <>
      {
        isLoading ? <Loader/> :
          <>
            {trackHistory.length > 0 ?
              <ul className="list-group list-group-flush d-flex justify-content-center">
                {
                  trackHistory.map((history) => (
                    <TrackHistory key={history._id} trackHistory={history}/>
                  ))
                }
              </ul> : <h3 className="text-center">No tracks listened <i className="bi bi-emoji-frown"></i></h3>
            }
          </>
      }
    </>
  );
};

export default History;