import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { updateUser } from '../../features/user/userSlice';
import { UserData } from '../../app/types';

interface EditProfileProps extends PropsFromRedux {}

interface EditProfileState {
  fullName: string;
  email: string;
  image: string;
  password: string;
  confirmPassword: string;
}

class EditProfile extends Component<EditProfileProps, EditProfileState> {
  constructor(props: EditProfileProps) {
    super(props);
    const { user } = this.props;
    this.state = {
      fullName: user?.fullName || '',
      email: user?.email || '',
      image: user?.image || '',
      password: '',
      confirmPassword: ''
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<EditProfileState, keyof EditProfileState>);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { fullName, email, image, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    // Обновление данных пользователя без передачи пароля
    this.props.updateUser({ fullName, email, image });
    // Обновление данных пользователя в localStorage
    const updatedUser = { ...this.props.user, fullName, email, image };
    if (password) {
      updatedUser.password = password;
    }
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    alert('Профиль обновлен!');
  };

  render() {
    const { fullName, email, image, password, confirmPassword } = this.state;

    return (
      <div className="container">
        <div className="main">
          <form onSubmit={this.handleSubmit} className="form">
            <h3>Редактировать профиль</h3>
            <fieldset className="fieldset">
              <label>Полное имя</label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={this.handleChange}
                placeholder="Полное имя"
              />
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="E-mail"
              />
              <label>Изображение профиля</label>
              <input
                type="text"
                name="image"
                value={image}
                onChange={this.handleChange}
                placeholder="URL изображения"
              />
            </fieldset>
            {/* <fieldset className="fieldset">
              <label>Новый пароль</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Новый пароль"
              />
              <label>Подтвердите пароль</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                placeholder="Подтвердите пароль"
              />
            </fieldset> */}
            <fieldset className="fieldset">
              <button type="submit">Сохранить изменения</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateUser: (userData: Partial<UserData>) => dispatch(updateUser(userData)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EditProfile);
