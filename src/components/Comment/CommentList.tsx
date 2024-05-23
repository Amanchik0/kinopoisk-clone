import React from 'react';
import star from '../../styles/images/icons/star.svg';
import { Comment } from '../../app/types';

interface CommentListProps {
  rates: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ rates }) => {
  if (!rates || rates.length === 0) {
    return <div>Комментарии отсутствуют.</div>;
  }

  return (
    <div>
      {rates.map((rate, index) => (
        <div key={index} className="coment">
          <p>Автор: <a href="#">{rate.author || 'Неизвестный'}</a></p>
          <div className="coments-stars">
            {[...Array(10)].map((_, i) => (
              <img 
                key={i}
                src={star}
                alt=""
                className={i < rate.rate ? 'active-stars' : ''}
              />
            ))}
          </div>
          {rate.text && <p>Комментарий: {rate.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
