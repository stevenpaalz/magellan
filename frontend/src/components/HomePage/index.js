import React from 'react';
import "./HomePage.css"
import QuestMap from '../Map';
import QuestIndex from '../QuestIndex/QuestIndex';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const mapstyle={ height: 'calc(100vh - 80px)', width: '100%' }
  const quests = useSelector(state=>state.quests)
    return (
      <div className="home-flex">
        <div className="homepage-left">
          <QuestMap quests={quests} style={mapstyle}/>
        </div>
          <QuestIndex />
      </div>
    );
  }
  
  export default HomePage;