import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllQuests } from "../../store/quests";
import QuestCard from "./QuestCard";
import './QuestIndex.css'
import { Link } from "react-router-dom";
import { getAllReviews } from "../../store/reviews";


export default function QuestIndex(){
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getAllQuests())
        dispatch(getAllReviews())
    },[])
    const quests = useSelector(state=>state.quests)
    const reviews = useSelector(state=>state.reviews)
    return(
        <div className="card-column">
            {Object.values(quests)?.map((quest, i)=><Link key={i} to={`/quests/${quest._id}`}><QuestCard quest={quest} reviews={reviews}/></Link>)}
        </div>
    )
}