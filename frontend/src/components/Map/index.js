import React from "react";
import GoogleMapReact from 'google-map-react';
import QuestMarker from "./QuestMarker";
import "./Map.css"

const QuestMap = ({ quests }) => {

    //map to start at union square, can make this dynamic by bringing in a user's home town location
    const defaultProps = {
    center: {
        lat: 40.74233116818592, 
        lng: -73.99140855323562
    },
    zoom: 13
    };

  
    return (
    // Important! Always set the container height explicitly
    <div className="map" style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        >
            {/* {quests.map((quest) => (
                <QuestMarker
                    lat={quest.lat}
                    lng={quest.lng}
                    quest={quest}
                />
            ))} */}
        </GoogleMapReact>
    </div>
    );

}

export default QuestMap; 