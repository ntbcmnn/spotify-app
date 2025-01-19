import React, { useState } from 'react';
import { IUser } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';
import { unsetUser } from '../../../store/slices/usersSlice';
import { logout } from '../../../store/thunks/usersThunk';
import { NavLink, useNavigate } from 'react-router-dom';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };

  return (
    <div className="d-flex align-items-center gap-4">
      <NavLink className="user-history text-decoration-none" to="/history">Track History</NavLink>

      <div className="dropdown">
        <button
          className="btn btn-outline-light border-0 dropdown-toggle d-inline-flex gap-2 align-items-center"
          type="button"
          onClick={toggleMenu}
        >
          <i className="bi bi-person-circle"></i>
          {user.username}
        </button>
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
          <button className="dropdown-item btn btn-dark" onClick={handleLogOut}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
