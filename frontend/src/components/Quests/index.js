import React from 'react';
import "./HomePage.css"
import QuestMap from '../Map';

const HomePage = () => {
    return (
      <>
      <div className="homepage-left">
        <QuestMap />
      </div>
      <div className="homepage-right">
        <h1>This is where the quest list will go</h1>
      </div>
      </>
    );
  }
  
  export default HomePage;