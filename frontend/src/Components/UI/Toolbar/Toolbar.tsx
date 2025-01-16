import { NavLink } from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container d-flex align-items-center justify-content-between">
        <NavLink className="navbar-brand text-white" to="/"><i className="bi bi-spotify fs-1 text-success"></i></NavLink>
      </div>
    </nav>
  );
};

export default Toolbar;