import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToFilm } from '../../features/films/filmsSlice';
import { AppDispatch } from '../../app/store';

interface CommentFormProps {
  filmId: number;
}

interface Comment {
  author: string;
  text: string;
  rate: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ filmId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [commentText, setCommentText] = useState('');
  const [rate, setRate] = useState(5); // Пример значения рейтинга, его можно изменить

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (commentText.trim()) {
      const newComment: Comment = {
        author: 'User', // Замените на правильного автора
        text: commentText.trim(),
        rate: rate
      };
      dispatch(addCommentToFilm({ filmId, comment: newComment }));
      setCommentText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={commentText}
        onChange={handleChange}
        placeholder="Добавьте комментарий"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default CommentForm;
