import "./AIPage.css";
import AIForm from "./AIForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAI } from "../../ai";
import { useHistory } from 'react-router-dom';
import { setModal } from "../../store/modal";
import { setAI } from "../../store/aiSuggest";

const AIPage = () => {
    const history = useHistory();
    const dispatch = useDispatch(); 
    const user = useSelector(state => state.session.user)
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [numCheckpoints, setNumCheckpoints] = useState("");
    const [themeArray, setThemeArray] = useState([]);
    const [temperature, setTemperature] = useState(0.05);
    const [aiResponse, setAIResponse] = useState([]);
    const [disabledForm, setDisabledForm] = useState(false);
    const [loadingGif, setLoadingGif] = useState(false);
    const [initialText, setInitialText] = useState(true);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        checkForErrors();
        if (errors.length > 0) return;
        setInitialText(false);
        setLoadingGif(true);
        setDisabledForm(true);
        const res = await callAI(city, state, themeArray, numCheckpoints, temperature);
        const textRes = res.choices[0].message.content.slice(3);
        const arrayRes = textRes.split(/\s\d+\.\s/);
        setAIResponse(arrayRes);
        dispatch(setAI({ city: city, state: state, themeArray: themeArray, checkpoints:arrayRes }));
        setLoadingGif(false);
        setDisabledForm(false);
        setTemperature(temperature + 0.05);
        if (temperature > 1.4) {
            setTemperature(temperature - 0.8);
        }
    }

    const checkForErrors = async () => {
        for (let i = 0; i < 4; i++) {
            errors.pop();
        }
        setErrors(...errors);
        if (themeArray.length === 0) {
            errors.push("Must select at least one theme");
        }
        if (city === "") {
            errors.push("Enter a valid city");
        }
        if (state === "") {
            errors.push("Enter a valid state");
        }
        if (numCheckpoints < 1) {
            errors.push("Must select at least 5 checkpoint");
        }
        setErrors([...errors]);
    }

    const createClick = (e) => {
        e.preventDefault();
        if (user) {
            history.replace("/quests/aicreate");
        } else {
            dispatch(setModal("logIn"))
        }
    }

    const createButton = () => {
        if (user){
            return <button className="ai-form-submit" onClick={createClick} >Create AI Quest</button>
        } else {
            return <button className="ai-form-submit" onClick={createClick} >Log In to Create Quest</button>
        }
    }

    return(
        <div className='ai-page'>
            <div className='ai-page-left'>
                <h1 className="ai-page-header">Generate new quest ideas using Artificial Intelligence</h1>
                <div className="powered-by"><p >Powered by <img className="openai-logo" src="../../../assets/OpenAI_Logo.png" alt="OpenAI" /></p></div>
                <AIForm props={{
                    city, 
                    setCity, 
                    state, 
                    setState, 
                    numCheckpoints, 
                    setNumCheckpoints,
                    themeArray,
                    setThemeArray,
                    handleSubmit,
                    disabledForm,
                    errors
                }}/>
            </div>
            <div className='ai-page-right'>
                {initialText && <h3 className="ai-initial-text">Use the form on the left to get started</h3>}
                {loadingGif && 
                    <div className="ai-loading-gif-container">
                        <img className="ai-loading-gif" src="../../../assets/magellan_generating.gif" alt="Response is loading"></img>
                    </div>}
                <div className='ai-response-container'>
                    {!loadingGif && aiResponse.map((checkpoint, idx) => {
                        return <p className='ai-response-textline' key={idx + 1}>{idx + 1}. {checkpoint}</p>
                    })}
                </div>
                <div className='ai-form-route'>
                    {!initialText && createButton()}
                </div>
            </div>
        </div>
    )
};

export default AIPage;