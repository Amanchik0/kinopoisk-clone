import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { addCommentToFilm } from '../../features/films/filmsSlice';
import star from '../../styles/images/icons/star.svg';

interface CommentFormProps {
  filmId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ filmId }) => {
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const rateFilm = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      alert('Please log in or register to leave a comment.');
      return;
    }
    dispatch(addCommentToFilm({ filmId, comment: { text: commentText, rate: rating, userId: user.id, author: user.username } }));
    setCommentText('');
    setRating(0);
  };

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit} className="add-coment-form">
          <p>Оцените фильм</p>
          <div className="coments-stars">
            {[1, 2, 3, 4, 5 , 6 , 7 ,8 ,9 ,10 ].map((value) => (
              <img 
                key={value}
                onClick={() => rateFilm(value)}
                src={star}
                alt=""
                className={value <= rating ? 'active-stars' : ''}
              />
            ))}
          </div>
          <p>Напишите комментарий</p>
          <textarea 
            value={commentText} 
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.target.value)} 
            placeholder="Добавьте комментарий"
          />
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
