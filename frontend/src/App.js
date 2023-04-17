import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import HomePage from './components/Quests';

const App = () => {
  return (
    <>
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />

      <AuthRoute exact path="/quests" component={HomePage} />
      {/* <ProtectedRoute exact path="/quests" component={HomePage} /> */}
    </Switch>
    </>
  );
}

export default App;