import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUserThunk } from '../../services/slices/authSlice';
import {
  selectAuthError,
  selectAuthLoading
} from '../../services/selectors/authSelectors';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      registerUserThunk({
        name: userName,
        email,
        password
      })
    );
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
