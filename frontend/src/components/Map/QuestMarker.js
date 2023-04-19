import React from "react";

const QuestMarker = ({ quest, i }) => {

    //template for marker styling
    const markerStyle = {
        border: '3px solid white',
        borderRadius: '100%',
        height: 30,
        width: 30,
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
            <div className="questMarker" style={markerStyle} >{i+1}</div>
        </>
    )
}

export default QuestMarker;