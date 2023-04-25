import React from "react";
import { Link } from "react-router-dom";
import "./SplashPage.css"

const SplashPageText = () => {
  return (
    <>
      <div className="splash-page-body-text">
        <div className="splash-page-body-text-header">
          Explore your city, one quest at a time.
        </div>
        Sign up now for early access to{" "}
        <Link to="/about" className="splash-page-body-text-link">
          magellan
        </Link>
        , a platform for designing and discovering scavenger hunts.
        <div className="splash-page-body-text-footer">
          Where will your next quest take you?
        </div>
      </div>
    </>
  );
};

export default SplashPageText;



// import React from "react";
// import { Link } from "react-router-dom";
// import "./SplashPage.css"

// const SplashPageText = () => {
//     return (
//         <>
//         <div className="splash-page-body-text">
//             <div className="splash-page-body-text-header">Explore your city, one quest at a time.</div>
//                 Sign up now for early access to                 
//                 <span className="splash-page-body-text-link"> magellan</span>
//                 , a platform for designing and discovering scavenger hunts. 
//             <div className="splash-page-body-text-footer">Where will your next quest take you?</div>
//         </div>
//         </>
//     )
// };

// export default SplashPageText;


// import React from "react";
// import "./SplashPage.css"

// const SplashPageText = () => {
//     return (
//         <>
//         <div className="splash-page-body-text">
//             <div  className="splash-page-body-text">
//                 <h1 className="quest-title">Discover your city, one quest at a time.</h1> <p className="intro">Sign up now and start exploring the world's  greatest collection of scavenger hunts (quests) or make your own! <br></br><strong>Where will your next quest take you?</strong></p>
//             </div>
//             {/* <div  className="splash-page-body-text">
//                 Where will your next quest take you?
//             </div> */}
//         </div>
//         </>
//     )
// };

// export default SplashPageText;


// import React from "react";
// import "./SplashPage.css"

// const SplashPageText = () => {
//     return (
//         <>
//         <div className="splash-page-body-text">
//             <div  className="splash-page-body-text">
//                 Sign up now for early access to                 
//                 <span className="splash-page-body-text-link"> magellan</span>
//                 , a platform for designing and discovering scavenger hunts. 
//                 Invite your friends and traverse your town, one checkpoint at a time, 
                    // or build your own quest for others to explore.
//             </div>
//             <div  className="splash-page-body-text-emphasized">
//                 Where will your next quest take you?
//             </div>
//         </div>
//         </>
//     )
// };

// export default SplashPageText;
