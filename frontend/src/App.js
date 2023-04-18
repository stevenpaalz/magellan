import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import QuestShowPage from './components/QuestShowPage';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCurrentUser } from './store/session';

const App = () => {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  return loaded && (
    <>
    <NavBar />
    {/* <HomePage />  */}
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />
      <AuthRoute exact path="/quests" component={HomePage} />
      <AuthRoute exact path="/quests/:id" component={QuestShowPage} />


      {/* <ProtectedRoute exact path="/home" component={HomePage} /> */}
    </Switch>
    </>
  );
}

export default App;