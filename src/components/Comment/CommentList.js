import star from '../../styles/images/icons/star.svg';

const CommentList = ({ rates }) => {
    if (!rates || rates.length === 0) {
      return <div>Комментарии отсутствуют.</div>;
    }
  
    return (
      <div>
        {rates.map((rate, index) => (
          <div key={index} className="coment">
            <p>Автор: <a href="#">{rate.author?.fullName || 'Неизвестный'}</a></p>
            <div className="coments-stars">
              {[...Array(5)].map((_, i) => (
                <img key={i}
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
  