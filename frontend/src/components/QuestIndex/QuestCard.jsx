import { useSelector } from "react-redux"

export default function QuestCard({quest}){
    const questReviews = useSelector(state=>state.quests[quest.id].reviewIds)
    const starRating = questReviews.forEach
    useEffect(()=>{
        
    }, [quest])
    return(
        <div classname="quest-card">
            <img></img>
            <div className="quest-info">
                <h1 className="quest-title"></h1>
                <img src={`../../../../public/assets/stars/${starRating}`} alt="" />
            </div>
        </div>
    )
    

}