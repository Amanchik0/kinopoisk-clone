import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { addGenre } from '../../features/genres/genresSlice';
import { Genre } from '../../app/types';

interface AddGanreProps extends PropsFromRedux {}

interface AddGanreState {
  genreName: string;
  message: string;
}

class AddGanre extends Component<AddGanreProps, AddGanreState> {
  constructor(props: AddGanreProps) {
    super(props);
    this.state = {
      genreName: '',
      message: ''
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ genreName: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { addGenre } = this.props;
    const { genreName } = this.state;

    if (!genreName.trim()) {
      this.setState({ message: 'Пожалуйста, введите название жанра.' });
      return;
    }

    addGenre({
      id: Date.now(),
      name: genreName.trim(),
    });

    this.setState({ message: 'Жанр успешно добавлен!', genreName: '' });
    setTimeout(() => this.setState({ message: '' }), 3000); // Скрыть сообщение после 3 секунд
  };

  render() {
    const { genreName, message } = this.state;

    return (
      <div className="container">
        <div className="main">
          <form onSubmit={this.handleSubmit} className="form">
            <h3>Добавить новый жанр</h3>
            <fieldset className="fieldset">
              <label>Название жанра</label>
              <input
                type="text"
                name="genreName"
                value={genreName}
                onChange={this.handleChange}
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
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addGenre: (genre: Genre) => dispatch(addGenre(genre)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddGanre);
