import StarRating from "./StarRating"
import './QuestIndex.css'
import QuestShowTags from "../QuestShowPage/QuestShowTags"

export default function QuestCard({i, quest, reviews}){
    // const questReviews = Object.values(reviews).filter((review)=>review.quest === quest._id)
    return(
        <div className="quest-card">
            <img className="quest-start-image" src={quest.imageUrls? quest.imageUrls[0] : ""} />
            <div className="quest-info">
                <h1 className="quest-title">{i+1}. {quest.title}</h1>
                <label><p>rating:</p>
                <StarRating questId={quest._id} questReviews={reviews}/>
                </label>
                <label><p>tags:</p>
                <QuestShowTags tags={quest.tags} />
                </label>
            </div>
        </div>
    )
}