import React, { useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import QuestMarker from "./QuestMarker";
import "./Map.css"
import { useState } from "react";

const QuestMap = ({ quests, style, quest, lat, lng }) => {
    const [center, setCenter] = useState({
        lat: lat || 40.74233116818592, 
        lng: lng || -73.99140855323562
    });
    const defaultZoom = 13;

    useEffect(()=>{
        let newCenter = {
            lat: lat || 40.74233116818592,
            lng: lng || -73.99140855323562
        }
        setCenter(newCenter)
    }, [lat, lng])
    
    return (
    // Important! Always set the container height explicitly
    // <div className="map" style={{ height: '100vh', width: '50%' }}>
    <div className="map" style={style}>

        <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={{lat: 40.74233116818592, lng: -73.99140855323562}}
        center={center}
        defaultZoom={defaultZoom}
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