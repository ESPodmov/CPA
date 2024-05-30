import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import ValidDataRoute from './components/ValidDataRoute';
import { useDispatch } from 'react-redux';
import { useGetCSRFMutation, useGetUserQuery } from './app/services/userApi';
import { setAuthenticated } from './app/futures/user/authSlice';
import { setUser } from './app/futures/user/userSlice';
import { routes } from './routes/Routes';
import Login from './pages/Login';
import Profile from './pages/ProfilePage';
import NewsPage from './pages/NewsPage';
import NewsItemPage from './pages/NewsItemPage';
import OffersPage from './pages/OffersPage';
import OfferPage from './pages/OfferPage';
import ReportsPage from './pages/ReportsPage';

const App: React.FC = () => {
  const dispatch = useDispatch()
  const { data: userData, error, isLoading } = useGetUserQuery()
  const [getCSRF] = useGetCSRFMutation();
  const [userDataSet, setUserDataSet] = useState(false)

  useEffect(() => {
    getCSRF();
    if (!isLoading) {
      if (userData) {
        dispatch(setAuthenticated(true))
        dispatch(setUser(userData));
      } else if (error) {
        dispatch(setAuthenticated(false))
      }
      setUserDataSet(true)
    }
  }, [isLoading])

  return !userDataSet ? (
    <></>
  ) : (
    <Router>
      <Routes>
        <Route path={routes.register.path} element={<Login isLogin={false} />} />
        <Route path={routes.login.path} element={<Login isLogin={true} />} />
        <Route path={routes.reports.path} element={<ReportsPage />} />
        <Route element={<AuthRoute />}>
          <Route path={routes.profile.path} element={<Profile />} />
          <Route element={<ValidDataRoute />}>
            <Route path={routes.news.path} element={<NewsPage />} />
            <Route path={routes.news_item.path} element={<NewsItemPage />} />
            <Route path={routes.offer.path} element={<OfferPage />} />
            <Route path={routes.offers.path} element={<OffersPage />} />
            <Route path={routes.home.path} />
            <Route path={routes.unload.path} />
            <Route path={routes.my_links.path} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
