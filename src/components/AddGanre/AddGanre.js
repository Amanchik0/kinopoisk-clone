import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGenre } from '../../features/genres/genresSlice';

const AddGanre = () => {
  const dispatch = useDispatch();
  const [genreName, setGenreName] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setGenreName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!genreName.trim()) {
      setMessage('Пожалуйста, введите название жанра.');
      return;
    }
    dispatch(addGenre({
      name: genreName.trim(),
    }));
    setMessage('Жанр успешно добавлен!');
    setGenreName('');
    setTimeout(() => setMessage(''), 3000); // Скрыть сообщение после 3 секунд
  };

  return (
    <div className="container">
      <div className="main">
        <form onSubmit={handleSubmit} className="form">
          <h3>Добавить новый жанр</h3>
          <fieldset className="fieldset">
            <label>Название жанра</label>
            <input
              type="text"
              name="genreName"
              value={genreName}
              onChange={handleChange}
              placeholder="Введите название жанра"
            />
          </fieldset>
          <fieldset className="fieldset">
            <button type="submit" className="fieldset-button">
              Добавить
            </button>
            {message && <div className="message">{message}</div>}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddGanre;
