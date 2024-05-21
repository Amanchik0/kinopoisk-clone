import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  return (
    <div className="container">
      <div className="main">
        <h1>404 - Страница не найдена</h1>
        <p>Извините, но страница, которую вы ищете, не существует.</p>
        <Link to="/">Вернуться на главную</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
