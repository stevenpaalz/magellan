import React from 'react';
import SplashPageText from './SplashPageText';
import "./SplashPage.css"
import { useDispatch } from 'react-redux';
import { setModal } from '../../store/modal';

const SplashPage = () => {
  
  const dispatch = useDispatch()
  function openSignup(){
    dispatch(setModal("signUp"))
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
                <button className="splash-right-cta" onClick={openSignup}>Where will your next quest take you?</button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default SplashPage;