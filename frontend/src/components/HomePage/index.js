import React from 'react';
import "./HomePage.css"
import QuestMap from '../Map';
import QuestIndex from '../QuestIndex/QuestIndex';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllQuests } from "../../store/quests";
import { useState } from 'react';

const HomePage = () => {
  const mapstyle={ height: 'calc(100vh - 80px)', width: '100%' }
  const [tags, setTags] = useState({})

  useEffect(()=>{
    dispatch(getAllQuests())
},[])
  const dispatch= useDispatch()
  const quests = Object.values(useSelector(state=>state.quests))
    return (
      <div className="home-flex">
        <div className="homepage-left">
          <QuestMap quests={quests} style={mapstyle}/>
        </div>
        <div>
          <QuestIndex quests={quests}/>
          </div>
      </div>
    );
  }
  
  export default HomePage;