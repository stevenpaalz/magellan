import React from "react";
import GoogleMapReact from 'google-map-react';
import QuestMarker from "./QuestMarker";
import "./Map.css"

const QuestMap = ({ quests, style, quest, lat, lng }) => {

    const defaultProps = {
        center: {
            lat: lat || 40.74233116818592, 
            lng: lng || -73.99140855323562
        },
        zoom: 13
    };
    
    return (
    // Important! Always set the container height explicitly
    // <div className="map" style={{ height: '100vh', width: '50%' }}>
    <div className="map" style={style}>

        <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        >
            {quests?.map((quest, i) => (
                <QuestMarker 
                    key={i}
                    lat={quest.lat}
                    lng={quest.lng}
                    quest={quest}
                    decor={quests.length===1?"★":i+1}
                />
            ))}
        </GoogleMapReact>
    </div>
    );
}

export default QuestMap;
