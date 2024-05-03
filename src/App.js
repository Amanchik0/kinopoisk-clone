import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/addfilm" element={<AddFilm />} />
                <Route path="/profile/:userid" element={<UserProfile />} />
                <Route path="/detail/:filmId" element={<FilmDetail />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path='/addganre' element={<AddGanre/>}/>
                <Route path='/online-cinema' element={<PageNotFound/>} />
                <Route path='/install-tv' element={<PageNotFound/>} />

                {/* <Route path="/panel" element={
                    <PrivateRoute>
                        <AdminPanel />
                    </PrivateRoute>
                } /> */}
                <Route path="/admin/:adminId" element={
                    <PrivateRoute>
                        <AdminProfile />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
