import React from "react";
import { Link } from "react-router-dom";
const QuestMarker = ({ quest, decor, key }) => {

    //template for marker styling
    const markerStyle = {
        border: '3px solid white',
        borderRadius: '100%',
        height: '30px',
        width: '30px',
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        zIndex: 10,
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold'
    };

    return (
        <>
            <Link key={key} to={`/quests/${quest._id}`}><div className="questMarker" style={markerStyle} >{decor}</div></Link>
        </>
    )
}

export default QuestMarker;