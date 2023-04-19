import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import QuestCard from "./QuestCard";
import './QuestIndex.css'
import { Link } from "react-router-dom";
import { getAllReviews } from "../../store/reviews";


export default function QuestIndex({quests}){
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getAllReviews())
    },[])
    const reviews = useSelector(state=>state.reviews)
    return(
        <div className="card-column">
            {quests.map((quest, i)=>
            <Link key={i} to={`/quests/${quest._id}`}>
                <QuestCard i={i} quest={quest} reviews={Object.values(reviews).filter((review)=>review.quest === quest._id)}/>
            </Link>)}
        </div>
    )
}