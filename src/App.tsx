import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import './styles/all.css';

import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import HomePage from './components/Homepage/HomePage';
// import AdminPanel from './components/AdminPanel/AdminPanel';
import AddFilm from './components/AddFilm/AddFilm';
import FilmDetail from './components/FilmDetails/FilmDetails';
import AdminProfile from './components/AdminProfile/AdminProfile';
import UserProfile from './components/UserProfile/UserProfile';
import EditProfile from './components/EditProfile/EditProfile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AddGanre from './components/AddGanre/AddGanre';
import PageNotFound from './components/PageNotFound';
import ErrorBoundary from './ErrorBoundary';

const App: React.FC = () => {
    const UserProfileWithNavigate = () => {
        const navigate = useNavigate();
        return <UserProfile navigate={navigate} />;
      };
      const FilmDetailWithNavigate = () => {
        const navigate = useNavigate();
        const { filmId } = useParams<{ filmId: string }>();
        return <FilmDetail navigate={navigate} filmId={filmId!} />;
      };
  return (
    <Router>
       <ErrorBoundary>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addfilm" element={<AddFilm />} />
        <Route path="/profile/:userid" element={<UserProfileWithNavigate  />} />
        <Route path="/detail/:filmId" element={<FilmDetailWithNavigate  />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/addganre" element={<AddGanre />} />
        <Route path="/online-cinema" element={<PageNotFound />} />
        <Route path="/install-tv" element={<PageNotFound />} />
        <Route
          path="/admin/:adminId"
          element={
            <PrivateRoute>
              <AdminProfile />
            </PrivateRoute>
          }
        />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
