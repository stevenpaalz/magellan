import React from 'react';
import SplashPageText from './SplashPageText';
import "./SplashPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../store/modal';
import { useHistory } from 'react-router-dom';

const SplashPage = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)
  
  const dispatch = useDispatch()
  function openSignup(){
    if (!sessionUser) {
      dispatch(setModal("signUp"))
      return
    } else {
      history.replace('/quests');
    }
  }

    return (
      <>
        <div className="splash-page-body">
          <div className="splash-left">
            <div className="splash-left-hero-image-holder">
              {/* <img src="../../../assets/hero-image.png" alt="map-readers" className="splash-page-hero-image"/> */}
              <img src="../../../assets/nomads.png" alt="map-readers" className="splash-page-hero-image"/>
            </div>
          </div>        
          <div className="splash-right">
            <div className="splash-right-logo-holder">
              <img src="../../../assets/logo.png" alt="Logo" className="splash-right-logo"/>
            </div>
            <div className="splash-right-text-holder">
              <SplashPageText />
            </div>
            <div>
                <button className="splash-right-cta" onClick={openSignup}><img src="../../../../assets/compass.png" className="icon"/> <p>Get Questing!</p></button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default SplashPage;