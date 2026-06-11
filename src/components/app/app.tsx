import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  Modal,
  ProtectedRoute,
  IngredientDetails,
  OrderInfo
} from '@components';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { useDispatch, useSelector } from '../../services/store';

import { getIngredientsThunk } from '../../services/slices/ingredientsSlice';
import { checkUserAuth } from '../../services/slices/authSlice';

import {
  selectAuthChecked,
  selectIsAuth
} from '../../services/selectors/authSelectors';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const background = location.state?.background;

  const isAuth = useSelector(selectIsAuth);
  const isAuthChecked = useSelector(selectAuthChecked);

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  if (!isAuthChecked) return null;

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <OrderInfo />
            </div>
          }
        />

        <Route element={<ProtectedRoute onlyUnAuth isAuth={isAuth} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <div className={styles.detailPageWrap}>
                <OrderInfo />
              </div>
            }
          />
        </Route>

        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>

              <IngredientDetails />
            </div>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Информация о заказе' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
