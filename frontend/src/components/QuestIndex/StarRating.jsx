
import './QuestIndex.css'

export default function StarRating({questReviews}){

    let ratingtotal = 0
    questReviews.forEach((review)=>(ratingtotal += review.rating))
    const stars = Math.floor(ratingtotal/questReviews.length)
    if (!questReviews){
        return(
            <p>loading...</p>
        )
    }else if(!stars){
        return(
            <p className="no-reviews">(no reviews 😢)</p>
        )
    }else{
    return(
        <img className="star-rating"src={`./../../../assets/stars/${stars}.png`} alt={`${stars} star rating`} />
    )
    }
}