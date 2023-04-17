import React from 'react';
import SplashPageText from './SplashPageText';
import "./SplashPage.css"

const SplashPage = () => {
    return (
      <>
        <div className="splash-page-body">
          <div className="splash-left">
            <div className="splash-left-hero-image-holder">
              <img src="../../../assets/hero-image.png" alt="map-readers" className="splash-page-hero-image"/>
            </div>
          </div>        
          <div className="splash-right">
            <div className="splash-right-logo-holder">
              <img src="../../../assets/logo.png" alt="Logo" className="splash-right-logo"/>
            </div>
            <div className="splash-right-text-holder">
              <SplashPageText />
            </div>
            <div className="splash-right-cta"></div>
          </div>
        </div>
      </>
    );
  }
  
  export default SplashPage;