import React from 'react';
import "./HomePage.css"
import QuestMap from '../Map';
import QuestIndex from '../QuestIndex/QuestIndex';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllQuests, searchQuests } from "../../store/quests";
import { useState } from 'react';
import allTags from '../../data/Tags';
import { setModal } from '../../store/modal';
import QuestForm from '../Modals/QuestForm';
import QuestShowTags from '../QuestShowPage/QuestShowTags';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();
  const mapstyle={ height: 'calc(100vh - 80px)', width: '100%' }
  const dispatch= useDispatch()
  const modalState = useSelector(state=>state.modals.modalState);
  const [showFilter, setShowFilter] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    }
  }, [])

  const [tags, setTags] = useState({})
  useEffect(()=>{
    dispatch(getAllQuests())
},[])

const openFilter = () => {
  if (showFilter) {
    setShowFilter(false);
  } else {
    setShowFilter(true);
  }
}
const handleSearchSubmit = e => {
  e.preventDefault();
  search();
}

useEffect(()=> {
  if (searchValue.length >= 3) {
    search();
  } else {
    dispatch(getAllQuests());
  }
}, [searchValue])

const search = () => {
  let formattedSearch = searchValue.split(" ").join("+");
  dispatch(searchQuests(formattedSearch));
}

useEffect(() => {
  if (!showFilter) return;

  const closeFilter = (e) => {
    if (e.target.classList.contains("dropdown-selected-open") || e.target.classList.contains("quest-show-tag")) {
      return
    } else {
      setShowFilter(false);
    }
  };

  document.addEventListener('click', closeFilter);
  return () => document.removeEventListener("click", closeFilter);
}, [showFilter]);

function filterChange(e, tag){
  const newTags = {...tags, [tag]: e.target.checked }
  setTags(newTags)
}
function filteredQuests(quests, tags){
  let questarray = []
  let truetags = []
  Object.entries(tags).forEach(entry=>{
    if (entry[1]===true){
      truetags.push(entry[0])
    }
  })

  Object.values(quests).forEach(quest=>{
    if (truetags.every((tag)=>{return Object.values(quest.tags).includes(tag)})){
      questarray.push(quest)
    }
  })
  return questarray
}
const quests = useSelector(state=>state.quests);
const questsFiltered = Object.values(tags).includes(true)? filteredQuests(quests, tags) : Object.values(quests);

  function createClick(e){
    e.preventDefault();
    history.replace("/quests/create");
  }

  if (!quests) {return(
    <h1>Loading...</h1>
  )}

  return (
      <div className="home-flex">
        <div className="homepage-left">
          <QuestMap quests={questsFiltered} style={mapstyle} lat={questsFiltered[0] ? questsFiltered[0].lat : null} lng={questsFiltered[0] ? questsFiltered[0].lng : null}/>
        </div>
        <div className="width50">
          <div className="quests-button-index-headers">
            <button className="filter-dropdown dropdown-selected-open" onClick={openFilter}>filters ⌵</button>
            <form onSubmit={handleSearchSubmit} className="search-bar-container">
              <input type="text" className="search-bar" placeholder="Enter a location or keyword" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}></input>
              <button type="submit" className="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <button onClick={createClick} className="create-quest-button">create quest</button>
          </div>
          {showFilter && <div className="dropdown-options dropdown-selected-open"> 
                              {allTags.map((tag, i)=><label className="dropdown-option dropdown-selected-open" key={i}>
                                <input className="dropdown-option dropdown-selected-open" type="checkbox" checked={tags[tag]? tags[tag] : false} onChange={(e)=>{filterChange(e, tag)}}></input>
                                <QuestShowTags tags={[tag]} ></QuestShowTags>
                                </label>)}
                              </div>}

          {questsFiltered.length > 0 && <QuestIndex quests={questsFiltered}/>}
          {questsFiltered.length < 1 && <h1 className="no-results">No results found...</h1>}
          </div>
      </div>
    );
  }
  
  export default HomePage;