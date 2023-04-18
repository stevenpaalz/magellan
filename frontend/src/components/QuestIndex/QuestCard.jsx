

export default function QuestCard({quest}){
    

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