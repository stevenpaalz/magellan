import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import QuestShowPage from './components/QuestShowPage';

const App = () => {
  return (
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