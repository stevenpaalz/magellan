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
      <Route exact path="/" component={SplashPage} />
      <Route exact path="/quests" component={HomePage} />
      <Route exact path="/quests/:id" component={QuestShowPage} />
      <Route exact path="/events/:id" component={EventShowPage} />
      <Route exact path="/user-profile" component={UserProfilePage} />
    


      {/* <ProtectedRoute exact path="/home" component={HomePage} /> */}
    </Switch>
    </>
  );
}

export default App;