import "./AIPage.css";
import AIForm from "./AIForm";
import { useState } from "react";

const AIPage = () => {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [numCheckpoints, setNumCheckpoints] = useState("");
    const [themeArray, setThemeArray] = useState([]);

    return(
        <div className='ai-page'>
            <div className='ai-page-left'>
                <h1>Generate ideas for a new quest using Artificial Intelligence</h1>
                <p>Powered by OpenAI</p>
                <AIForm props={{
                    city, 
                    setCity, 
                    state, 
                    setState, 
                    numCheckpoints, 
                    setNumCheckpoints,
                    themeArray,
                    setThemeArray
                }}/>
            </div>
            <div className='ai-page-right'></div>
        </div>
    )
};

export default AIPage;