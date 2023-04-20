import React from "react";
import { Link } from "react-router-dom";
const QuestMarker = ({ quest, decor, key }) => {

    return (
        <>
            <Link key={key} to={`/quests/${quest._id}`}><div className="questMarker">{decor}</div></Link>
        </>
    )
}

export default QuestMarker;