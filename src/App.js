import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import './styles/all.css';

import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import HomePage from './components/Homepage/HomePage';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminPanel from './components/AdminPanel/AdminPanel';
import AddFilm from './components/AddFilm/AddFilm';
import FilmDetail from './components/FilmDetails/FilmDetails';
import AdminProfile from './components/AdminProfile/AdminProfile';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
    return (
        <Router>
            {/* <NavBar /> */}
            <Routes>
            <Route path="/" element={<HomePage />} /> 
                <Route path="/login" element={<LoginPage />} />
                <Route path="addfilm" element={ <AddFilm/>} />
                <Route path="/profile/:userid" element={<UserProfile />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/detail/:filmId" element={<FilmDetail />} /> 
                <Route path="/panel" element={<AdminPanel />} />
                <Route path="/register" element={<RegistrationPage />} />
                {/* <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          } 
        /> */}
            </Routes>
        </Router>
    );
}
//

export default App;
