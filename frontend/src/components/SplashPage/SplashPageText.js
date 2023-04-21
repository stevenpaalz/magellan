import React from "react";
import "./SplashPage.css"

const SplashPageText = () => {
    return (
        <>
        <div className="splash-page-body-text">
            {/* <div  className="splash-page-body-text">
                <h1 className="quest-title">Discover your city, one quest at a time.</h1> <p className="intro">Sign up now and start exploring the world's  greatest collection of scavenger hunts (quests) or make your own! <br></br><strong>Where will your next quest take you?</strong></p>
            </div> */}
            <div  className="splash-page-body-text">
                {/* Sign up now for early access to magellan, a curated collection of scavenger hunts across US cities.  */}
                Sign up now for early access to                 
                <span className="splash-page-body-text-link"> magellan</span>
                , a platform for designing and discovering scavenger hunts across US cities. 
                Invite your friends and traverse your town, one checkpoint at a time, or build your own quest for others to explore.
            </div>
            <div  className="splash-page-body-text-emphasized">
                Where will your next quest take you?
            </div>
        </div>
        </>
    )
};

export default SplashPageText;