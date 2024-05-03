import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToWatch, removeFromToWatch } from '../../features/user/userSlice';

const UserProfile = () => {
    const user = useSelector(state => state.user.currentUser);
    const watchList = useSelector(state => state.user.watchList);
    const films = useSelector(state => state.films.items);
    const dispatch = useDispatch();

    // Helper function to find film details by ID
    const findFilmById = (filmId) => films.find(film => film.id === filmId);

    const toggleWatchList = (filmId) => {
        if (watchList.includes(filmId)) {
            dispatch(removeFromToWatch(filmId));
        } else {
            dispatch(addToWatch(filmId));
        }
    };

    return (
        <div>
            <h1>My Profile</h1>
            <ul>
                {watchList.map(filmId => {
                    const film = findFilmById(filmId);
                    return film ? (
                        <li key={film.id}>
                            <p>{film.title}</p>
                            <button onClick={() => toggleWatchList(film.id)}>
                                {watchList.includes(film.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                            </button>
                        </li>
                    ) : null;
                })}
            </ul>
        </div>
    );
};

export default UserProfile;
