import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { updateUser } from '../../features/user/userSlice';
import { User } from '../../app/types';

interface EditProfileProps extends PropsFromRedux {}

interface EditProfileState {
  formData: {
    fullName: string;
    email: string;
    image: string;
  };
}

class EditProfile extends Component<EditProfileProps, EditProfileState> {
  constructor(props: EditProfileProps) {
    super(props);
    this.state = {
      formData: {
        fullName: props.user?.fullName || '',
        email: props.user?.email || '',
        image: props.user?.image || ''
      }
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { updateUser } = this.props;
    const { formData } = this.state;
    updateUser(formData);
  };

  render() {
    const { formData } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="edit-profile-form">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={this.handleChange}
          placeholder="Полное имя"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={this.handleChange}
          placeholder="E-mail"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={this.handleChange}
          placeholder="URL изображения"
        />
        <button type="submit">Сохранить</button>
      </form>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user.currentUser
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateUser: (data: Partial<User>) => dispatch(updateUser(data))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EditProfile);
