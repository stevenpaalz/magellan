import React from "react";

const QuestMarker = ({ quest }) => {

    //template for marker styling
    const markerStyle = {
        border: '1px solid white',
        borderRadius: '5px',
        height: 13,
        width: 40,
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        zIndex: 10,
        textAlign: 'center',
    };

    return (
        <>
            <div className="questMarker" style={markerStyle} >{quest.title}</div>
        </>
    )
}

export default QuestMarker;