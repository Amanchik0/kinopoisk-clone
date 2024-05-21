import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import logo from '../../styles/images/logo.svg';
import playIcon from '../../styles/images/icons/play.svg';
import tvIcon from '../../styles/images/icons/TV.svg';

interface User {
  id: number;
  isAdmin: boolean;
}

interface State {
  user: {
    currentUser: User | null;
    isAuthenticated: boolean;
  };
}

const NavBar: React.FC = () => {
  const user = useSelector((state: State) => state.user.currentUser || {} as User);
  const isAuthenticated = useSelector((state: State) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header>
      <div className="head-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="head-menu">
        <Link to="/online-cinema">
          <img src={playIcon} alt="Online Cinema" />
          Онлайн кинотеатр
        </Link>
        <Link to="/install-tv">
          <img src={tvIcon} alt="Install TV" />
          Установить на тв
        </Link>
        <form className="head-menu-search">
          <input name="search" type="text" placeholder="Фильмы, сериалы, персоны" />
          <button type="submit">
            <svg
              className="styles_icon__1bYKL search-form-submit-button__icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M13.6667 8.74984C13.6667 11.4652 11.4654 13.6665 8.75002 13.6665C6.03462 13.6665 3.83335 11.4652 3.83335 8.74984C3.83335 6.03444 6.03462 3.83317 8.75002 3.83317C11.4654 3.83317 13.6667 6.03444 13.6667 8.74984ZM12.7965 14.5643C11.6494 15.3641 10.2545 15.8332 8.75002 15.8332C4.838 15.8332 1.66669 12.6619 1.66669 8.74984C1.66669 4.83782 4.838 1.6665 8.75002 1.6665C12.662 1.6665 15.8334 4.83782 15.8334 8.74984C15.8334 10.2544 15.3643 11.6494 14.5643 12.7966L17.9672 16.1994L16.1994 17.9672L12.7965 14.5643Z"
                fill="#000"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="head-buttons">
        {isAuthenticated ? (
          <>
            <Link to={user.isAdmin ? `/admin/${user.id}` : `/profile/${user.id}`}>Профиль</Link>
            <button onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;
