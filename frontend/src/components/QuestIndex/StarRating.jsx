import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getQuestReviews } from "../../store/quests";
import './QuestIndex.css'

export default function StarRating({questReviews}){

    let ratingtotal = 0
    questReviews.forEach((review)=>(ratingtotal += review.rating))
    const stars = Math.floor(ratingtotal/questReviews.length)

    return(
        <img className="star-rating"src={`./../../../assets/stars/${stars}.png`} alt={`${stars} star rating`} />
    )
}