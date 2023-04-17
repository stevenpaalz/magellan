import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <>
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />


      <ProtectedRoute exact path="/home" component={HomePage} />
    </Switch>
    </>
  );
}

export default App;