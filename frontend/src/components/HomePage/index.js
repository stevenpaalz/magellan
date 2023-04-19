import React from 'react';
import "./HomePage.css"
import QuestMap from '../Map';
import QuestIndex from '../QuestIndex/QuestIndex';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllQuests } from "../../store/quests";
import { useState } from 'react';
import allTags from '../../data/Tags';

const HomePage = () => {
  const mapstyle={ height: 'calc(100vh - 80px)', width: '100%' }
  const dispatch= useDispatch()

  const [tags, setTags] = useState({})
  const [filterDropdownSelected, setFilterDropdownSelected] = useState(false)
  useEffect(()=>{
    dispatch(getAllQuests())
},[])
useEffect(() => {
  if (!filterDropdownSelected) return;
  const closeFilterDropdown = (e) => {
    if (e.target.classList.contains("dropdown-options") || e.target.classList.contains("dropdown-option")) return;
    setFilterDropdownSelected(false);
  };
  document.addEventListener('click', closeFilterDropdown);
  return () => document.removeEventListener("click", closeFilterDropdown);
}, [filterDropdownSelected]);
function filterDropdownClick(e){
  e.preventDefault();
  if (!filterDropdownSelected){
    setFilterDropdownSelected(true)
    //debugger
  }
}
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
  // if a quest has all tags labeled true push into quest array
  Object.values(quests).forEach(quest=>{
    // debugger
    if (truetags.every((tag)=>{return Object.values(quest.tags).includes(tag)})){
      questarray.push(quest)
    }
  })
  return questarray
}
const quests = useSelector(state=>state.quests)
const questsFiltered = Object.values(tags).includes(true)? filteredQuests(quests, tags) : Object.values(quests)

    return (
      <div className="home-flex">
        <div className="homepage-left">
          <QuestMap quests={questsFiltered} style={mapstyle}/>
        </div>
        <div className="width50">
          <button className="filter-dropdown"onClick={filterDropdownClick}>{filterDropdownSelected?"close filters ⌃":"select filters ⌵"}</button>
          {filterDropdownSelected && <div className="dropdown-options"> 
                            {allTags.map((tag, i)=><label className="dropdown-option" key={i}><input className="dropdown-option" type="checkbox" checked={tags[tag]? tags[tag] : false} onChange={(e)=>{filterChange(e, tag)}}></input><p className="dropdown-option">{tag}</p></label>)}
                            </div>}

          <QuestIndex quests={questsFiltered}/>
          </div>
      </div>
    );
  }
  
  export default HomePage;