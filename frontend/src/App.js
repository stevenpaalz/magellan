import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import QuestShowPage from './components/QuestShowPage';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import EventShowPage from './components/EventShowPage';
import { getCurrentUser } from './store/session';
import UserProfilePage from './components/UserProfilePage';
import AboutPage from './components/AboutPage';
import QuestForm from './components/Modals/QuestForm';
import UpdateForm from './components/Modals/UpdateForm';
import AIPage from './components/AIPage';

const App = () => {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  return loaded && (
    <>
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />
      <ProtectedRoute exact path="/quests" component={HomePage} />
      <ProtectedRoute exact path="/quests/create" component={QuestForm} />
      <ProtectedRoute exact path="/quests/:id" component={QuestShowPage} />
      <ProtectedRoute exact path="/quests/:id/edit" component={UpdateForm} />
      <ProtectedRoute exact path="/events/:id" component={EventShowPage} />
      <ProtectedRoute exact path="/user-profile/:wildcard" component={UserProfilePage} />
      <ProtectedRoute exact path="/user-profile" component={UserProfilePage} />
      <Route exact path="/ai" component={AIPage} />
      <Route exact path="/about" component={AboutPage}></Route>
    </Switch>
    </>
  );
}

export default App;