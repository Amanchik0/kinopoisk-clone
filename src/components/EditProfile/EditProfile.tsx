import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { updateUser } from '../../features/user/userSlice';

const EditProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    image: user?.image || ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUser(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Полное имя"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="E-mail"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="URL изображения"
      />
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default EditProfile;
