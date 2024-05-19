import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from './app/services/userApi';
import { setAuthenticated } from './app/futures/user/authSlice';
import { setUser } from './app/futures/user/userSlice';
import { routes } from './routes/Routes';
import Login from './pages/Login';

const App: React.FC = () => {
  const dispatch = useDispatch()
  const { data: userData, error, isLoading } = useGetUserQuery()

  useEffect(() => {
    if (userData) {
      dispatch(setAuthenticated(true))
      dispatch(setUser(userData));
    } else if (error) {
      dispatch(setAuthenticated(false))
    }
  }, [userData, error, dispatch])

  return isLoading ? (
    <></>
  ) : (
    <Router>
      <Routes>
        <Route path={routes.register.path} element={<Login />} />
        <Route path={routes.login.path} element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route path='/profile' />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
