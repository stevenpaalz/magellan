import StarRating from "./StarRating"
import './QuestIndex.css'

export default function QuestCard({quest, reviews}){
    // const questReviews = Object.values(reviews).filter((review)=>review.quest === quest._id)
    return(
        <div className="quest-card">
            <img className="quest-start-image" src={quest.imageUrls? quest.imageUrls[0] : ""} />
            <div className="quest-info">
                <h1 className="quest-title">{quest.title}</h1>
                <label><p>rating:</p>
                <StarRating questId={quest._id} questReviews={reviews}/>
                </label>
                <label><p>tags:</p>
                <p>tags go here</p>
                </label>
            </div>
        </div>
    )
}