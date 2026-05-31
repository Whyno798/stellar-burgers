import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { LoginUI } from '@ui-pages';
import { loginUserThunk } from '../../services/slices/authSlice';
import {
  selectAuthError,
  selectAuthLoading
} from '../../services/selectors/authSelectors';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      loginUserThunk({
        email,
        password
      })
    );
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
