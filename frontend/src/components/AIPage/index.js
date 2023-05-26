import "./AIPage.css";
import AIForm from "./AIForm";
import { useState } from "react";
import { callAI } from "../../ai";

const AIPage = () => {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [numCheckpoints, setNumCheckpoints] = useState("");
    const [themeArray, setThemeArray] = useState([]);
    const [temperature, setTemperature] = useState(0.05);
    const [aiResponse, setAIResponse] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await callAI(city, state, themeArray, numCheckpoints, temperature);
        const textRes = res.choices[0].message.content.slice(3);
        const arrayRes = textRes.split(/\s\d+\.\s/);
        setAIResponse(arrayRes);
    }

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
                    setThemeArray,
                    handleSubmit
                }}/>
            </div>
            <div className='ai-page-right'>
                {aiResponse.map((checkpoint, idx) => {
                    return <p key={idx + 1}>{idx + 1}. {checkpoint}</p>
                })}
            </div>
        </div>
    )
};

export default AIPage;