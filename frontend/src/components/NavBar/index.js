import { useSelector } from "react-redux";
import LoggedInNavBar from "./LoggedInNavBar";
import LoggedOutNavBar from "./LoggedOutNavBar";
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user); 

  return (
    <div className="nav">
      {sessionUser && <LoggedInNavBar />}
      {!sessionUser && <LoggedOutNavBar />}
    </div>
  );
}; 

export default NavBar;