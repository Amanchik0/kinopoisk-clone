import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentToFilm } from '../../features/films/filmsSlice';
import star from '../../styles/images/icons/star.svg';
const CommentForm = ({ filmId }) => {
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const rateFilm = (value) => {
    setRating(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      alert('Please log in or register to leave a comment.');
      return;
    }
    dispatch(addCommentToFilm({ filmId, comment: { text: commentText, rate: rating, userId: user.id } }));
    setCommentText('');
    setRating(0);

  };


  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit} className="add-coment-form">
          <p>Оцените фильм</p>
          <div className="coments-stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <img key={value}
                   onClick={() => rateFilm(value)}
                   src={star}
                   
                   alt=""
                   className={value <= rating ? 'active-stars' : ''}
              />
            ))}
          </div>
          <p>Напишите комментарий</p>
          <textarea value={commentText} onChange={e => setCommentText(e.target.value)} />
          <button type="submit">Сохранить</button>
        </form>
      ) : (
        <p>
          <a href="/login">Войдите</a> или <a href="/register">зарегистрируйтесь</a>, чтобы оставить комментарий
        </p>
      )}
    </div>
  );
};

export default CommentForm;
